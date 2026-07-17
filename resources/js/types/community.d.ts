export interface CommunityUser {
    id: number;
    name: string;
    avatar_url: string | null;
    university?: string; // e.g., "NTUST" atau "NTU"
    role: 'student' | 'teacher' | 'admin';
}

export interface CommunityComment {
    id: number;
    community_post_id: number;
    user: CommunityUser;
    parent_id: number | null;
    content: string;
    created_at: string;
    replies?: CommunityComment[];
}

export interface CommunityPost {
    id: number;
    user: CommunityUser;
    tag: string; // Kategori postingan
    content: string;
    media_url: string | null;
    media_type: 'image' | 'video' | null;
    is_pinned: boolean;
    likes_count: number;
    comments_count: number;
    is_liked_by_me: boolean;
    comments: CommunityComment[];
    created_at: string;
}