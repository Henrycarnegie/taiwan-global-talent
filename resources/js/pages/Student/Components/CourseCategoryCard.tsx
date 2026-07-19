import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { route } from "ziggy-js";

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
        thumbnail_url?: string | null;
    }
}

export default function CourseCategoryCard({ category }: CategoryProps) {
    const IconComponent = (Icons as any)[category.icon || 'BookOpen'] || Icons.BookOpen;

    return (
        <Link
            href={route('student.courses.showCategory', category.slug)}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
            {/* 1. Hero Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {category.thumbnail_url ? (
                    <img
                        src={category.thumbnail_url}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-400">
                        <IconComponent size={64} strokeWidth={1} />
                    </div>
                )}
                {/* Badge Harga */}
                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm backdrop-blur-sm">
                    {category.price > 0 ? `TWD${category.price.toLocaleString()}` : 'Free'}
                </div>
            </div>

            {/* 2. Konten Card */}
            <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {category.name}
                </h3>
                <p className="mb-6 line-clamp-2 grow text-sm text-gray-500">
                    {category.description}
                </p>

                {/* 3. Footer Metada */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <Icons.User size={14} /> {category.instructor || 'Public'}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Icons.Clock size={14} /> {category.duration || 'Flexible'}
                    </div>
                </div>
            </div>
        </Link>
    );
}