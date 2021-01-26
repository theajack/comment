<template>
    <div class='comment-submit'>
        <div class='comment-s-header'>
            <input class='comment-s-input' type='text' placeholder='称呼' v-bind='name'>
            <input class='comment-s-input' type='text' placeholder='联系方式' v-bind='contact'>
        </div>
        <text-area @onsubmit='onsubmit'></text-area>
    </div>
</template>
<script>
    import TextArea from './text-area/text-area.vue';
    export default {
        name: 'comment-submit',
        components: {TextArea},
        data () {
            return {
                name: '',
                contact: '',
                content: ''
            };
        },
        methods: {
            onsubmit (html) {
                console.log(html);
            }
        }
    };
</script>

