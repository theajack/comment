/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-16 01:34:05
 * @Description: Coding something
 */
let lang = 'cn';

const LangMap = {
    nickname: ['称呼'],
    contact: ['联系方式'],
    code: ['插入代码片段', 'Insert Code'],
    url: ['插入链接', 'Insert Link'],
    img: ['插入图片链接', 'Insert Image Link'],
    emoji: ['插入表情', 'Insert Emoji'],
    md: ['预览markdown', 'Preview Markdown'],
    comment: ['提交评论', 'Submit'],
    submit: ['提交', 'Submit'],
    textarea: ['快来留言吧, 支持markdown哦~', 'Come and leave a message, support markdown~'],
    success: ['回复评论成功', 'Reply successfully'],
    fail: ['回复评论失败', 'Reply failed'],
    cSuccess: ['提交评论成功', 'Commment successfully'],
    cFail: ['提交评论失败', 'Commment failed'],
    lFail: ['拉取列表失败', 'Pulling the list failed'],
};

export function getText (name, en) {
    if (typeof en === 'string') {
        return lang === 'cn' ? name : en;
    }
    return LangMap[name][lang === 'cn' ? 0 : 1] || upcaseFirst(name);
}

export function setLang (v) {
    lang = v === 'en' ? 'en' : 'cn';
}

function upcaseFirst (v) {
    return v[0].toUpperCase() + v.substr(1);
}

export const mixin = {
    methods: {
        lang: getText
    }
};
  