
const map = {};

let themeStore = 'light';

export function getTheme () {
    return themeStore === 'dark' ? 'dark' : 'light';
}

export function setThemeSelector (theme, selector) {

    if (theme) {
        themeStore = theme;
    }

    if (selector && !map[selector]) {
        map[selector] = true;
        const style = document.createElement('style');
        style.innerText = /* css*/`
${selector} .comment-editor, 
${selector} .comment-s-input, 
${selector} .comment-preview, 
${selector} .comment-w .comment-list .comment-item .comment-item-content {
    background-color: #191919;
    color: #fff;
}
${selector} .comment-textarea-w .comment-f-w .comment-f-b:hover, 
${selector} .comment-textarea-w .comment-f-w .comment-f-sb:hover,
${selector} .comment-w .comment-logo a:hover,
${selector} .comment-w .comment-reply-w .comment-reply-btn:hover,
${selector} .comment-w .comment-info .comment-show-more:hover{
    color: #fff;
}
${selector} .comment-w .comment-submit,
${selector} .comment-w .comment-submit .comment-s-header .comment-s-input{
    border-color: #444;
}
${selector} .comment-w .comment-list .comment-item .comment-item-name{
    color: #aaa;
}
${selector} .comment-editor:focus {
    background-color: #111;
}
${selector} .comment-w .comment-submit .comment-s-header .comment-s-input:focus{
    background-color: #111;
    border-bottom: 1px dashed #ccc;
}
${selector} .comment-preview code {
    background-color: #333!important;
}`;
        document.head.appendChild(style);
    }
}