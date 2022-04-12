## tc-comment

### [Demo](https://theajack.gitee.io/message-board)

A comment component that supports markdowm and emoji

And you can use this with [vuepress-plugin-tc-comment](https://github.com/theajack/vuepress-plugin-tc-comment)

### 1. Use custom services

```js
import initComment from'tc-comment';
initComment({
    el:'#app',
    services: {// Please inject three requests by yourself, for insert comments, insert comments and get comments
        insertComment(){

        },
        insertReply(){

        },
        getComment(){

        }
    }
});
```

insertComment and getComment ts statement

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

### 2. Use custom urlConfig

Or use the urlConfig parameter, the priority of the urlConfig parameter is lower than the services parameter

```js
import initComment from'tc-comment';
initComment({
    el:'#app',
    urlConfig: {
        host:'www.example.com',
        get:'/api/comment/get',
        insert:'/api/comment/insert',
        reply:'/api/reply/insert'
    }
});
```

If you use the urlConfig parameter, tc-comment will call the three api under the domain name, please deploy by yourself

1. get request is used to pull comments

- path: urlConfig.get default value is '/api/comment/get'
- method: get
- Parameters: index, size, all, condition
- Return: {data: {code: 0, data: [CommentObject]}} 0 means success
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

2. insert request for uploading comments

- path: urlConfig.insert default value is '/api/comment/insert'
- method: post
- Parameters: name, contact, content
- Return: {data: {code: 0}} 0 means success
- responseType: json

3. reply request for uploading the reply

- path: urlConfig.insert default value is '/api/reply/insert'
- method: post
- Parameters: name, contact, content, commentId
- Return: {data: {code: 0}} 0 means success
- responseType: json

### 3. dataHandler

When using a custom urlConfig, you can modify the request data with dataHandle

Use as follows

````js
import initComment from 'tc-comment';
initComment({
     el: '#app',
     urlConfig: {
         host:'www.example.com',
         get:'/api/comment/get',
         insert:'/api/comment/insert',
         reply: '/api/reply/insert'
     },
    
     dataHandler: {
         get: (data) => {return data},
         insert: (data) => {return data},
         reply: (data) => {return data},
     }
});
````
