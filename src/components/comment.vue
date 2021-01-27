<template>
    <div class='comment-w'>
        <comment-submit @onsubmit='onsubmit'/>
        <tip />
        <div class='comment-list' v-for='(comment, index) in list' :key='index'>
            <comment-item :comment='comment' />
        </div>
        <div class='comment-info'>
            <div v-if='status === "loading"' class='comment-loading' @click='showMore'>
                正在加载 <i class='ei-spinner-snake ei-spin'></i>
            </div>
            <div v-else-if='status === "more"' class='comment-show-more' @click='showMore'>
                查看更多
            </div>
            <div v-else-if='status === "nomore"' class='comment-no-more'>
                已经到底了
            </div>
            <div v-else class='comment-no-more'>
                暂无评论-快来成为第一个人吧~
            </div>
        </div>
    </div>
</template>
<script>
    import CommentItem from './comment-item.vue';
    import CommentSubmit from './submit.vue';
    import Tip from './tip/tip.vue';
    import {services} from '../service';
    import {timeToTimeStr} from '../utils/time';
    export default {
        name: 'comment',
        components: {CommentItem, CommentSubmit, Tip},
        data () {
            return {
                status: 'none',
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
            async showMore () {
                if (!this.status === 'nomore' || this.lock) {return;}
                this.lock = true;
                this.status = 'loading';
                let data = await services.getComment({
                    index: this.index,
                    size: this.size
                });
                if (data.length < this.size) {
                    this.status = 'nomore';
                } else {
                    this.status = 'more';
                }
                data.forEach(item => {
                    item.dateStr = timeToTimeStr(item.createTime);
                });
                this.list.push(...data);
                if (this.list.length === 0) {
                    this.status = 'none';
                }
                this.index ++;
                this.lock = false;
            }
        }
    };
</script>

