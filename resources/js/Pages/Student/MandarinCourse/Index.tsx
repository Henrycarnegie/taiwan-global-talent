import Card from '@/components/UI/Card';

export default function MandarinCourse() {
    const courses = [
        {
            id: 1,
            title: 'Business Mandarin For Beginners',
            chineseTitle: '基礎商務華語',
            level: 'TOCFL A1-A2',
            modules: '12 Modul',
            progress: 100,
            status: 'Completed',
        },
        {
            id: 2,
            title: 'Workplace Communication & Interview',
            chineseTitle: '職場溝通 & 面試華語',
            level: 'TOCFL B1',
            modules: '15 Modul',
            progress: 40,
            status: 'In Progress',
        },
        {
            id: 3,
            title: 'Advanced Technical & Engineering Terms',
            chineseTitle: '高階科技與工程專業術語',
            level: 'TOCFL B2',
            modules: '10 Modul',
            progress: 0,
            status: 'Locked',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Mandarin Learning Center 華語中心
                    </h2>
                    <p className="text-sm text-gray-500">
                        Improve your Mandarin skills to advance your
                        professional career in Taiwan.
                    </p>
                </div>
                <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
                    Ambil Mock Test TOCFL
                </button>
            </div>

            {/* Progress summary using reusable cards. */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card
                    title="Current Level"
                    subTitle=" current"
                    value="TOCFL A2"
                    footerText="Target berikutnya: B1 Mid"
                />
                <Card
                    title="Hours Practiced"
                    subTitle="Total study time"
                    value="48 Hours"
                    footerText="2.5 hours this week"
                />
                <Card
                    title="Vocabulary Mastered"
                    subTitle="Kosakata dikuasai"
                    value="450 Kata"
                    badge="Level Up!"
                    badgeColor="bg-green-100 text-green-800"
                />
            </div>

            {/* Course list. */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 p-5">
                    <h3 className="font-bold text-gray-900">
                        Available to You
                    </h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col justify-between gap-4 p-5 transition hover:bg-gray-50/50 md:flex-row md:items-center"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                                            course.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : course.status ===
                                                    'In Progress'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : 'bg-gray-100 text-gray-500'
                                        }`}
                                    >
                                        {course.level}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        • {course.modules}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-900">
                                    {course.title}
                                </h4>
                                <p className="text-xs font-medium text-gray-400">
                                    {course.chineseTitle}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex w-full items-center gap-4 md:w-64">
                                <div className="h-2 w-full rounded-full bg-gray-100">
                                    <div
                                        className={`h-2 rounded-full ${course.status === 'Completed' ? 'bg-green-500' : 'bg-blue-600'}`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <span className="w-8 text-right text-xs font-semibold text-gray-600">
                                    {course.progress}%
                                </span>
                            </div>

                            {/* Action Button */}
                            <div>
                                <button
                                    disabled={course.status === 'Locked'}
                                    className={`w-full rounded-lg border px-4 py-2 text-xs font-semibold transition md:w-auto ${
                                        course.status === 'Completed'
                                            ? 'border-green-200 bg-white text-green-600 hover:bg-green-50'
                                            : course.status === 'In Progress'
                                              ? 'border-transparent bg-blue-50 text-blue-600 hover:bg-blue-100'
                                              : 'cursor-not-allowed border-transparent bg-gray-50 text-gray-400'
                                    }`}
                                >
                                    {course.status === 'Completed'
                                        ? 'Review Modul'
                                        : course.status === 'In Progress'
                                          ? 'Lanjutkan'
                                          : 'Terkunci'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
