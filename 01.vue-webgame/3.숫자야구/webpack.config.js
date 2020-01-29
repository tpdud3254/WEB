/*  FIXME: webpack.config.js
    * 웹팩처리를 할때(웹팩킹 webpacking) 모듈로 만들어둔 이 객채를 사용
    * entry, module, plugins, output -> 이 4개가 주가됨
    * 웹팩 : 스크립트같은게 너무 많아져서 하나로 합치려고 만든것
        -> 그렇담 하나로 합칠 파일은? 몇백개의 스크립트 파일들 중에서 가장 대표로 되는것을 entry에다가 적는다
    * app.js, ./dist 등 내맘대로 적어도됨
    * package.json
        {
            "name": "number-baseball",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "build": "webpack"  -> 이렇게 수정하고 npm run build 하면 오류 좌르륵 뜰것 (하나씩 해결해보자)
            },
            "author": "",
            "license": "ISC",
            "dependencies": {
                "vue": "^2.6.11"
            },
            "devDependencies": {
                "webpack": "^4.41.5",
                "webpack-cli": "^3.3.10"
            }
        }
        1. "./dist" is not an absolute path! (절대경로로 적어라)
            const path = require('path');
            path: path.join(__dirname, "./dist")
        2. (원래 에러가 나는게 맞는데 안남)
            main.js 에 import NumberBaseball from "./NumberBaseball.vue"; 추가
        3. ou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
            | // ?? ??????? ?κ???
            |
            > <template>
            |   <div>
            |     <h1>{{result}}</h1>
            -> main.js 접근 > /NumberBaseball.vue 접근 > 어 너 자바 스크립트 아니잖아 > 이래서 rules에 적어야함
        3. vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
            -> const VueLoaderPlugin = require("vue-loader/lib/plugin");
                 plugins: [new VueLoaderPlugin()],
        4. [vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
            -> npm i vue-template-compiler -D
            -> package.json의 vue와 vue-template-compiler의 버전이 일치해야함 (나중에 버전 안맞으면 npm i vue@2.7.0 이런식으로 /골뱅이안쓰면 항상 최신버전)
    * dist/app.js는 사실 몰라도된다 그냥 믿고 쓰는것. 웹팩이 알아서 어련히 잘해주겠거니..하고
*/

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path"); //노드에서 제공하는 모듈
//남의 코드 가져다 쓰는건 똑같은데 여기선 require이고 .vue에서는 import
// -> 노드환경에서는 require vue환경에서는 import쓴다고 일단 생각해둬. 웹팩은 노드환경이니까 require

module.exports = {
    //노드의 모듈이란것을 만든것 (나중에 다시 설명)
    mode: 'development', //배포시 production
    devtool: 'eval', //배포 시 hidden-source-map, eval하면 웹팩이 빌드하는 속도가 빨라짐
    resolve: { //확장자같은거 처리해줄수있음
        extensions: ['.js', '.vue'], // 역할 : main.js> import NumberBaseball from "./NumberBaseball.vue"; 에서 .vue를 없앨수있음
    },
    entry: {
        app: path.join(__dirname, "./main.js") //몇백개의 스크립트 파일들 중에서 가장 대표로 되는것을 entry에다가 적는다
        //app : 나중에 합쳐질 파일 이름
    },
    module: {
        // 웹팩의 핵심, 이유 : 자바스크립트 파일을 합칠 때 어떻게 합칠건지..설정해두는곳, 희한한거 만날때 설정
        rules: [{
            test: /\.vue$/, // 파일명이 .vue로 끝나는($)파일
            loader: "vue-loader" // 남이 만들어둔 코드라서 다시 다운받아야함 (npm i vue-loader -D), 이제 .vue로 끝나면 웹팩이 처리하는것이아니라 vue-loader가 처리함
            //loader == use
        }]
    },
    plugins: [new VueLoaderPlugin()], // 모듈들이 처리하다가 아웃풋 전에 플러그인들이 후처리하는느낌 한번더 가공해주느느낌
    output: { // 결과
        filename: "[name].js", //app.js라고 적어도 됨
        path: path.join(__dirname, "./dist") //나중에 dist안에 app.js라는 결과 파일이 남을 것
    }
};