<!--
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 00:52:32
 * @Description: Coding something
-->
<template>
    <div class='comment-submit'>
        <div class='comment-s-header'>
            <input class='comment-s-input' type='text' :placeholder='lang("nickname")' v-model='name'>
            <input class='comment-s-input' type='text' :placeholder='lang("contact")' v-model='contact'>
        </div>
        <text-area @onsubmit='onsubmit'></text-area>
    </div>
</template>
<script>
    import TextArea from './text-area/text-area.vue';
    import {writeUserInfo, readUserInfo, AnonymousName} from '../utils/userInfo';
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
        mounted () {
            let {name, contact} = readUserInfo();
            this.name = name;
            this.contact = contact;
        },
        methods: {
            onsubmit ({content, success}) {
                writeUserInfo({
                    name: this.name,
                    contact: this.contact,
                });
                this.$emit('onsubmit', {
                    name: this.name || `user_${AnonymousName}`,
                    contact: this.contact,
                    content,
                    success
                });
            }
        }
    };
</script>

