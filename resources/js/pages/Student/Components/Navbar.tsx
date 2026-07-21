import { Link } from '@inertiajs/react';

interface CourseCategory {
    id: number;
    name: string;
    slug: string;
}

interface NavbarProps {
    currentUrl: string;
    categories: CourseCategory[];
}

export default function Navbar({ currentUrl }: NavbarProps) {
    const getNavClass = (path: string) => {
        const active = currentUrl.startsWith(path);
        
        return `rounded-xl px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
            active
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`;
    };

    return (
        <div className="flex w-full justify-start md:w-auto md:justify-center">
            <nav className="flex items-center gap-2">
                {/* Link Dashboard / Overview */}
                <Link
                    href="/student/dashboard"
                    className={getNavClass('/student/dashboard')}
                >
                    Overview{' '}
                    <span className="ml-1 text-[10px] font-normal opacity-80">
                        概覽
                    </span>
                </Link>
                <Link
                    href="/student/courses"
                    className={getNavClass('/student/courses')}
                >
                    Courses{' '}
                    <span className="ml-1 text-[10px] font-normal opacity-80">
                        證書
                    </span>
                </Link>
                {/* Link Halaman Komunitas (LinkedIn Feed) */}
                <Link
                    href="/student/community"
                    className={getNavClass('/student/community')}
                >
                    Community{' '}
                    <span className="ml-1 text-[10px] font-normal opacity-80">
                        社群
                    </span>
                </Link>
            </nav>
        </div>
    );
}
