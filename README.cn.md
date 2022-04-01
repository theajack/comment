## tc-comment

一个支持markdowm和emoji评论组件

### 1. 使用自定义 services

```js
import initComment from 'tc-comment';
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
    }): Promise<Array<{
        createTime: number;
        name: string;
        content: string;
    }>>;
}
```

### 2. 使用自定义 urlConfig

或者使用 urlConfig 参数，urlConfig 参数优先级低于 services参数

```js
import initComment from 'tc-comment';
initComment({
    el: '#app',
    urlConfig: {
        host:'www.example.com',
        get:'/api/comment/get',
        insert:'/api/comment/insert',
        reply:'/api/comment/reply'
    }
});
```

使用 urlConfig 参数的话，tc-comment 会调用该域名下面的三个接口，请自行部署

1. get 请求 用于拉取评论

- path: urlConfig.get 默认值为 '/api/comment/get'
- method: get
- 参数: index, size, all, condition
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

- path: urlConfig.insert 默认值为 '/api/comment/insert'
- method: post
- 参数: name, contact, content
- 返回: {data: {code: 0}} 0表示成功
- responseType: json

3. reply 请求 用于上传回复

- path: urlConfig.insert 默认值为 '/api/comment/reply'
- method: post
- 参数: name, contact, content, commentId
- 返回: {data: {code: 0}} 0表示成功
- responseType: json
