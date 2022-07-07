import Vue from 'vue';
import CommentList from './components/comment-list.vue';
import {initDataHandler, initDataService, setAppName} from './service';
import {setCustomHost} from './custom-host';
import {setThemeSelector} from './dark-theme';
import _version from './version';
import './styles/index.less';
import 'easy-icon/offline';

export const version = _version;

export const Comment = CommentList;

Comment.init = function (config) {
    initConfig(config);
};

function initConfig ({
    services,
    urlConfig,
    dataHandler,
    appName,
    theme,
    darkSelector = 'body',
}) {
    setAppName(appName);
    setThemeSelector(theme, darkSelector);
    if (services) {
        initDataService(services);
    } else if (urlConfig) {
        setCustomHost(urlConfig);
    }

    if (dataHandler) {
        initDataHandler(dataHandler);
    }
}

export function initComment ({
    el,
    appName,
    services,
    urlConfig,
    dataHandler,
    theme = 'light',
    darkSelector = '',
}) {
    initConfig({appName, services, urlConfig, dataHandler, darkSelector});

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
    const commentVue = new Vue({
        render: h => h(CommentList, {attrs: {theme}})
    }).$mount(container);

    return {
        setTheme (v) {
            commentVue.$el.setAttribute('data-theme', v);
        }
    };
}