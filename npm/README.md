## tc-comment

A comment component that supports markdowm and emoji

```js
import initComment from 'tc-comment';
initComment({
    el: '#app',
    services: { // Please inject two requests yourself, one to insert comments and one to get comments
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
        all?: number;
        condition?: object;
    }): Promise<boolean>;
}
```

