

export function formatTime (time, type = 'number') {
    let sec, hour, min;
    if (time <= 0) {
        sec = hour = min = 0;
    } else {
        sec = parseInt((time / 1000).toString());
        hour = Math.floor(sec / 3600);
        sec -= hour * 3600;
        min = Math.floor(sec / 60);
        sec -= min * 60;
    }
    if (type === 'json') {
        return {hour, min, sec};
    } else if (type === 'text') {
        return `${fnText(hour, '小时')}${fnText(min, '分钟')}${fnText(sec, '秒')}` || '0秒';
    }
    return `${fn(hour)}:${fn(min)}:${fn(sec)}`;
}

export function timeToTimeStr (time) {
    return dateToTimeStr(new Date(time));
}

export function nowDateTimeStr () {
    return dateToTimeStr(new Date());
}

export function nowDateTime () {
    return new Date().getTime();
}

export function dateToTimeStr (date) {
    return `${date.getFullYear()}-${fn(date.getMonth() + 1)}-${fn(date.getDate())} ${fn(date.getHours())}:${fn(date.getMinutes())}:${fn(date.getSeconds())}`;
}

function fn (num) {
    return num < 10 ? ('0' + num) : num;
}

function fnText (num, tail) {
    return num > 0 ? (num + tail) : '';
}