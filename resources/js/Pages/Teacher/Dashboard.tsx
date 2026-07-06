// TeacherDashboard.tsx
import { Users, BookOpen, Clock, BarChart3, Bell } from 'lucide-react'; // Icons from lucide-react.
import MetricCard from '@/components/UI/MetricCard';

// Simple simulated doughnut chart using SVG.
const SimpleDoughnut = () => (
    <svg viewBox="0 0 36 36" className="h-full w-full text-blue-500">
        <path
            className="text-gray-200"
            fill="none"
            strokeWidth="3"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
            fill="none"
            strokeWidth="3"
            strokeDasharray="75, 100"
            strokeLinecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
    </svg>
);

export default function TeacherDashboard() {
    const students = [
        {
            name: 'Bima',
            class: 'Class 10A',
            status: 'Submitted',
            grade: 85,
            avatar: '👨‍🎓',
        },
        {
            name: 'Sari',
            class: 'Class 9C',
            status: 'Not Submitted',
            grade: 92,
            avatar: '👩‍🎓',
        },
        {
            name: 'Reno',
            class: 'Class 9C',
            status: 'Not Submitted',
            grade: 92,
            avatar: '👨‍🎓',
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left sidebar. */}
            <aside className="flex w-64 flex-col border-r border-gray-100 bg-white p-6">
                <div className="mb-10 flex items-center gap-3">
                    <img
                        src="/avatar-placeholder.png"
                        alt="Teacher Avatar"
                        className="h-12 w-12 rounded-full border-2 border-blue-100"
                    />
                    <div>
                        <p className="font-bold text-gray-900">Teacher Name</p>
                        <p className="text-sm text-gray-500">Teacher</p>
                    </div>
                </div>
                <nav className="space-y-4">
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-xl bg-blue-50 p-3 font-medium text-blue-700"
                    >
                        <BarChart3 className="h-5 w-5" /> Dashboard
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-xl p-3 text-gray-600 hover:bg-gray-100"
                    >
                        <BookOpen className="h-5 w-5" /> Classes
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-xl p-3 text-gray-600 hover:bg-gray-100"
                    >
                        <Users className="h-5 w-5" /> Students
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-xl p-3 text-gray-600 hover:bg-gray-100"
                    >
                        <Clock className="h-5 w-5" /> Tugas
                    </a>
                </nav>
            </aside>

            {/* Main content. */}
            <main className="flex-1 p-8">
                <header className="mb-10 flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold text-gray-950">
                        Teacher Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <Bell className="h-6 w-6 text-gray-500" />
                        <p className="text-sm text-gray-500">00:08</p>
                    </div>
                </header>

                {/* Primary metrics. */}
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <MetricCard
                        title="Total Students"
                        value="120"
                        graph={<SimpleDoughnut />}
                        className="border-blue-100 bg-blue-50/50"
                    />
                    <MetricCard
                        title="Total Classes"
                        value="5"
                        icon={<BookOpen className="h-8 w-8" />}
                        className="border-green-100 bg-green-50/50"
                    />
                    <MetricCard
                        title="Tugas Pending"
                        value="12"
                        icon={<Clock className="h-8 w-8 text-orange-600" />}
                        className="border-orange-100 bg-orange-50/50"
                    />
                </div>

                {/* Student list and status. */}
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                    <h2 className="mb-6 text-2xl font-bold text-gray-950">
                        Student Data
                    </h2>
                    <div className="space-y-4">
                        {students.map((student, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-5 hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">
                                        {student.avatar}
                                    </span>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {student.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {student.class}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold ${student.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                >
                                    {student.status}
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {student.grade}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
