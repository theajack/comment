## tc-comment

一个支持markdowm和emoji评论组件

```js
import initComment from 'tc-comment';
initComment({
    el: '#app',
    services: { // 请自行注入两个请求 一个插入评论 一个获取评论
        insertComment(){

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

interface GetComment {
    (query: {
        index?: number;
        size?: number;
        all?: number;
        condition?: object;
    }): Promise<boolean>;
}
```

