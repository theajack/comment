import Vue from 'vue';
import CommentList from './components/comment-list.vue';
import {injectService} from './service';
import {setCustomHost} from './custom-host';
import './styles/index.less';
import 'easy-icon/offline';

export default function initComment ({
    el,
    services,
    urlConfig
}) {
    if (services) {
        injectService(services);
    } else if (urlConfig) {
        setCustomHost(urlConfig);
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
        render: h => h(CommentList)
    }).$mount(container);
}
