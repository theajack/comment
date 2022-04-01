/*
 * @Author: theajack
 * @Date: 2021-08-05 21:41:24
 * @LastEditor: theajack
 * @LastEditTime: 2022-04-01 16:14:08
 * @Description: Coding something
 * @FilePath: /comment/src/custom-host.js
 */

let customHost = '';
let getUrl = '/api/comment/get';
let insertUrl = '/api/comment/insert';
let replyUrl = '/api/comment/reply';

export function setCustomHost (urlConfig) {
    if (typeof urlConfig === 'object') {
        let {get, insert, host, reply} = urlConfig;
        if (host) {
            if (host.indexOf('https:') !== 0 && host.indexOf('http:') !== 0) {
                host = `${location.protocol}//${host}`;
            }
            customHost = host;

            // 配置了host 就更改默认的path
            getUrl = '/api/comment/get';
            insertUrl = '/api/comment/insert';
            replyUrl = '/api/comment/reply';
            if (get) {
                getUrl = get;
            }
            if (insert) {
                insertUrl = insert;
            } else if (get) {
                insertUrl = get;
            }
            if (reply) {
                replyUrl = reply;
            } else if (get) {
                replyUrl = get;
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

export function getInsertReplyUrl () {
    return replyUrl;
}