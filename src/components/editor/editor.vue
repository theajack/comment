<template>
    <textarea
        class='comment-editor'
        @input='oninput'
        ref='textArea'
        :value='content' />
</template>
<script>
    import {Editor} from './editor.js';
    const editor = new Editor();
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
            editor.injectDOM(this.$refs.textArea);
            editor.initTabIndent();
        },
        methods: {
            oninput () {
                this.$emit('update:content', this.$el.value);
            },
            insertText (text, step) {
                editor.insertText(text);
                if (typeof step === 'number') {
                    editor.foucusOnCursorStep(step - text.length);
                }
                this.oninput();
            }
        }
    };
</script>

