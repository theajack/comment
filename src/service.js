import axios from 'axios';
import {showErrorTip, showSuccessTip} from './components/tip/tip';

export let services = {
    insertComment,
    getComment,
};

export function injectService (se) {
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
        url: '/api/comment/cnchar',
        responseType: 'json',
        data: {
            name,
            contact,
            content
        }
    });
    let success = (res.data.code === 0);
    if (success) {
        showSuccessTip('提交评论成功');
    } else {
        showErrorTip('提交评论失败');
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
        url: '/api/comment/cnchar',
        responseType: 'json',
        params: {
            index,
            size,
            all,
            condition
        }
    });
    let data = res.data;
    let success = (data.code === 0);
    if (!success) {
        showErrorTip('拉去列表失败');
    }
    return success ? data.data : [];
}
const allowedHost = [
    'www.shiyix.cn',
    'shiyix.cn',
    'theajack.com',
    'www.theajack.com',
    'theajack.gitee.io',
    'theajack.github.io',
];

function getBaseURL () {
    let host = location.host;
    if (allowedHost.indexOf(host) !== -1) {
        return 'https://www.shiyix.cn';
    }
    return '';
}