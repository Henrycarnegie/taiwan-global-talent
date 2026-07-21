import { Link, router } from '@inertiajs/react';
import { PlayIcon, PlusCircleIcon, BookOpen, Clock, Users } from 'lucide-react';
import Layout from '../Layout';

interface Category {
    name: string;
    description?: string | null;
    instructor?: string | null;
    duration?: string | null;
}

interface Course {
    id: number;
    title: string;
    level: string;
    progress: number;
    status: 'Locked' | 'In Progress' | 'Completed';
}

interface Props {
    category: Category;
    courses: Course[];
}

export default function CourseDetail({ category, courses }: Props) {
    return (
        <Layout>
            {/* HERO SECTION (Ala Udemy) */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-8">
                <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
                    <p className="text-slate-300 mb-6 text-lg">{category.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Users size={18} /> {category.instructor || 'Expert Instructor'}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} /> {category.duration || 'Flexible duration'}
                        </div>
                    </div>
                </div>
            </div>

            {/* COURSE LIST SECTION */}
            <div className="max-w-5xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course in this Category</h2>
                
                <div className="space-y-4">
                    {courses.map((course) => (
                        <div 
                            key={course.id} 
                            className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-400 transition-all shadow-sm"
                        >
                            {/* Info Kursus */}
                            <div className="flex items-start gap-4 flex-1">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{course.title}</h3>
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">
                                        {course.level}
                                    </span>
                                </div>
                            </div>

                            {/* Progres & Aksi */}
                            <div className="flex items-center gap-6 mt-4 md:mt-0">
                                {course.status !== 'Locked' && (
                                    <div className="w-32">
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-600" 
                                                style={{ width: `${course.progress}%` }} 
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-400">{course.progress}% Complete</span>
                                    </div>
                                )}

                                <div>
                                    {course.status === 'Locked' ? (
                                        <button 
                                            onClick={() => router.post(`/student/courses/${course.id}/enroll`)}
                                            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition"
                                        >
                                            <PlusCircleIcon size={16} /> Enroll
                                        </button>
                                    ) : (
                                        <Link 
                                            href={`/student/courses/${course.id}`} // Sesuaikan route slug-mu
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition"
                                        >
                                            <PlayIcon size={16} /> {course.status === 'Completed' ? 'Review' : 'Resume'}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}