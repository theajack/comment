<template>
    <div class='comment-emoji-w' v-show='visible' ref='emojis' v-html='emojiHtml' @click='insertEmoji'>
    </div>
</template>
<script>
    import {emojiHtml, emojiNames} from './emoji';
    let emojisDomArray = null;
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
        },
        methods: {
            insertEmoji (e) {
                if (!emojisDomArray) {
                    emojisDomArray = Array.prototype.slice.call(this.$refs.emojis.children);
                    window.ee = emojisDomArray;
                }
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

