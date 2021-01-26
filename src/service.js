import axios from 'axios';

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
        url: '/api/comment/cnchar/insert',
        responseType: 'json',
        data: {
            name,
            contact,
            content
        }
    });
    return (res.data.code === 0);
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
    return (data.code === 0) ? data.data : [];
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
        return 'https://theajack.gitee.io';
    }
    return '';
}