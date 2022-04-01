<template>
    <div>
        <div class='comment-reply-w' @click='onclick'>
            <span class='comment-reply-btn'>
                <i class='ei-comment-alt' title='回复评论'></i>
                <span>回复</span>
            </span>
        </div>
        <comment-submit v-show='showReply' @onsubmit='onsubmit'/>
    </div>
</template>
<script>
    import {services} from '../service';
    import CommentSubmit from './submit.vue';
    export default {
        name: 'reply',
        components: {CommentSubmit},
        props: {
            commentId: {
                required: true,
                type: Number
            },
        },
        data () {
            return {
                showReply: false
            };
        },
        methods: {
            async onsubmit ({
                name,
                content,
                contact,
                success
            }) {
                const reply = {
                    name,
                    content,
                    contact,
                    commentId: this.commentId
                };

                const bool = await services.insertReply(reply);
                // const bool = true; // debug
                if (bool) {
                    success();
                    this.$emit('onaddreply', reply);
                    this.showReply = false;
                }
            },
            onclick () {
                this.showReply = !this.showReply;
            }


        }
    };
</script>