<!--
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 00:52:32
 * @Description: Coding something
-->
<template>
    <div class='comment-textarea-w'>
        <editor :content.sync='content' ref='editor'/>
        <div class='comment-f-w'>
            <i class='ei-code comment-f-b' :title='lang("code")' @click='insertCode'></i>
            <i class='ei-link comment-f-b' :title='lang("url")' @click='insertLink'></i>
            <i class='ei-file-image comment-f-b' :title='lang("img")' @click='insertImage'></i>
            <i :class='`ei-${showEmoji?"meh":"smile"} comment-f-b`' :title='lang("emoji")' @click='toggleEmoji'></i>
            <i :class='`ei-eye-${showPreview?"close":"open"} comment-f-b`' :title='lang("md")' @click='togglePreview'></i>
            <span class='comment-f-sb' @click='submit'>
                <i class='ei-comment-alt' :title='lang("comment")'></i>
                <span>{{lang('submit')}}</span>
            </span>
        </div>
        <emoji :visible='showEmoji' @insertEmoji='insertEmoji' />
        <md-preview ref='preview' :content='content' :showPreview='showPreview'/>
    </div>
</template>
<script>
    import Editor from '../editor/editor.vue';
    import Emoji from '../emoji/emoji.vue';
    import MdPreview from '../md-preview/md-preview.vue';
    import {showWarningTip} from '../tip/tip';
    export default {
        name: 'text-area',
        components: {Editor, Emoji, MdPreview},
        data () {
            return {
                content: '',
                showPreview: false,
                showEmoji: false,
            };
        },
        watch: {
            content () {
                if (this.showPreview) {
                    this.preview();
                }
            }
        },

        methods: {
            preview () {
                this.$refs.preview.preview();
            },
            insertLink () {
                this.$refs.editor.insertText('[]()', 1);
            },
            insertImage () {
                this.$refs.editor.insertText('![alt]()', 7);
            },
            insertEmoji (text) {
                this.$refs.editor.insertText(text, text.length);
            },
            insertCode () {
                this.$refs.editor.insertText('```js\n\n```', 6);
            },
            submit () {
                if (!this.content) {
                    showWarningTip('内容不可为空');
                    return;
                }
                this.$emit('onsubmit', {
                    content: this.content,
                    success: () => {
                        this.content = '';
                    }
                });
            },
            togglePreview () {
                if (!this.showPreview) {
                    this.preview();
                }
                this.showPreview = !this.showPreview;
            },
            toggleEmoji () {
                this.showEmoji = !this.showEmoji;
            }
        }
    };
</script>

