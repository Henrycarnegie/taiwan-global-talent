import { CheckCircleIcon, LockKeyholeIcon, PlayIcon } from 'lucide-react';
import Card from '@/components/UI/Card';

export default function MandarinCourse() {
    const courses = [
        {
            id: 1,
            title: 'Business Mandarin For Beginners',
            chineseTitle: '基礎商務華語',
            level: 'TOCFL A1-A2',
            modules: '12 Modules',
            progress: 100,
            status: 'Completed',
        },
        {
            id: 2,
            title: 'Workplace Communication & Interview',
            chineseTitle: '職場溝通 & 面試華語',
            level: 'TOCFL B1',
            modules: '15 Modules',
            progress: 40,
            status: 'In Progress',
        },
        {
            id: 3,
            title: 'Advanced Technical & Engineering Terms',
            chineseTitle: '高階科技與工程專業術語',
            level: 'TOCFL B2',
            modules: '10 Modules',
            progress: 0,
            status: 'Locked',
        },
    ];

    return (
        <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6">
            {/* Header / Hero Section */}
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-gray-100 bg-linear-to-br from-white to-gray-50/50 p-6 shadow-sm md:flex-row md:items-center md:p-8">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Mandarin Learning Center
                        </h2>
                        <span className="text-lg font-medium text-gray-400">
                            華語中心
                        </span>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-gray-500">
                        Enhance your professional Mandarin proficiency to
                        accelerate your career growth and unlock corporate
                        opportunities in Taiwan.
                    </p>
                </div>
                <button className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] sm:w-auto">
                    Take TOCFL Mock Test
                </button>
            </div>

            {/* Performance Overview (Reusable Cards) */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Current Proficiency"
                    subTitle="Assessed level"
                    value="TOCFL A2"
                    footerText="Next Milestone: B1 Mid"
                />
                <Card
                    title="Learning Hours"
                    subTitle="Total time invested"
                    value="48 Hours"
                    footerText="2.5 hours logged this week"
                />
                <Card
                    title="Vocabulary Mastered"
                    subTitle="Total words learned"
                    value="450 Words"
                    badge="Level Up!"
                    badgeColor="bg-emerald-50 text-emerald-700 border border-emerald-200"
                />
            </div>

            {/* Course Curriculum Section */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5">
                    <h3 className="font-bold tracking-tight text-gray-900">
                        Your Curriculum & Available Courses
                    </h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col justify-between gap-6 p-6 transition-all duration-200 hover:bg-gray-50/70 md:flex-row md:items-center"
                        >
                            {/* Course Info */}
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className={`rounded-md px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase ${
                                            course.status === 'Completed'
                                                ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                                                : course.status ===
                                                    'In Progress'
                                                  ? 'border border-blue-100 bg-blue-50 text-blue-700'
                                                  : 'border border-gray-200 bg-gray-50 text-gray-400'
                                        }`}
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-xs font-medium text-gray-400">
                                        • {course.modules}
                                    </span>
                                </div>
                                <h4 className="text-base leading-tight font-bold text-gray-900">
                                    {course.title}
                                </h4>
                                <p className="text-sm font-medium tracking-wide text-gray-400">
                                    {course.chineseTitle}
                                </p>
                            </div>

                            {/* Progress Bar Group */}
                            <div className="flex w-full flex-col gap-1.5 md:w-64">
                                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                                    <span>Progress</span>
                                    <span className="font-bold text-gray-700">
                                        {course.progress}%
                                    </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                            course.status === 'Completed'
                                                ? 'bg-emerald-500'
                                                : 'bg-blue-600'
                                        }`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2 md:pt-0">
                                <button
                                    disabled={course.status === 'Locked'}
                                    className={`min-w-44 max-w-full flex items-center justify-center rounded-xl border px-5 py-2.5 text-xs font-bold tracking-wide transition-all active:scale-[0.98] md:w-auto ${
                                        course.status === 'Completed'
                                            ? 'border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50'
                                            : course.status === 'In Progress'
                                              ? 'border-transparent bg-blue-50 text-blue-600 hover:bg-blue-100'
                                              : 'cursor-not-allowed border-transparent bg-gray-50 text-gray-500'
                                    }`}
                                >
                                    {course.status === 'Completed' ? (
                                        <CheckCircleIcon size={16} className="mr-2" />
                                    ) : course.status === 'In Progress' ? (
                                        <PlayIcon size={16} className="mr-2" />
                                    ) : (
                                        <LockKeyholeIcon size={16} className="mr-2" />
                                    )}
                                    {course.status === 'Completed'
                                        ? 'Review Modules'
                                        : course.status === 'In Progress'
                                          ? 'Resume Learning'
                                          : 'Locked'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
