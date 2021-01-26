<template>
    <div class='comment-emoji-w' v-show='visible' ref='emojis' v-html='emojiHtml' @click='insertEmoji'>
    </div>
</template>
<script>
    import {emojiHtml, emojiNames} from './emoji';
    let emojisDomArray = [];
    export default {
        name: 'emoji',
        props: {
            visible: {
                required: true,
                type: Boolean,
            }
        },
        data () {
            return {
                emojiHtml
            };
        },
        mounted () {
            emojisDomArray = Array.prototype.slice.call(this.$refs.emojis.children);
        },
        methods: {
            insertEmoji (e) {
                let target = e.target;
                if (target === this.$refs.emojis) {
                    return;
                }
                let index = emojisDomArray.indexOf(target);
                this.$emit('insertEmoji', emojiNames[index]);
            }
        }
    };
</script>

