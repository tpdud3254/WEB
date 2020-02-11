import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import NumberBaseball from '../3.숫자야구/NumberBaseball'
import ResponseCheck from '../4.반응속도체크/ResponseCheck'
import RockScissorsPaper from '../5.가위바위보/RockScissorsPaper'
import LottoGenerator from '../6.로또/LottoGenerator'
import GameMatcher from './GameMatcher'

export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/number-baseball',
        component: NumberBaseball
    }, {
        path: '/response-check',
        component: ResponseCheck
    }, {
        path: '/rock-scissors-paper',
        component: RockScissorsPaper
    }, {
        path: '/lotto-generator',
        component: LottoGenerator
    }, {
        path: '/game/:name', ////다이나믹 라우트 매칭. 게임이 수백개로 늘어나면 코드가 길어지는 문제 발생하니까..
        component: GameMatcher
    }]
});