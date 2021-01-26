<template>
    <div>
        <editor :content.sync='content' ref='editor'/>
        <div class='comment-f-w'>
            <i class='ei-smile' title='插入表情'></i>
            <i class='ei-code' title='插入代码片段'></i>
            <i class='ei-link' title='插入链接' @click='submit'></i>
            <i class='ei-window' title='预览markdown' @click='togglePreview'></i>
            <i class='ei-comment-alt' title='提交评论' @click='submit'></i>
        </div>
        <div class='comment-preview' v-show='showPreview'>
            {{mdHtml}}
        </div>
    </div>
</template>
<script>
    import Editor from '../editor/editor.vue';
    import showDown from 'showdown';
    const converter = new showDown.Converter();
    export default {
        name: 'text-area',
        components: {Editor},
        data () {
            return {
                mdHtml: '',
                content: '',
                showPreview: false,
            };
        },
        mounted () {
            window._v = this;
        },
        methods: {
            insertLink () {
                this.$editor.insertText('');
            },
            insertEmoji () {
                this.$editor.insertText('');
            },
            insertCode () {
                this.$editor.insertText('');
            },
            submit () {
                this.preview();
                this.$emit('onsubmit', this.mdHtml);
            },
            togglePreview () {
                if (!this.showPreview) {
                    this.preview();
                }
                this.showPreview = !this.showPreview;
            },
            preview () {
                if (this.content) {
                    this.mdHtml = converter.makeHtml(this.content);
                } else {
                    this.mdHtml = '';
                }
            }
        }
    };
</script>

