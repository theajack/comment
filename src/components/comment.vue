<template>
    <div class='comment-item'>
        <div>
            <i class='ei-user comment-item-img'></i>
            <span class='comment-item-name'>{{comment.name || '匿名用户'}}</span>
            <span class='comment-item-date'>{{comment.dateStr}}</span>
        </div>
        <md-preview class='comment-item-content' :content='comment.content' :autoPreview='true'/>
        <reply v-if='!isReply' @onaddreply='onaddreply' :commentId='comment.id'/>
    </div>
</template>
<script>
    import MdPreview from './md-preview/md-preview.vue';
    import Reply from './reply.vue';
    export default {
        name: 'comment',
        components: {MdPreview, Reply},
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