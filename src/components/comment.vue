<template>
    <div class='comment-w'>
        <comment-submit />
        <div class='comment-list' v-for='(comment, index) in list' :key='index'>
            <comment-item :comment='comment' />
        </div>
        <div v-if='lock' class='comment-loading' @click='showMore'>
            正在加载 <i class='ei-spinner-snake ei-spin'></i>
        </div>
        <div v-if='showMoreBtn' class='comment-show-more' @click='showMore'>
            查看更多
        </div>
        <div v-else class='comment-no-more'>
            --已经到底了--
        </div>
    </div>
</template>
<script>
    import CommentItem from './comment-item.vue';
    import CommentSubmit from './submit.vue';
    import {services} from '../service';
    export default {
        name: 'comment',
        components: {CommentItem, CommentSubmit},
        data () {
            return {
                list: [],
                showMoreBtn: true,
                index: 1,
                size: 10,
                lock: false,
            };
        },
        mounted () {
            this.showMore();
        },
        methods: {
            async showMore () {
                if (!this.showMoreBtn || this.lock) {return;}
                this.lock = true;
                let data = await services.getComment({
                    index: this.index,
                    size: this.size
                });
                if (data.length < this.size) {
                    this.showMoreBtn = false;
                }
                this.index ++;
                this.list.push(...data);
                this.lock = false;
            }
        }
    };
</script>

