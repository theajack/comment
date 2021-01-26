<template>
    <div class='comment-item'>
        <div>
            <i class='ei-user comment-item-img'></i>
            <span class='comment-item-name'>{{comment.name || '匿名用户'}}</span>
            <span class='comment-item-date'>{{comment.dateStr}}</span>
        </div>
        <md-preview class='comment-item-content' ref='preview' :content='comment.content' :autoPreview='true'/>
    </div>
</template>
<script>
    import MdPreview from './md-preview/md-preview.vue';
    export default {
        name: 'comment-item',
        components: {MdPreview},
        props: {
            comment: {
                required: true,
                type: Object
            }
        },
        data () {
            return {
            };
        }
    };
</script>