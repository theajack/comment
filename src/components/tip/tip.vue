<template>
    <div class='comment-tip'>
        <span :class='"comment-content comment-tip-"+tipType'>{{tip}}</span>
        <span class='comment-logo comment' >
            Power by <i class='ei-comments-alt'></i> <a target='view_window' href='https://github.com/theajack/comment'>tc-comment</a>
        </span>
    </div>
</template>
<script>
    import {injectShowTip} from './tip';
    export default {
        name: 'comment',
        components: {},
        data () {
            return {
                tip: '',
                timer: null,
                tipType: 'info'
            };
        },
        mounted () {
            injectShowTip(({text, time, type}) => {
                this.showTip({text, time, type});
            });
        },
        methods: {
            showTip ({text = '', time = 3000, type = 'info'}) {
                if (!text) {return;}
                clearTimeout(this.timer);
                this.tipType = type;
                this.tip = text;
                this.timer = setTimeout(() => {
                    this.tip = '';
                }, time);
            }
        }
    };
</script>