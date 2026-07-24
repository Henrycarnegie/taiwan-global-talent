import { Head } from "@inertiajs/react";
import TeacherMetrics from "@/components/Teacher/TeacherMetrics";
import TeacherNavbar from "@/components/Teacher/TeacherNavbar";
import type { Course, Teacher, TeacherStats } from "@/types/teacher/type";
import CourseGrid from "@/components/Teacher/CourseGrid";

interface PageProps {
    teacher: Teacher;
    stats: TeacherStats;
    modules?: Course[];
    courses?: Course[];
}

export default function Index({ teacher, stats, modules, courses }: PageProps) {

    const courseList = modules ?? courses ?? [];

    return (
        <>
            <Head title="Teacher Dashboard" />
            <div className="min-h-screen bg-gray-50/50">
                <TeacherNavbar teacher={teacher} />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    <TeacherMetrics stats={stats} />
                    <CourseGrid courses={courseList} />
                </main>
            </div>
        </>
    );
}