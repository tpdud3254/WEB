/*  FIXME: webpack.config.js
    * ����ó���� �Ҷ�(����ŷ webpacking) ���� ������ �� ��ä�� ���
    * entry, module, plugins, output -> �� 4���� �ְ���
    * ���� : ��ũ��Ʈ������ �ʹ� �������� �ϳ��� ��ġ���� �����
        -> �׷��� �ϳ��� ��ĥ ������? ��鰳�� ��ũ��Ʈ ���ϵ� �߿��� ���� ��ǥ�� �Ǵ°��� entry���ٰ� ���´�
    * app.js, ./dist �� ������� �����
    * package.json
        {
            "name": "number-baseball",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "build": "webpack"  -> �̷��� �����ϰ� npm run build �ϸ� ���� �¸��� ��� (�ϳ��� �ذ��غ���)
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
        1. "./dist" is not an absolute path! (�����η� �����)
            const path = require('path');
            path: path.join(__dirname, "./dist")
        2. (���� ������ ���°� �´µ� �ȳ�)
            main.js �� import NumberBaseball from "./NumberBaseball.vue"; �߰�
        3. ou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
            | // ?? ??????? ?��???
            |
            > <template>
            |   <div>
            |     <h1>{{result}}</h1>
            -> main.js ���� > /NumberBaseball.vue ���� > �� �� �ڹ� ��ũ��Ʈ �ƴ��ݾ� > �̷��� rules�� �������
        3. vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
            -> const VueLoaderPlugin = require("vue-loader/lib/plugin");
                 plugins: [new VueLoaderPlugin()],
        4. [vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
            -> npm i vue-template-compiler -D
            -> package.json�� vue�� vue-template-compiler�� ������ ��ġ�ؾ��� (���߿� ���� �ȸ����� npm i vue@2.7.0 �̷������� /����̾Ⱦ��� �׻� �ֽŹ���)
    * dist/app.js�� ��� ���󵵵ȴ� �׳� �ϰ� ���°�. ������ �˾Ƽ� ����� �����ְڰŴ�..�ϰ�
*/

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path"); //��忡�� �����ϴ� ���
//���� �ڵ� ������ ���°� �Ȱ����� ���⼱ require�̰� .vue������ import
// -> ���ȯ�濡���� require vueȯ�濡���� import���ٰ� �ϴ� �����ص�. ������ ���ȯ���̴ϱ� require

module.exports = {
    //����� ����̶����� ����� (���߿� �ٽ� ����)
    mode: 'development', //������ production
    devtool: 'eval', //���� �� hidden-source-map, eval�ϸ� ������ �����ϴ� �ӵ��� ������
    resolve: { //Ȯ���ڰ����� ó�����ټ�����
        extensions: ['.js', '.vue'], // ���� : main.js> import NumberBaseball from "./NumberBaseball.vue"; ���� .vue�� ���ټ�����
    },
    entry: {
        app: path.join(__dirname, "./main.js") //��鰳�� ��ũ��Ʈ ���ϵ� �߿��� ���� ��ǥ�� �Ǵ°��� entry���ٰ� ���´�
        //app : ���߿� ������ ���� �̸�
    },
    module: {
        // ������ �ٽ�, ���� : �ڹٽ�ũ��Ʈ ������ ��ĥ �� ��� ��ĥ����..�����صδ°�, �����Ѱ� ������ ����
        rules: [{
            test: /\.vue$/, // ���ϸ��� .vue�� ������($)����
            loader: "vue-loader" // ���� ������ �ڵ�� �ٽ� �ٿ�޾ƾ��� (npm i vue-loader -D), ���� .vue�� ������ ������ ó���ϴ°��̾ƴ϶� vue-loader�� ó����
            //loader == use
        }]
    },
    plugins: [new VueLoaderPlugin()], // ������ ó���ϴٰ� �ƿ�ǲ ���� �÷����ε��� ��ó���ϴ´��� �ѹ��� �������ִ�����
    output: { // ���
        filename: "[name].js", //app.js��� ��� ��
        path: path.join(__dirname, "./dist") //���߿� dist�ȿ� app.js��� ��� ������ ���� ��
    }
};