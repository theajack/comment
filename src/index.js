import Vue from 'vue';
import CommentList from './components/comment-list.vue';
import {initDataHandler, initDataService} from './service';
import {setCustomHost} from './custom-host';
import './styles/index.less';
import 'easy-icon/offline';

export default function initComment ({
    el,
    services,
    urlConfig,
    dataHandler
}) {
    if (services) {
        initDataService(services);
    } else if (urlConfig) {
        setCustomHost(urlConfig);
    }

    if (dataHandler) {
        initDataHandler(dataHandler);
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
