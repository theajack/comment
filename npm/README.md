## [tc-comment](https://github.com/theajack/tc-comment)

**[中文](https://github.com/theajack/comment/blob/master/README.cn.md) | [Use Case](https://theajack.github.io/message-board/?app=tc-comment)**

A comment component that supports markdowm and emoji, without any configuration, no need to apply for any account, it can be used immediately

## Features

1. One line of code introduction without any configuration
2. No need to apply for any account, just use it
3. Support markdowm and emoji comment components
4. Support real-time preview
5. Support insert link of code message
6. Support dark mode, adapt to the original dark mode of the website
7. Support custom services and url
8. Support for inserting pictures

### 1. Quick use

```js
import {initComment} from 'tc-comment';
initComment({
    appName: 'xxx', // create your own app name
});
```

cdn use

```html
<script src="https://cdn.jsdelivr.net/npm/tc-comment/tc-comment.min.js"></script>
<script>
    TComment.initComment({
        appName: 'xxx', // create your own app name
    });
</script>
```

### 2. Vue component introduction

```js
// ...
import {Comment} from 'tc-comment';

Comment.init({appName: 'xxx'}); // Create your own app name

export default {
    components: {Comment},
    // ...
}
```

### 3. Configuration parameters

```ts
initComment({
    appName: string;
    el?: HTMLElement | string; // Comment.init passed this parameter is invalid
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
// Comment.init parameters are consistent with the above parameters
```

1. appName: An application name is required, a combination of numbers and letters is recommended, and it supports the use of / to divide directories such as appName = blog/2022/hello
2. The container rendered by el will append an element to the body by default
3. theme color
4. darkSelector Fill in a dark theme color selector, generally used to adapt to the dark theme of the main website
5. Services, urlConfig, dataHandler will be introduced in detail later

### 4. Custom services

tc-comment supports custom methods to implement your own request methods

```js
import {initComment} from 'tc-comment';
initComment({
    el: '#app',
    services: { // Please inject three requests by yourself, insert comment, insert reply and get comment
        insertComment(){

        },
        getComment(){

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
        all?: boolean;
        condition?: object;
    }): Promise<Array<{
        createTime: number;
        name: string;
        content: string;
    }>>;
}
```

### 5. Custom interface urlConfig

tc-comment supports custom interface by configuring urlConfig

The urlConfig parameter has lower precedence than the services parameter

```js
import {initComment} from 'tc-comment';
initComment({
    el: '#app',
    urlConfig: {
        host:'www.example.com',
        get:'/api/comment/get',
        insert:'/api/comment/insert',
        reply: '/api/reply/insert'
    },
});
```

If you use the urlConfig parameter, tc-comment will call the three interfaces under the domain name, please deploy it yourself

1. get request for pulling comments

- path: urlConfig.get
- method: get
- Parameters: index, size, all, condition, app
- Return: {data: {code: 0, data: [CommentObject]}} 0 means success
- responseType: json

CommentObject

```ts
{
    id: number;
    name: string;
    contact: string;
    content: string;
    createTime: number; // timestamp
    reply: Array<{
        name: string;
        contact: string;
        content: string;
        createTime: number; // timestamp
    }>;
}
```

1. insert request for uploading comments

- path: urlConfig.insert
- method: post
- Parameters: name, contact, content, app
- Return: {data: {code: 0}} 0 means success
- responseType: json

3. The reply request is used to upload the reply

- path: urlConfig.insert
- method: post
- Parameters: name, contact, content, commentId, app
- Return: {data: {code: 0}} 0 means success
- responseType: json

### 6. dataHandler

When using a custom urlConfig, you can modify the request data with dataHandle

Use as follows

```js
import {initComment} from 'tc-comment';
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
```