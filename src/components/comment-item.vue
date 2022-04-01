<template>
    <div>
        <Comment @onaddreply='onaddreply' :isReply='isReply' :comment='comment'/>
        <reply-list :reply='comment.reply' v-if='!isReply' />
    </div>
</template>
<script>
    import Comment from './comment.vue';
    import ReplyList from './reply-list.vue';
    
    export default {
        name: 'comment-item',
        components: {Comment, ReplyList},
        props: {
            comment: {
                required: true,
                type: Object
            },
            isReply: {
                type: Boolean,
                default: false,
            }
        },
        data () {
            return {
                
            };
        },
        methods: {
            onaddreply (data) {
                this.$emit('onaddreply', data);
            }
        }
    };
</script>