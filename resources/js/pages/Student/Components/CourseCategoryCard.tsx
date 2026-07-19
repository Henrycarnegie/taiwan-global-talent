import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';

interface CategoryProps {
    category: {
        id: number;
        name: string;
        slug: string;
        description?: string | null;
        icon?: string | null;
        instructor?: string | null;
        duration?: string | null;
        price: number;
    }
}

export default function CourseCategoryCard({ category }: CategoryProps) {
    // Mengambil ikon secara dinamis dari Lucide
    const IconComponent =
        (Icons as any)[category.icon || 'BookOpen'] || Icons.BookOpen;

    return (
        <Link
            href={`/student/courses/${category.slug}`}
            className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl"
        >
            {/* Header Card */}
            <div className="mb-4 flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <IconComponent size={24} />
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                    {category.price > 0
                        ? `Rp${category.price.toLocaleString()}`
                        : 'Gratis'}
                </span>
            </div>

            {/* Konten */}
            <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                {category.name}
            </h3>
            <p className="mb-6 line-clamp-2 grow text-sm text-gray-500">
                {category.description}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t pt-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <Icons.User size={14} /> {category.instructor || 'Umum'}
                </div>
                <div className="flex items-center gap-1">
                    <Icons.Clock size={14} /> {category.duration || 'Flexible'}
                </div>
            </div>
        </Link>
    );
}
