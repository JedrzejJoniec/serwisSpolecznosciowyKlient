import { Reaction } from "./reaction-model";

export interface Comment {
    id: number;
    username: string;
    userId: number;
    comments: Comment[];
    reactions: Reaction[];
    hasImage: boolean;
    liked: boolean;
    body: string;
    image: any;
    userImage: any;
    showComments: boolean;
    showAddComment: boolean;
    loadedImage: any;
    date: any;
  }