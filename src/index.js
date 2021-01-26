import Vue from 'vue';
import Comment from './components/comment.vue';
import {injectService} from './service';
import './styles/index.less';
import 'easy-icon/offline';

export default function initComment ({
    el,
    services,
}) {
    if (services) {
        injectService(services);
    }
    let container = document.createElement('div');
    if (el instanceof HTMLElement) {

    } else if (typeof el === 'string') {
        el = document.querySelector(el);
        if (!el) {
            el = document.body;
        }
    } else {
        el = document.body;
    }
    el.appendChild(container);
    new Vue({
        render: h => h(Comment)
    }).$mount(container);
}
