<template>
    <div class='comment-w'>
        <comment-submit @onsubmit='onsubmit'/>
        <div class='comment-list' v-for='(comment, index) in list' :key='index'>
            <comment-item :comment='comment' />
        </div>
        <div class='comment-info'>
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
    </div>
</template>
<script>
    import CommentItem from './comment-item.vue';
    import CommentSubmit from './submit.vue';
    import {services} from '../service';
    import {timeToTimeStr} from '../utils/time';
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
                    this.showMoreBtn = true;
                    this.index = 0;
                    this.list = [];
                    this.showMore();
                }
            },
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
                data.forEach(item => {
                    item.dateStr = timeToTimeStr(item.createTime);
                });
                this.list.push(...data);
                this.index ++;
                this.lock = false;
            }
        }
    };
</script>

