import { useForm, usePage } from '@inertiajs/react';
import {
    User as UserIcon,
    FileText,
    ShieldAlert,
    Save,
    RotateCcw,
    CheckCircle2,
    Building,
    GraduationCap,
    Globe,
    Mail,
    UserCheck,
} from 'lucide-react';
import type { FormEvent } from 'react';

import InputText from '@/components/UI/InputText';
import CompanyFields from '../../components/Profile/CompanyFields';
import StudentFields from '../../components/Profile/StudentFields';
import TeacherFields from '../../components/Profile/TeacherFields';
import Layout from '../Student/Layout';

export default function ProfilePage() {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const userProfile = user?.profile ?? {};
    const role = user?.role_name || 'student';

    const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm({
        name: user?.name ?? '',
        country: userProfile.country ?? '',
        bio: userProfile.bio ?? '',

        // Student fields
        university: userProfile.university ?? '',
        major: userProfile.major ?? '',
        mandarin_level: userProfile.mandarin_level ?? '',
        toefl_score: userProfile.toefl_score ?? '',
        tocfl_score: userProfile.tocfl_score ?? '',
        skills: userProfile.skills ?? '',
        learning_goal: userProfile.learning_goal ?? '',

        // Teacher fields
        full_name: userProfile.full_name ?? '',
        phone: userProfile.phone ?? '',
        expertise: userProfile.expertise ?? '',

        // Company fields
        company_legal_name: userProfile.company_legal_name ?? '',
        company_display_name: userProfile.company_display_name ?? '',
        tax_id: userProfile.tax_id ?? '',
        website_url: userProfile.website_url ?? '',
        pic_name: userProfile.pic_name ?? '',
        pic_position: userProfile.pic_position ?? '',
        pic_phone: userProfile.pic_phone ?? '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch('/profile/update', {
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        reset();
    };

    const getRoleIcon = () => {
        switch (role) {
            case 'company':
                return <Building className="h-5 w-5 text-indigo-600" />;
            case 'teacher':
                return <UserCheck className="h-5 w-5 text-emerald-600" />;
            default:
                return <GraduationCap className="h-5 w-5 text-blue-600" />;
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 pb-16">
                {/* TOP HEADER / ACTION BAR */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-700">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            ) : (
                                user?.name?.charAt(0)?.toUpperCase() || 'U'
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
                                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold tracking-wide text-blue-700 capitalize">
                                    {getRoleIcon()}
                                    {role}
                                </span>
                            </div>
                            <p className="mt-0.5 text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Save className="h-3.5 w-3.5" />
                            {processing ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </div>

                {/* SUCCESS NOTIFICATION */}
                {recentlySuccessful && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs font-medium text-emerald-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>Profile details updated successfully!</span>
                    </div>
                )}

                {/* 1. CORE GENERAL INFORMATION */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 font-bold text-gray-900">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                        <h3>General Information</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InputText
                            label="Display Name / Full Name"
                            value={data.name}
                            onChange={(e: any) => setData('name', e.target.value)}
                            error={errors.name}
                        />
                        <InputText
                            label="Country / Base Location"
                            placeholder="e.g., Taiwan, Indonesia"
                            value={data.country}
                            onChange={(e: any) => setData('country', e.target.value)}
                            error={errors.country}
                        />
                    </div>
                </div>

                {/* 2. VERIFICATION STATUS & ACCOUNT HIERARCHY */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3 font-bold text-gray-900">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <h3>Verification & Account Context</h3>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-slate-50/60 p-3.5">
                            <Mail className="h-5 w-5 text-slate-400" />
                            <div>
                                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                    Email Address
                                </span>
                                <p className="text-xs font-semibold text-gray-800">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-slate-50/60 p-3.5">
                            <Globe className="h-5 w-5 text-slate-400" />
                            <div>
                                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                    Platform Hierarchy
                                </span>
                                <p className="text-xs font-semibold text-blue-600 uppercase">
                                    {role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. PROFESSIONAL SUMMARY / BIO */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="border-b border-gray-100 pb-3 font-bold text-gray-900">
                        <h3>
                            {role === 'company'
                                ? 'Company Summary Description'
                                : 'Professional Summary / Bio'}
                        </h3>
                        <p className="mt-0.5 text-xs font-normal text-gray-400">
                            Write a brief introduction about your background, experience, or goals.
                        </p>
                    </div>
                    <div className="mt-4">
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            rows={4}
                            placeholder="Write your summary here..."
                            className="w-full rounded-xl border border-gray-200 bg-slate-50/30 p-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.bio && (
                            <p className="mt-1 text-xs text-red-500">{errors.bio}</p>
                        )}
                    </div>
                </div>

                {/* 4. ROLE SPECIFIC CREDENTIALS */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="mb-4 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                            <ShieldAlert className="h-4 w-4 text-blue-500" />
                            <h3 className="capitalize">{role} Professional Credentials</h3>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-400">
                            Tailored profile information according to your role on the platform.
                        </p>
                    </div>

                    {role === 'student' && (
                        <StudentFields data={data} setData={setData} errors={errors} />
                    )}
                    {role === 'teacher' && (
                        <TeacherFields data={data} setData={setData} errors={errors} />
                    )}
                    {role === 'company' && (
                        <CompanyFields data={data} setData={setData} errors={errors} />
                    )}
                </div>

                {/* BOTTOM SAVE BUTTON */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Saving Changes...' : 'Save All Changes'}
                    </button>
                </div>
            </form>
        </Layout>
    );
}