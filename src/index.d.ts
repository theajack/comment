import initComment from ".";

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

interface IInitComment {
    (options:{
        el?: HTMLElement | string;
        services?: {
            insertComment: InsertComment;
            getComment: GetComment;
        }
    }):void;
}

let initComment: IInitComment;

export default initComment;