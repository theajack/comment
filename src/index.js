import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
window.axios = axios;

// axios({
//     method: 'post',
//     url: '/api/comment/cnchar/insert',
//     responseType: 'json',
//     data: {
//         name: 'string',
//         contact: 'string',
//         content: 'string',
//     }
// }).then(res => {
//     console.log(res.data);
// });

// axios({
//     method: 'get',
//     url: '/api/comment/cnchar',
//     responseType: 'json',
//     params: {
//         // index: 1,
//         // size: 2
//     }
// }).then(res => {
//     console.log(res.data);
// });
export default function initComment (el) {
    new Vue({
        render: h => h(App)
    }).$mount(el);
}
