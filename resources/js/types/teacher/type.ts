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

export interface Lesson {
    id?: number;
    course_id?: number;
    title: string;
    slug?: string;
    content: string | null;
    video_url: string | null;
    sort_order: number;
    is_free_preview: boolean;
}

export interface Course {
    id: number;
    title: string;
    slug: string;
    category: 'mandarin' | 'others';
    description: string | null;
    price: number;
    status: 'draft' | 'published' | 'archived';
    thumbnail_url: string | null;
    lessons_count?: number;
    lessons?: Lesson[];
}