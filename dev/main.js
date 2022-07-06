// import {initComment} from '../src/index';
import {initComment} from '../npm/';
const data = {
    // el: '#app',
    appName: 'aa/bb',
    // theme: 'dark',
};
window.d = data;
const {setTheme} = initComment(data);

window.setTheme = setTheme;


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