
import EmojiConvertor from 'emoji-js';

export const {emoji, emojiNames, emojiHtml, renderEmoji} = initEmoji();

function initEmoji () {
    const CDN_PATH = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data/';
    const emoji = new EmojiConvertor();
    emoji.img_sets.apple.path = CDN_PATH + 'img-apple-64/';
    emoji.img_sets.google.path = CDN_PATH + 'img-google-64/';
    emoji.img_sets.twitter.path = CDN_PATH + 'img-twitter-64/';
    emoji.img_sets.facebook.path = CDN_PATH + 'img-facebook-64/';
    emoji.img_sets.messenger.path = CDN_PATH + 'img-messenger-64/';
    let emojiNames = [];
    let start = false;
    let extract = ['263a-fe0f'];

    for (let k in emoji.data) {
        let name = emoji.data[k][3][0];
        if (k === '1f600') {
            start = true;
        }
        if (start || extract.indexOf(k) !== -1) {
            emojiNames.push(`:${name}:`);
        }
        if (k === '1f680') {
            start = false;
        }
    }
    function renderEmoji (content, initEmoji = false) {
        content = emoji.replace_colons(content);
        if (initEmoji && content.indexOf('</span>') === -1) { // ! 处理 mac os 中 返回的是emoji表情
            content = `<span class='mac-emoji'>${content.replace(/ /g, '</span><span class="mac-emoji">')}</span>`;
        }
        return content;
    }
    const emojiHtml = renderEmoji(emojiNames.join(' '), true);
    return {emoji, emojiNames, emojiHtml, renderEmoji};
}
