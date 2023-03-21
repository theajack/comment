/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 00:52:32
 * @Description: Coding something
 */
import {initComment, version} from '../src/index';
// import {initComment, version} from '../npm/';
import box from 'webapp-box';

async function add () {
    const container = await box.add();
    const data = {
        el: container,
        appName: 'tc_comment_dev',
        theme: 'dark',
        lang: 'en',
        // darkSelector: 'body'
    };
    container.style.backgroundColor = '#222';
    initComment(data);
}

window.add = add;

console.log(version);

document.body.style.backgroundColor = '#222';
const button = document.createElement('button');
button.innerText = 'add';
button.onclick = add;
document.body.appendChild(button);

// const data = {
//     // el: '#app',
//     appName: 'aa/bb',
//     theme: 'dark',
//     // darkSelector: 'body'
// };
// window.d = data;
// const {setTheme} = initComment(data);

// window.setTheme = setTheme;


// import Vue from 'vue';
// import Page from './page.vue';
// import {initComment, Comment} from '../src/index';
// // import {initComment, Comment} from '../npm';

// console.log(initComment, Comment);
// Comment.init({
//     theme: 'dark',
//     appName: 'aa/bb',
// });

// let container = document.createElement('div');
// document.getElementById('app').appendChild(container);

// new Vue({
//     el: container,
//     render: h => h(Page),
// });