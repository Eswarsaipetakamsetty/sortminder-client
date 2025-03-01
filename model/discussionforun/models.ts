
export interface Reply {
    id: number;
    user: string;
    user_profile_photo: string;
    created_at:string;
    content: string;
    total_likes: number;
}

type Message = {
    id: number;
    user: string;
    content: string;
    created_at: string;
    total_likes: number;
    replies: Reply[];
}

type DiscussionResponse = {
    messages: Message[];
    total_pages: number;
    current_page: number;
};

export interface Post {
    id: number;
    user: string;
    user_profile_photo: string;
    created_at: string;
    content: string;
    total_likes:number;
    is_liked: boolean;
    replies: Reply[]
  }