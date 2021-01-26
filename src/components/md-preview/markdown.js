
import showDown from 'showdown';
const converter = new showDown.Converter();
export function renderMD (content) {
    return converter.makeHtml(content);
}