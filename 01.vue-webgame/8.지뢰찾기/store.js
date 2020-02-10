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
    QUESITION: -2,
    FLAG: -3,
    QUESITION_MINE: -4,
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
        },
        [OPEN_CELL](state) {},
        [CLICK_MINE](state) {},
        [FLAG_CELL](state) {},
        [QUESTION_CELL](state) {},
        [NORMALIZE_CELL](state) {},
        [INCREAMENT_TIMER](state) {
            state.timer += 1;
        },
    }
})