type CommentType = {
    id: number;
    text: string;
}

export interface Post {
    id: number,
    text: string,
    image: string,
    likesCount: number,
    commentsCount: number,
    comments: Array<CommentType> | []
}

export interface Posts extends Array<Post> { }

export type PostsState = {
    posts: Posts;
    serviceUrl: string
}
