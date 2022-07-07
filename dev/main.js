import {initComment, version} from '../src/index';
// import {initComment, version} from '../npm/';

console.log(version);

document.body.style.backgroundColor = '#222';

const data = {
    // el: '#app',
    appName: 'aa/bb',
    theme: 'dark',
    // darkSelector: 'body'
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