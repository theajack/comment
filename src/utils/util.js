/*
 * @Author: tackchen
 * @Date: 2022-04-01 00:54:29
 * @LastEditors: tackchen
 * @LastEditTime: 2022-04-01 00:57:14
 * @FilePath: /comment/src/utils/util.js
 * @Description: Coding something
 */

export function random (a, b) {
    return (a + Math.round(Math.random() * (b - a)));
};

export function buildRandomId (n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        const num = random(0, 10 + 26 + 26 - 1);
        if (num <= 9) {
            result.push(num);
        } else if (num <= 9 + 26) {
            result.push(String.fromCharCode(65 + num - 10));
        } else {
            result.push(String.fromCharCode(97 + num - 10 - 26));
        }
    }
    return result.join('');
}