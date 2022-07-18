## [tc-comment](https://github.com/theajack/comment)

**[English](https://github.com/theajack/comment) | [使用案例](https://theajack.github.io/message-board/?app=tc-comment)**

一个支持markdowm和emoji评论组件，无需任何配置，无需申请任何账号，即引即用

## 特性

1. 一行代码引入，无需任何配置
2. 无需申请任何账号，即引即用
3. 支持markdowm和emoji评论组件
4. 支持实时预览
5. 支持代码消息的插入链接
6. 支持深色模式，适配网站原有深色模式
7. 支持自定义 services 和 url
8. 支持插入图片

### 1. 快速使用

```js
import {initComment} from 'tc-comment';
initComment({
    appName: 'xxx', // 自己起一个你的应用名称
});
```

cdn 使用

```html
<script src="https://cdn.jsdelivr.net/npm/tc-comment/tc-comment.min.js"></script>
<script>
    TComment.initComment({
        appName: 'xxx', // 自己起一个你的应用名称
    });
</script>
```

### 2. vue 组件引入

```js
// ...
import {Comment} from 'tc-comment';

Comment.init({appName: 'xxx'}); // 自己起一个你的应用名称

export default {
    components: {Comment},
    // ...
}
```

### 3. 配置参数

```ts
initComment({
    appName: string; 
    el?: HTMLElement | string; // Comment.init 传入该参数无效
    theme?: 'dark' | 'light';
    darkSelector?: string;
    services?: {
        insertComment: InsertComment;
        getComment: GetComment;
        insertReply: InsertReply;
    };
    urlConfig?: {
        host: string;
        get?: string;
        insert?: string;
        reply?: string;
    };
    dataHandler?: {
        get?: (data: IGetOption) => any;
        insert?: (data: IComment) => any;
        reply?: (data: IReply) => any;
    };
})
// Comment.init 参数与上述参数一致
```

1. appName: 必选 起一个应用名称，建议数字+字母组合，支持使用 / 划分目录 如 appName = blog/2022/hello
2. el 渲染的容器 默认会append一个元素到body上
3. theme 主题色
4. darkSelector 填写一个深色主题色的选择器，一般用于适配主网站的深色主题
5. services，urlConfig，dataHandler 后续详细介绍

### 4. 自定义 services

tc-comment 支持自定义方法来实现你自己的请求方法

```js
import {initComment} from 'tc-comment';
initComment({
    el: '#app',
    services: { // 请自行注入三个请求 插入评论 插入回复 和 获取评论
        insertComment(){

        },
        getComment(){

        },
        getComment(){

        }
    }
});
```

insertComment 和 getComment ts声明

```ts
interface InsertComment {
    (data: {
        name: string;
        contact: string;
        content: string;
    }): Promise<boolean>;
}

interface InsertReply {
    (data: {
        name: string;
        contact: string;
        content: string;
        commentId: number;
    }): Promise<boolean>;
}

interface GetComment {
    (query: {
        index?: number;
        size?: number;
        all?: boolean;
        condition?: object;
    }): Promise<Array<{
        createTime: number;
        name: string;
        content: string;
    }>>;
}
```

### 5. 自定义接口 urlConfig

tc-comment 支持通过配置 urlConfig 自定义接口

urlConfig 参数优先级低于 services参数

```js
import {initComment} from 'tc-comment';
initComment({
    el: '#app',
    urlConfig: {
        host:'www.example.com',
        get:'/api/comment/get',
        insert:'/api/comment/insert',
        reply:'/api/reply/insert'
    },
});
```

使用 urlConfig 参数的话，tc-comment 会调用该域名下面的三个接口，请自行部署

1. get 请求 用于拉取评论

- path: urlConfig.get
- method: get
- 参数: index, size, all, condition, app
- 返回: {data: {code: 0, data: [CommentObject]}} 0表示成功
- responseType: json

CommentObject

```ts
{
    id: number;
    name: string;
    contact: string;
    content: string;
    createTime: number; // 时间戳
    reply: Array<{
        name: string;
        contact: string;
        content: string;
        createTime: number; // 时间戳
    }>;
}
```

1. insert 请求 用于上传评论

- path: urlConfig.insert
- method: post
- 参数: name, contact, content, app
- 返回: {data: {code: 0}} 0表示成功
- responseType: json

3. reply 请求 用于上传回复

- path: urlConfig.insert
- method: post
- 参数: name, contact, content, commentId, app
- 返回: {data: {code: 0}} 0表示成功
- responseType: json

### 6. dataHandler

使用自定义 urlConfig时 可以搭配 dataHandle 修改请求数据

使用方式如下

```js
import {initComment} from 'tc-comment';
initComment({
    el: '#app',
    urlConfig: {
        host:'www.example.com',
        get:'/api/comment/get',
        insert:'/api/comment/insert',
        reply:'/api/reply/insert'
    },
    
    dataHandler: {
        get: (data) => {return data},
        insert: (data) => {return data},
        reply: (data) => {return data},
    }
});
```