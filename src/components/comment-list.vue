<template>
    <div :data-theme='theme' class='comment-w'>
        <comment-submit @onsubmit='onsubmit'/>
        <div class='comment-logo comment' >
            Powered by <i class='ei-comments-alt'></i> <a target='view_window' href='https://github.com/theajack/comment'>tc-comment</a>
        </div>
        <div class='comment-list' v-for='(comment, index) in list' :key='index'>
            <comment-item @onaddreply='onAddReply(comment, $event)' :comment='comment' />
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
    import {services} from '../service';
    import {nowDateTimeStr, timeToTimeStr} from '../utils/time';
    import {buildRandomId} from '../utils/util';
    import {getTheme} from '../dark-theme';
    export default {
        name: 'commen-list',
        props: {
            theme: {
                type: String,
                default: getTheme()
            }
        },
        components: {CommentItem, CommentSubmit},
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
            onAddReply (comment, reply) {
                reply.id = buildRandomId(8); // 渲染需要
                reply.dateStr = nowDateTimeStr();
                comment.reply.unshift(reply);
            },
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
                    this.index = 1;
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
                // // debugger
                // data[0].reply = [{
                //     contact: '',
                //     content: 'r1',
                //     createTime: 1648746468269,
                //     lastUpdateTime: 1648746468269,
                //     name: 'yjXKTw',
                // }, {
                //     contact: '',
                //     content: 'r2',
                //     createTime: 1648746468269,
                //     lastUpdateTime: 1648746468269,
                //     name: 'yjXKTw',
                // }];
                if (data.length < this.size) {
                    this.status = 'nomore';
                } else {
                    this.status = 'more';
                }
                data.forEach(item => {
                    item.dateStr = timeToTimeStr(item.createTime);
                    if (!item.reply) item.reply = [];
                    item.reply.forEach(item => {
                        item.id = buildRandomId(8); // 渲染需要
                        item.dateStr = timeToTimeStr(item.createTime);
                    });
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

