/*
 * @Author: theajack
 * @Date: 2021-08-05 21:41:24
 * @LastEditor: theajack
 * @LastEditTime: 2021-08-05 22:09:11
 * @Description: Coding something
 * @FilePath: \comment\src\custom-host.js
 */

let customHost = '';
let getUrl = '/api/comment/cnchar';
let insertUrl = getUrl;

export function setCustomHost (urlConfig) {
    if (typeof urlConfig === 'object') {
        let {get, insert, host} = urlConfig;
        if (host) {
            if (host.indexOf('https:') !== 0 && host.indexOf('http:') !== 0) {
                host = `${location.protocol}//${host}`;
            }
            customHost = host;

            // 配置了host 就更改默认的path
            getUrl = '/api/comment/get';
            insertUrl = '/api/comment/insert';
            if (get) {
                getUrl = get;
            }
            if (insert) {
                insertUrl = insert;
            } else if (get) {
                insertUrl = get;
            }
        }
    }
}

const allowedHost = [
    'www.shiyix.cn',
    'shiyix.cn',
    'theajack.com',
    'www.theajack.com',
    'theajack.gitee.io',
    'theajack.github.io',
];

export function getBaseURL () {
    if (customHost) {
        return customHost;
    }
    let host = location.host;
    if (allowedHost.indexOf(host) !== -1) {
        return 'https://www.shiyix.cn';
    }
    return '';
}

export function getInsertCommentUrl () {
    return insertUrl;
}

export function getGetCommentUrl () {
    return getUrl;
}