import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREAMENT_TIMER = 'INCREAMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0
};

const plantMine = (row, cell, mine) => {

    console.log(row, cell, mine);

    //10 * 10 배열 생성 (1차원배열)
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    //랜덤으로 숫자 생성하여 지뢰가 들어갈 index를 선별
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]; //배열형태로 반환돼서 [0]붙인듯..
        shuffle.push(chosen);
    }

    //row*cell 배열 생성 및 초기화
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL)
        }
    }

    //지뢰 넣어주기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell); //Math.floor() 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환
        const hor = shuffle[k] % cell;
        // shuffle[k] === 95일 경우 ver에 9, hor에 5를 넣어주는 코드
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}

export default new Vuex.Store({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, //중단된 상태 , false가 게임시작된 상태
        result: '',
        openedCount: 0
    },
    getters: {

    },
    mutations: {
        [START_GAME](state, {
            row,
            cell,
            mine
        }) {
            /*
            state.data.row = row;
            state.data['row'] = row;
            이렇게 접근해서 바꿔주면 화면은 바뀌지 않을 수 있음
            Vue.set(state.data, 'row', row) -> 그래서 이렇게 해줘야함
            */
            state.data = {
                row,
                cell,
                mine
            }; // -> 이건 data안의 속성들을 바꿔주는게아니라 data자체를 바꿔주는거라 ㄱㅊ
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {
            row,
            cell
        }) {
            const checked = []; //메모이제이션, 캐싱 (용어알아두기)
            let openedCount = 0;

            function checkAround(row, cell) {

                const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length
                if (checkRowOrCellIsUndefined) {
                    // undefined 에러날까봐 보호 코드
                    console.log("Undefined Error !")
                    return
                }

                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    //주변칸이 지뢰이거나 이미 열린 경우, 주변칸이 빈칸일때만 검사하고싶음
                    console.log("Not Empty Error !")
                    return
                }

                if (checked.includes(row + '/' + cell)) {
                    //한번 열었던 칸이면 무시
                    console.log("Already Opened Error !")
                    return
                } else {
                    //열지 않은 칸이면 저장
                    checked.push(row + '/' + cell)
                }

                let around = [];
                if (state.tableData[row - 1]) {
                    around = around.concat([state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]]);
                }
                around = around.concat([state.tableData[row][cell - 1], state.tableData[row][cell + 1]]);
                if (state.tableData[row + 1]) {
                    around = around.concat([state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]]);
                }

                const counted = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                if (counted.length === 0 && row > -1) {
                    //주변칸에 지뢰가 하나도 없는 경우       
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1])
                    near.push([row, cell + 1])
                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }

                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            //열었던 칸이 아닌 경우
                            checkAround(n[0], n[1]);
                        }
                    });
                }

                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], cell, counted.length);
            }

            checkAround(row, cell); //이렇게 함수로 따른 빼는 이유? 코드를 접을수 있고, 나주에 봤을때 무엇을 위한 코드인지 알수있기 때문에

            let halted = false;
            let result = '';

            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                //지금까지 연 칸의 개수 +  지금 연칸의 개수 = 총 연칸의 개수
                halted = true
                result = `${state.timer}초만에 승리하셨습니다.`
            }

            //최종적으로 vuex state에 저장
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, {
            row,
            cell
        }) {
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {
            row,
            cell
        }) {
            if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {
            row,
            cell
        }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, {
            row,
            cell
        }) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREAMENT_TIMER](state) {
            state.timer += 1;
        },
    }
})