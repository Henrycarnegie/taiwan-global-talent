import { Link, router } from '@inertiajs/react';
import {
    PlayIcon,
    PlusCircleIcon,
    ChevronLeft,
    CheckCircle2,
    Lock,
    Award,
    User2,
} from 'lucide-react';
import { route } from 'ziggy-js';
import Layout from '../../Layout';

interface Module {
    id: number;
    title: string;
    level: string;
    progress: number;
    status: 'Locked' | 'In Progress' | 'Completed';
}

interface Props {
    category: {
        id: number;
        name: string;
        slug: string;
        description?: string | null;
        instructor?: string | null;
        duration?: string | null;
        price: number | string;
        thumbnail_url?: string | null;
        updated_at?: string | null;
    };
    modules: Module[];
}

export default function CourseDetail({ category, modules }: Props) {
    console.log(modules);

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Navigation */}
                <Link
                    href={route('student.courses.index')}
                    className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
                >
                    <ChevronLeft
                        size={16}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    Back to Library
                </Link>

                {/* Immersive Hero Section */}
                <div className="relative mb-12 overflow-hidden rounded-3xl bg-slate-950 shadow-xl">
                    {/* Background Thumbnail with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-transparent" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 grid grid-cols-1 gap-8 p-8 md:p-12 lg:grid-cols-3 lg:items-center">
                        <div className="lg:col-span-2">
                            <h1 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {category.name}
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                                {category.description}
                            </p>
                            <p className="flex items-center gap-2 max-w-2xl text-xs font-light text-slate-300">
                                <User2 size={14} className="text-amber-400" /> Instructor by{' '}
                                <span className="text-amber-300 underline">
                                    {category.instructor || 'General'}
                                </span>
                            </p>
                            <p className="max-w-2xl text-xs font-light text-slate-300">
                                Last Updated:{' '}
                                <span className="text-amber-300 underline">
                                    {category.updated_at}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Curriculum Section */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Curriculum Path
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Selesaikan seluruh modul kursus secara
                                    berurutan.
                                </p>
                            </div>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                {modules.length} Modul
                            </span>
                        </div>

                        <div className="space-y-4">
                            {modules.map((module, index) => {
                                const isCompleted =
                                    module.status === 'Completed';
                                const isLocked = module.status === 'Locked';

                                return (
                                    <div
                                        key={module.id}
                                        className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 md:flex-row md:items-center ${
                                            isLocked
                                                ? 'border-slate-100 opacity-80'
                                                : 'border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold ${
                                                    isCompleted
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : module.status ===
                                                            'In Progress'
                                                          ? 'bg-blue-50 text-blue-600'
                                                          : 'bg-slate-100 text-slate-400'
                                                }`}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle2 size={22} />
                                                ) : isLocked ? (
                                                    <Lock size={20} />
                                                ) : (
                                                    <span>0{index + 1}</span>
                                                )}
                                            </div>

                                            <div>
                                                <span className="mb-1 inline-block rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                                                    {module.level}
                                                </span>

                                                <h3 className="text-base font-bold text-slate-900 transition group-hover:text-blue-600">
                                                    {module.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between gap-6 md:mt-0">
                                            {!isLocked && (
                                                <div className="w-28">
                                                    <div className="mb-1 flex justify-between text-[10px] font-semibold text-slate-500">
                                                        <span>Progress</span>
                                                        <span>
                                                            {module.progress}%
                                                        </span>
                                                    </div>

                                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                        <div
                                                            className={`h-full transition-all duration-500 ${
                                                                isCompleted
                                                                    ? 'bg-emerald-500'
                                                                    : 'bg-blue-600'
                                                            }`}
                                                            style={{
                                                                width: `${module.progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {isLocked ? (
                                                <button
                                                    onClick={() =>
                                                        router.post(
                                                            route(
                                                                'student.courses.enroll',
                                                                module.id,
                                                            ),
                                                        )
                                                    }
                                                    className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                                                >
                                                    <PlusCircleIcon size={14} />
                                                    Daftar Modul
                                                </button>
                                            ) : (
                                                <Link
                                                    href={route(
                                                        'student.courses.show',
                                                        [
                                                            category.slug,
                                                            module.id,
                                                        ],
                                                    )}
                                                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                                                        isCompleted
                                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <Award size={14} />
                                                    ) : (
                                                        <PlayIcon size={14} />
                                                    )}

                                                    {isCompleted
                                                        ? 'Review'
                                                        : 'Mulai Belajar'}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                            {category.thumbnail_url && (
                                <img
                                    src={category.thumbnail_url}
                                    alt={category.name}
                                    className="h-56 w-full object-cover"
                                />
                            )}

                            <div className="space-y-6 p-6">
                                <div>
                                    <p className="mb-2 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                                        Course Information
                                    </p>

                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {category.name}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="space-y-4 border-t border-slate-100 pt-5">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Instructor
                                        </span>

                                        <span className="font-semibold text-slate-900">
                                            {category.instructor}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Duration
                                        </span>

                                        <span className="font-semibold text-slate-900">
                                            {category.duration}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Modules
                                        </span>

                                        <span className="font-semibold text-slate-900">
                                            {modules.length}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Updated
                                        </span>

                                        <span className="font-semibold text-slate-900">
                                            {category.updated_at}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-5">
                                    <p className="text-sm text-slate-500">
                                        Course Price
                                    </p>

                                    <h4 className="mt-1 text-3xl font-black text-slate-900">
                                        Rp{' '}
                                        {Number(category.price).toLocaleString(
                                            'id-ID',
                                        )}
                                    </h4>
                                </div>

                                <button className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                                    Enroll Course
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
