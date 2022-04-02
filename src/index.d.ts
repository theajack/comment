interface IComment {
    name: string;
    contact: string;
    content: string;
}

interface IReply extends IComment {
    commentId: number;
}

interface InsertComment {
    (data: IComment): Promise<boolean>;
}

interface InsertReply {
    (data: IReply): Promise<boolean>;
}

interface IGetOption {
    index?: number;
    size?: number;
    all?: boolean;
    condition?: object;
}

interface GetComment {
    (query: IGetOption): Promise<Array<{
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
        dataHandler?: {
            get?: (data: IGetOption) => any;
            insert?: (data: IComment) => any;
            reply?: (data: IReply) => any;
        }
    }):void;
}

let initComment: IInitComment;

export default initComment;