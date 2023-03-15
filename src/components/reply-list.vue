<!--
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 00:52:32
 * @Description: Coding something
-->
<template>
    <div class='comment-w reply-list' v-show='reply.length > 0'>
        <comment :isReply='true'
                 v-for='(comment, index) in reply'
                 :comment='comment'
                 :key='comment.id'
                 v-show='showAll || index === 0'/>
        <div class='comment-info' v-show='reply.length>1'>
            <div class='comment-show-more' @click='showAll = !showAll'>
                {{showAll?lang('收起', 'Collapse'):lang('查看', 'View')}}{{lang('全部回复', ' all replies')}}
            </div>
        </div>
    </div>
</template>
<script>
    import Comment from './comment.vue';
    import {services} from '../service';
    export default {
        name: 'reply-list',
        components: {Comment},
        props: {
            reply: {
                type: Array,
                default () {return [];}
            }
        },
        data () {
            return {
                showAll: false
            };
        },
        mounted () {
        },
        methods: {
            async onsubmit ({
                name,
                content,
                contact,
                success
            }) {
                const bool = await services.insertComment({
                    name,
                    content,
                    contact
                });
                if (bool) {
                    success();
                    this.status = 'loading';
                    this.index = 0;
                    this.list = [];
                    this.showMore();
                }
            },
        }
    };
</script>

