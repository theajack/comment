<template>
    <textarea
        class='comment-editor'
        @input='oninput'
        ref='textAraea'
        placeholder='快来留言吧，支持markdown哦~'
        :value='content' />
</template>
<script>
    import {Editor} from './editor.js';
    export default {
        name: 'editor',
        props: {
            content: {
                type: String,
                require: false,
                default: '',
            }
        },
        data () {
            return {
                editor: null,
            };
        },
        mounted () {
            this.editor = new Editor({el: this.$refs.textAraea});
            this.editor.initTabIndent();
        },
        methods: {
            oninput () {
                this.$emit('update:content', this.$el.value);
            },
            insertText (text, step) {
                this.editor.insertText(text);
                if (typeof step === 'number') {
                    this.editor.foucusOnCursorStep(step - text.length);
                }
                this.oninput();
            }
        }
    };
</script>

