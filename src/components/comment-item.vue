<template>
    <div class='comment-item'>
        {{comment.content}}
    </div>
</template>
<script>
    export default {
        name: 'comment-item',
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