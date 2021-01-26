<template>
    <div class='comment-preview' ref='preview' v-show='showPreview' v-html='mdHtml'>
    </div>
</template>
<script>
    import {renderEmoji} from '../emoji/emoji';
    import {renderHighlight} from './highlight';
    import {renderMD} from './markdown';
    export default {
        name: 'md-preview',
        props: {
            showPreview: {
                required: false,
                type: Boolean,
                default: true
            },
            content: {
                required: true,
                type: String,
            },
            autoPreview: {
                required: false,
                type: Boolean,
                default: false,
            }
        },
        data () {
            return {
                mdHtml: ''
            };
        },
        mounted () {
            if (this.autoPreview) {
                this.preview();
            }
        },
        methods: {
            preview () {
                this.$nextTick(() => {
                    if (this.content) {
                        let content = this.content;
                        content = renderEmoji(content);
                        content = renderMD(content);
                        this.mdHtml = content;
                    } else {
                        this.mdHtml = '';
                    }
                    this.$nextTick(() => {
                        this.highlight();
                    });
                });
            },
            highlight () {
                renderHighlight(this.$refs.preview);
            }
        }
    };

</script>