<template>
    <div>
        <comment
            :theme='theme'/>
    </div>
</template>
<script>
    // import {Comment} from '../src/index';
    import {Comment} from '../npm';
    // import Comment from '../src/components/comment-list.vue';

    export default {
        components: {Comment},
        data () {
            return {
                theme: 'dark'
            };
        },
        mounted () {
            window.p = this;
        }
    };
</script>

