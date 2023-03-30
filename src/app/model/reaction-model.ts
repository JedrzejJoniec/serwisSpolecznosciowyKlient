import { User } from "./user-model";

export interface Reaction {
    id: number;
    user: User;
    postId: number;
    userImage: any;
    date: any;
  }