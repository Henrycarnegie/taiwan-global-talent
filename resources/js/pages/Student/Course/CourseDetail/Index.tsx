import { Link, router } from '@inertiajs/react';
import { PlayIcon, PlusCircleIcon, BookOpen, Clock, Users, ChevronLeft } from 'lucide-react';
import { route } from 'ziggy-js';
import Layout from '../../Layout';

interface Category {
    id: number;
    name: string;
    slug: string;
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
    stats: any;
}

export default function CourseDetail({ category, courses, stats }: Props) {
    console.log(category)
    console.log(stats)
    
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href={"/student/courses"} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
                    <ChevronLeft size={20} /> Back to All Tracks
                </Link>

                {/* Hero Section */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-10 shadow-xl">
                    <h1 className="text-4xl font-extrabold mb-4">{category.name}</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mb-8">{category.description}</p>
                    <div className="flex flex-wrap gap-6 text-sm text-slate-400 border-t border-slate-700 pt-6">
                        <div className="flex items-center gap-2"><Users size={20} /> {category.instructor || 'Expert Instructor'}</div>
                        <div className="flex items-center gap-2"><Clock size={20} /> {category.duration || 'Flexible'}</div>
                    </div>
                </div>

                {/* Course List Section */}
                <div className="max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                    
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <div key={course.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{course.title}</h3>
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{course.level}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mt-4 md:mt-0">
                                    {course.status !== 'Locked' && (
                                        <div className="w-32">
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600" style={{ width: `${course.progress}%` }} />
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1 block">{course.progress}% Completed</span>
                                        </div>
                                    )}

                                    {course.status === 'Locked' ? (
                                        <button 
                                            onClick={() => router.post(`/student/courses/${course.id}/enroll`)}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                                        >
                                            <PlusCircleIcon size={14} /> Enroll
                                        </button>
                                    ) : (
                                        <Link 
                                            href={route('student.courses.show', [category.slug, course.id])}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                                        >
                                            <PlayIcon size={14} /> {course.status === 'Completed' ? 'Review' : 'Resume'}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}