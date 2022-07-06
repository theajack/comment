/*
 * @Author: theajack
 * @Date: 2021-08-05 21:41:24
 * @LastEditor: theajack
 * @LastEditTime: 2022-07-07 00:56:50
 * @Description: Coding something
 * @FilePath: /comment/src/custom-host.js
 */

let customHost = '';
let getUrl = '/api/message';
let insertUrl = '/api/message';
let replyUrl = '/api/message/reply';

export function setCustomHost (urlConfig) {
    if (typeof urlConfig === 'object') {
        let {get, insert, host, reply} = urlConfig;
        if (host) {
            if (host.indexOf('https:') !== 0 && host.indexOf('http:') !== 0) {
                host = `${location.protocol}//${host}`;
            }
            customHost = host;

            if (get) {
                getUrl = get;
            }
            if (insert) {
                insertUrl = insert;
            }
            if (reply) {
                replyUrl = reply;
            }
        }
    }
}

// const allowedHost = [
//     'www.shiyix.cn',
//     'shiyix.cn',
//     'theajack.com',
//     'www.theajack.com',
//     'theajack.gitee.io',
//     'theajack.github.io',
// ];

export function getBaseURL () {
    if (customHost) {
        return customHost;
    }
    return 'https://www.shiyix.cn';
    // let host = location.host;
    // if (allowedHost.indexOf(host) !== -1) {
    //     return 'https://www.shiyix.cn';
    // }
    // return '';
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