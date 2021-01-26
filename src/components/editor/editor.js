import {onKeyDown} from './key-down';

const DEFAULT_TAB = '    ';
const NEW_LINE = '\n';

export function getCursorIndex ({el, ignoreNewLine = true}) {
    let text = getTextBeforeCursor({el});
    if (ignoreNewLine) {
        text = text.replace(new RegExp(NEW_LINE, 'g'), '');
    }
    return text.length;
}

export function getCursorLineNumber ({el}) {
    // 获取当前是几行
    return getTextBeforeCursor({el}).split(NEW_LINE).length - 1;
}

export function getCursorLineIndex ({el}) {
    // 获取光标在当前行的位置
    let text = getTextBeforeCursor({el});
    let lastNewLineIndex = text.lastIndexOf(NEW_LINE);
    return text.substring(lastNewLineIndex + 1).length;
}

export function initTabIndent ({el, tab = DEFAULT_TAB}) {
    document.addEventListener('keydown', (e) => {
        onKeyDown({el, e, tab});
    }, false);
}

export function getSelectionText () {
    let text = '';
    // 开始到光标位置的内容
    try {
        let selecter = window.getSelection().toString();
        if (selecter != null && selecter.trim() != '') {
            text = selecter;
        }
    } catch (err) {
        let selecter = document.selection.createRange();
        let s = selecter.text;
        if (s != null && s.trim() != '') {
            text = s;
        }
    }
    return text;
}

export function getSelectionIndexRange (el) {
    let len = getSelectionText().length;
    let start = getCursorIndex({el});
    return [start, start + len];
}

export function replaceSelectionText ({el, text, needFocus = true}) {
    let value = el.value;
    let range = getSelectionIndexRange(el);
    el.value = `${value.substring(0, range[0])}${text}${value.substring(range[1] + 1)}`;
    if (needFocus) {
        setCursorIndex({el, index: range[0] + text.length});
    }
}

export function insertText ({el, text}) {
    if (document.selection) {
        let sel = document.selection.createRange();
        sel.text = text;
    } else if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
        let startPos = el.selectionStart,
            endPos = el.selectionEnd,
            cursorPos = startPos,
            tmpStr = el.value;
        el.value = tmpStr.substring(0, startPos) + text + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += text.length;
        el.selectionStart = el.selectionEnd = cursorPos;
    } else {
        el.value += text;
    }
}

export function setCursorToEnd ({el}) {
    let index = el.value.length;
    setCursorIndex({el, index});
}

export function setCursorIndex ({el, index}) {
    el.focus();
    if (document.selection) {
        let sel = el.createTextRange();
        sel.moveStart('character', index);
        sel.collapse();
        sel.select();
    } else if (typeof el.selectionStart == 'number' && typeof el.selectionEnd == 'number') {
        el.selectionStart = el.selectionEnd = index;
    }
}

function getTextBeforeCursor ({el}) {
    let v = el.value;
    // 开始到光标位置的内容
    let text = '';
    if ('selectionStart' in el) {
        text = v.substr(0, el.selectionStart);
    } else if (document.createRange) {
        let oSel = document.createRange();
        oSel.moveStart('character', -el.value.length);
        text = oSel.text;
    } else {
        let oSel = document.selection.createRange();
        oSel.moveStart('character', -el.value.length);
        text = oSel.text;
    }
    return text;
}