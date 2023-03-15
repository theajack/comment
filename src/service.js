import axios from 'axios';
import {showErrorTip, showSuccessTip} from './components/tip/tip';
import {getBaseURL, getGetCommentUrl, getInsertCommentUrl, getInsertReplyUrl} from './custom-host';
import {getText} from './lang';

let appName = '';

export function setAppName (name) {
    appName = name;
}

export function buildAppName () {
    return `tc_comment/${appName || 'common'}`;
}

export let services = {
    insertComment,
    insertReply,
    getComment,
};

let dataHandler = {
    get: d => d,
    insert: d => d,
    reply: d => d,
};

export function initDataHandler (handler) {
    Object.assign(dataHandler, handler);
}

export function initDataService (se) {
    for (let k in services) {
        if (se[k]) {
            services[k] = se[k];
        }
    }
}

async function insertComment ({
    name,
    contact,
    content
}) {
    const res = await axios({
        method: 'post',
        baseURL: getBaseURL(),
        url: getInsertCommentUrl(),
        responseType: 'json',
        data: dataHandler.insert({
            name,
            contact,
            content,
            app: buildAppName()
        })
    });
    let success = (res.data.code === 0);
    if (success) {
        showSuccessTip(getText('cSuccess'));
    } else {
        showErrorTip(getText('cFail'));
    }
    return success;
}

async function insertReply ({
    name,
    contact,
    content,
    commentId,
}) {
    const res = await axios({
        method: 'post',
        baseURL: getBaseURL(),
        url: getInsertReplyUrl(),
        responseType: 'json',
        data: dataHandler.reply({
            name,
            contact,
            content,
            commentId,
            app: buildAppName()
        })
    });
    let success = (res.data.code === 0);
    if (success) {
        showSuccessTip(getText('success'));
    } else {
        showErrorTip(getText('fail'));
    }
    return success;
}

async function getComment ({
    index = 1,
    size = 10,
    all = false,
    condition = null
}) {
    const res = await axios({
        method: 'get',
        baseURL: getBaseURL(),
        url: getGetCommentUrl(),
        responseType: 'json',
        params: dataHandler.get({
            index,
            size,
            all,
            condition,
            app: buildAppName()
        })
    });
    let data = res.data;
    let success = (data.code === 0);
    if (!success) {
        showErrorTip(getText('lFail'));
    }
    return success ? data.data : [];
}