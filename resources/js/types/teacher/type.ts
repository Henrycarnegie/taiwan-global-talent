export interface Teacher {
    id: number;
    name: string;
    email: string;
}

export interface TeacherStats {
    total_courses: number;
    published_courses: number;
    mandarin_courses: number;
    total_lessons: number;
}

export interface CategoryInfo {
    id: number;
    name: string;
    slug: string;
}

export interface Course {
    id: number;
    title: string;
    slug?: string;
    description?: string | null;
    category?: CategoryInfo | string;
    status: 'draft' | 'published';
    is_published?: boolean;
    thumbnail_url?: string | null;
    lessons_count?: number;
    created_at?: string;
}

export interface Lesson {
    id: number;
    module_id: number;
    title: string;
    video_url?: string | null;
    content?: string | null;
    sort_order: number;
    is_free_preview: boolean;
}