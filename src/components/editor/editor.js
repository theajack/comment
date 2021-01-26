import {onKeyDown} from './key-down';

const DEFAULT_TAB = '    ';
const NEW_LINE = '\n';

export class Editor {
    constructor ({
        el,
    } = {}) {
        this.injectDOM(el);
    }

    injectDOM (el) {
        if (el instanceof HTMLElement) {
            this.el = el;
        } else if (typeof el === 'string') {
            this.el = document.querySelector(el);
        }
    }

    getCursorIndex (ignoreNewLine = false) {
        let text = this.getTextBeforeCursor();
        if (ignoreNewLine) {
            text = text.replace(new RegExp(NEW_LINE, 'g'), '');
        }
        return text.length;
    }

    getCursorLineNumber () {
        // 获取当前是几行
        return this.getTextBeforeCursor().split(NEW_LINE).length - 1;
    }

    getCursorLineIndex () {
        // 获取光标在当前行的位置
        let text = this.getTextBeforeCursor();
        let lastNewLineIndex = text.lastIndexOf(NEW_LINE);
        return text.substring(lastNewLineIndex + 1).length;
    }

    initTabIndent (tab = DEFAULT_TAB) {
        document.addEventListener('keydown', (e) => {
            onKeyDown({el: this.el, e, tab});
        }, false);
    }

    getSelectionText () {
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

    getSelectionIndexRange () {
        let len = this.getSelectionText().length;
        let start = this.getCursorIndex();
        return [start, start + len];
    }

    replaceSelectionText (text, needFocus = true) {
        let value = this.el.value;
        let range = this.getSelectionIndexRange(this.el);
        if (range[0] === range[1]) {
            return;
        }
        this.el.value = `${value.substring(0, range[0])}${text}${value.substring(range[1] + 1)}`;
        if (needFocus) {
            this.setCursorIndex(range[0] + text.length);
        }
    }

    insertText (text) {
        if (document.selection) {
            let sel = document.selection.createRange();
            sel.text = text;
        } else if (typeof this.el.selectionStart === 'number' && typeof this.el.selectionEnd === 'number') {
            let startPos = this.el.selectionStart,
                endPos = this.el.selectionEnd,
                cursorPos = startPos,
                tmpStr = this.el.value;
            this.el.value = tmpStr.substring(0, startPos) + text + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += text.length;
            this.el.selectionStart = this.el.selectionEnd = cursorPos;
        } else {
            this.el.value += text;
        }
    }

    setCursorToEnd () {
        let index = this.el.value.length;
        this.setCursorIndex( index);
    }

    setCursorIndex (index) {
        this.el.focus();
        if (document.selection) {
            let sel = this.el.createTextRange();
            sel.moveStart('character', index);
            sel.collapse();
            sel.select();
        } else if (typeof this.el.selectionStart == 'number' && typeof this.el.selectionEnd == 'number') {
            this.el.selectionStart = this.el.selectionEnd = index;
        }
    }

    foucusOnCursorStep (step) {
        let index = this.getCursorIndex();
        index += step;
        this.setCursorIndex(index);
    }

    getTextBeforeCursor () {
        let v = this.el.value;
        // 开始到光标位置的内容
        let text = '';
        if ('selectionStart' in this.el) {
            text = v.substr(0, this.el.selectionStart);
        } else if (document.createRange) {
            let oSel = document.createRange();
            oSel.moveStart('character', -this.el.value.length);
            text = oSel.text;
        } else {
            let oSel = document.selection.createRange();
            oSel.moveStart('character', -this.el.value.length);
            text = oSel.text;
        }
        return text;
    }
}
