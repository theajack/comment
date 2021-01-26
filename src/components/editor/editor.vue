<template>
    <textarea
        class='comment-editor'
        @input='input'
        ref='textArea'
        :value='content' />
</template>
<script>
    import {
        getCursorIndex,
        getCursorLineIndex,
        getCursorLineNumber,
        getSelectionText,
        initTabIndent,
        replaceSelectionText
    } from './editor.js';

    export default {
        name: 'editor',
        props: {
            content: {
                type: String,
                require: false,
                default: ''
            }
        },
        mounted () {
            let el = this.$refs.textArea;
            window.el = this.$refs.textArea;
            initTabIndent({el: this.$refs.textArea});
            setTimeout(() => {
                replaceSelectionText({el, text: 'xxx'});
            }, 4000);
            // setInterval(() => {
            //     console.log('index', getCursorIndex(this.$refs.textArea));
            //     console.log('line', getCursorLineNumber(this.$refs.textArea));
            //     console.log('line index', getCursorLineIndex(this.$refs.textArea));
            //     console.log('select text', getSelectText());
            // }, 1000);
        },
        methods: {
            input () {
                this.$emit('update:content', this.$el.value);
            },
            insertText () {
                
            }
        }
    };
</script>

