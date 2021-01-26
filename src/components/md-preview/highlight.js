
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/vs2015.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);

export function renderHighlight (el) {
    [
        'code.js',
        'code.javascript',
        'code.ts',
        'code.typescript',
        'code.css',
        'code.html',
        'code.xml'
    ].forEach(selector => {
        el.querySelectorAll(selector).forEach(block => {
            // then highlight each
            hljs.highlightBlock(block);
        });
    });
}