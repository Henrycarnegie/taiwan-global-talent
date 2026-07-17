import { Link } from '@inertiajs/react';
import { PlayIcon, FileDownIcon } from 'lucide-react';
import { useState } from 'react';
import DownloadProgressBar from '@/components/UI/DownloadProgressBar';
import Layout from '../../Layout';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    courses: any[];
    stats: any;
    currentCategory: Category | null; // Kita izinkan bernilai null agar aman
    allCategories: Category[];
}

export default function Index({
    courses = [],
    stats,
    currentCategory,
    allCategories,
}: Props) {
    console.log(stats);
    console.log(allCategories);

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [activeCourseTitle, setActiveCourseTitle] = useState<string>('');

    const handleDownloadCertificate = async (courseId: number, courseTitle: string) => {
        if (isPopupOpen) {
            return;
        }

        setActiveCourseTitle(courseTitle);
        setIsPopupOpen(true);

        try {
            const response = await fetch(`/student/courses/${courseId}/certificate`);

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to process certificate.');
                setIsPopupOpen(false);

                return;
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = `Sertifikat-${courseTitle}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            
            downloadLink.remove();
            window.URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.log(error);
            alert('Failed to download certificate. There was a network connection error while downloading the certificate.');
        } finally {
            setIsPopupOpen(false);
        }
    };

    return (
        <Layout>
            <div className="space-y-8 relative">
                <DownloadProgressBar isOpen={isPopupOpen} courseTitle={activeCourseTitle} />

                {/* Daftar Kursus */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
                    <div className="divide-y divide-gray-100">
                        {courses.length === 0 ? (
                            <div className="p-8 text-center text-sm text-gray-400">
                                No courses available in this category.
                            </div>
                        ) : (
                            courses.map((course: any) => (
                                <div
                                    key={course.id}
                                    className="flex flex-col justify-between gap-6 p-6 transition-colors hover:bg-gray-50/40 md:flex-row md:items-center"
                                >
                                    <div className="flex-1 space-y-1">
                                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600 uppercase">
                                            {course.level}
                                        </span>
                                        <h4 className="text-base font-bold text-gray-900">
                                            {course.title}
                                        </h4>
                                        <div className="text-xs text-gray-500">
                                            Status: {course.status}
                                        </div>
                                    </div>

                                    <div className="w-full space-y-1 md:w-48">
                                        <div className="mb-1 flex justify-between text-xs font-medium text-gray-500">
                                            <span>Progress</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                                                style={{
                                                    width: `${course.progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {course.status === 'Completed' ? (
                                            <button
                                                onClick={() => handleDownloadCertificate(course.id, course.title)}
                                                disabled={isPopupOpen}
                                                className={`flex w-full items-center justify-center gap-2 rounded-xl border border-transparent px-5 py-2.5 text-xs font-bold text-white transition-all md:w-auto cursor-pointer ${
                                                    isPopupOpen 
                                                        ? 'bg-emerald-400 cursor-not-allowed opacity-70' 
                                                        : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                                                }`}
                                            >
                                                <FileDownIcon size={14} />{' '}
                                                Download Certificate
                                            </button>
                                        ) : (
                                            <Link
                                                href={`/student/courses/${currentCategory?.slug || 'all'}/${course.id}`}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95 md:w-auto"
                                            >
                                                <PlayIcon size={14} /> Resume
                                                Learning
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}