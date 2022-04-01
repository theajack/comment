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

interface IInitComment {
    (options:{
        el?: HTMLElement | string;
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
    }):void;
}

let initComment: IInitComment;

export default initComment;