## tc-comment

A comment component that supports markdowm and emoji

And you can use this with [vuepress-plugin-tc-comment](https://github.com/theajack/vuepress-plugin-tc-comment)

### 1. Use custom services

```js
import initComment from'tc-comment';
initComment({
    el:'#app',
    services: {// Please inject two requests by yourself, one to insert comments and one to get comments
        insertComment(){

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
        get:'api/comment/get',
        insert:'api/comment/insert'
    }
});
```

If you use the urlConfig parameter, tc-comment will call the two interfaces under the domain name, please deploy by yourself

get request is used to pull comments

-path: urlConfig.get default value is'api/comment/get'
-method: get
-Parameters: index, size, all, condition
-Return: {data: {code: 0, data: [CommentObject]}} 0 means success
-responseType: json

CommentObject


insert request for uploading comments

-path: urlConfig.insert default value is'api/comment/insert'
-method: post
-Parameters: name, contact, content
-Return: {data: {code: 0}} 0 means success
-responseType: json
