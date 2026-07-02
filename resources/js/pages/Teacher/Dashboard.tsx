import { Link } from '@inertiajs/react';
import {
    Users,
    BookOpen,
    Clock,
    BarChart3,
    Bell,
    ChevronRight,
    Search,
    LogOut,
} from 'lucide-react';

interface TeacherProfile {
    id: number;
    full_name: string;
    expertise: string;
    status: string;
}

interface UserProps {
    id: number;
    name: string;
    email: string;
    avatar: string;
    teacher_profile?: TeacherProfile;
}

interface DashboardProps {
    auth: UserProps;
    stats: {
        courses: number;
        certificates: number;
        progress: number;
    };
}

const SimpleDoughnut = ({ percentage }: { percentage: number }) => (
    <svg viewBox="0 0 36 36" className="h-12 w-12 text-teal-600">
        <circle
            className="text-gray-100"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2.5"
        />
        <circle
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            cx="18"
            cy="18"
            r="16"
            transform="rotate(-90 18 18)"
        />
    </svg>
);

export default function TeacherDashboard({ auth, stats }: DashboardProps) {
    const teacherName =
        auth?.teacher_profile?.full_name || auth?.name || '教師姓名';
    // const expertise = auth?.teacher_profile?.expertise || "未分類專長";
    const avatarUrl = auth?.avatar || '/avatar-placeholder.png';

    const students = [
        {
            name: 'Bima',
            class: 'Kelas 10A',
            status: 'Sudah Kumpul',
            grade: 85,
            id: 'STU-0102',
        },
        {
            name: 'Sari',
            class: 'Kelas 9C',
            status: 'Belum Kumpul',
            grade: 92,
            id: 'STU-0084',
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#f4f7f6] font-sans text-slate-800 antialiased">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col border-r border-slate-800 bg-[#0f1e2d] text-slate-300 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-800 p-6">
                    <img
                        src={avatarUrl}
                        alt={teacherName}
                        className="h-10 w-10 rounded-full border border-slate-700 object-cover"
                    />
                    <div className="overflow-hidden">
                        <p
                            className="mb-1 truncate leading-none font-bold text-white"
                            title={teacherName}
                        >
                            {teacherName}
                        </p>
                        {/* <p className="text-[11px] text-slate-400 font-mono truncate">{expertise}</p> */}
                    </div>
                </div>

                <nav className="flex-1 space-y-1 p-4">
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded bg-teal-600 px-4 py-3 font-medium text-white transition-colors"
                    >
                        <BarChart3 className="h-4 w-4" /> 主頁控制台{' '}
                        <span className="ml-auto rounded bg-teal-800 px-1.5 py-0.5 text-[10px] text-teal-200">
                            Home
                        </span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
                    >
                        <BookOpen className="h-4 w-4" /> 班級管理{' '}
                        <span className="ml-auto text-[10px] text-slate-500">
                            Classes
                        </span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
                    >
                        <Users className="h-4 w-4" /> 學生名冊{' '}
                        <span className="ml-auto text-[10px] text-slate-500">
                            Students
                        </span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
                    >
                        <Clock className="h-4 w-4" /> 作業與評分{' '}
                        <span className="ml-auto text-[10px] text-slate-500">
                            Tasks
                        </span>
                    </a>
                </nav>

                <div className="border-t border-slate-800 p-4">
                    <Link href="/logout" method="post">
                        <button className="flex w-full items-center justify-center gap-2 rounded bg-slate-800 py-2 text-xs text-slate-400 transition-colors hover:bg-rose-950/30 hover:text-rose-400">
                            <LogOut className="h-3.5 w-3.5" /> 登出系統 Sign Out
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            教師後台管理主頁
                        </h1>
                        <p className="mt-1 text-xs text-slate-500">
                            系統連線帳號：
                            <span className="font-mono text-slate-700">
                                {auth?.email || 'guest@system'}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="搜尋學生、班級..."
                                className="w-48 rounded border border-slate-200 bg-white py-1.5 pr-4 pl-9 text-xs focus:border-teal-500 focus:outline-none"
                            />
                        </div>
                        <button className="relative rounded border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500"></span>
                        </button>
                    </div>
                </header>

                {/* Statistik yang dihubungkan langsung dari Controller */}
                <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* Card Progress - Menggunakan stats.progress */}
                    <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-5 shadow-sm">
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                整體進度分數
                            </p>
                            <p className="text-3xl font-bold text-slate-900">
                                {stats?.progress || 0}{' '}
                                <span className="text-xs font-normal text-slate-500">
                                    %
                                </span>
                            </p>
                        </div>
                        <SimpleDoughnut percentage={stats?.progress || 0} />
                    </div>

                    {/* Card Courses - Menggunakan stats.courses */}
                    <div className="flex items-center justify-between rounded border border-l-4 border-slate-200 border-l-teal-500 bg-white p-5 shadow-sm">
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                課程總數
                            </p>
                            <p className="text-3xl font-bold text-slate-900">
                                {stats?.courses || 0}{' '}
                                <span className="text-xs font-normal text-slate-500">
                                    個項目
                                </span>
                            </p>
                        </div>
                        <div className="rounded bg-teal-50 p-3 text-teal-600">
                            <BookOpen className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Card Certificates - Menggunakan stats.certificates */}
                    <div className="flex items-center justify-between rounded border border-l-4 border-slate-200 border-l-orange-500 bg-white p-5 shadow-sm">
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                認證證書
                            </p>
                            <p className="text-3xl font-bold text-[#e65100]">
                                {stats?.certificates || 0}{' '}
                                <span className="text-xs font-normal text-slate-500">
                                    張張數
                                </span>
                            </p>
                        </div>
                        <div className="rounded bg-orange-50 p-3 text-orange-600">
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Tabel Data Siswa */}
                <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                    <div className="border-slate-150 flex items-center justify-between border-b bg-slate-50/70 p-5">
                        <h2 className="text-sm font-bold tracking-tight text-slate-900">
                            近期作業交件狀態表
                        </h2>
                        <button className="flex items-center gap-0.5 text-xs font-medium text-teal-600 hover:text-teal-700">
                            查看完整名冊 <ChevronRight className="h-3 w-3" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-xs">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-100 font-semibold text-slate-500">
                                    <th className="w-24 p-4">學生學號</th>
                                    <th className="p-4">姓名 / 班級</th>
                                    <th className="w-36 p-4 text-center">
                                        繳交狀態
                                    </th>
                                    <th className="w-24 p-4 text-right">
                                        當前評分
                                    </th>
                                    <th className="w-20 p-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student, index) => (
                                    <tr
                                        key={index}
                                        className="transition-colors hover:bg-slate-50/80"
                                    >
                                        <td className="p-4 font-mono text-slate-400">
                                            {student.id}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900">
                                                {student.name}
                                            </div>
                                            <div className="mt-0.5 text-[11px] text-slate-400">
                                                {student.class}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span
                                                className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${
                                                    student.status ===
                                                    'Sudah Kumpul'
                                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                        : 'border-rose-200 bg-rose-50 text-rose-700'
                                                }`}
                                            >
                                                <span
                                                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${student.status === 'Sudah Kumpul' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                ></span>
                                                {student.status ===
                                                'Sudah Kumpul'
                                                    ? '已繳交'
                                                    : '未繳交'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right text-sm font-bold text-slate-900">
                                            {student.grade}{' '}
                                            <span className="text-[10px] font-normal text-slate-400">
                                                分
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-[11px] text-slate-400 underline hover:text-slate-600">
                                                詳細
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
