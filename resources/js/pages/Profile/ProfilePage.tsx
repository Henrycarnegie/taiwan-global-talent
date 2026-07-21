import { useForm, usePage } from '@inertiajs/react';
import {
    User as UserIcon,
    FileText,
    Check,
    X,
    Edit2,
    ShieldAlert,
} from 'lucide-react';
import React, { useState } from 'react';
import InputText from '@/components/UI/InputText';
import Layout from '../Student/Layout';

import CompanyFields from './Components/CompanyFields';
import ProfileHeroCard from './Components/ProfileHeroCard';
import StudentFields from './Components/StudentFields';
import TeacherFields from './Components/TeacherFields';

export default function ProfilePage() {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const userProfile = user?.profile ?? {};
    const role = user?.role_name;

    const [isEditingHeader, setIsEditingHeader] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);

    const { data, setData, patch, processing, errors, cancel } = useForm({
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

    const handleSave = (type: 'header' | 'bio') => {
        patch('/profile/update', {
            preserveScroll: true,
            onSuccess: () => {
                if (type === 'header') {
                    setIsEditingHeader(false);
                }

                if (type === 'bio') {
                    setIsEditingBio(false);
                }
            },
        });
    };

    const handleCancel = (type: 'header' | 'bio') => {
        cancel();

        if (type === 'header') {
            setIsEditingHeader(false);
        }

        if (type === 'bio') {
            setIsEditingBio(false);
        }
    };

    return (
        <Layout>
            <div className="mx-auto max-w-4xl space-y-6 pb-12">
                {/* 1. HERO & CORE GENERAL SPECIFICATION CARD */}
                <ProfileHeroCard
                    user={user}
                    userProfile={userProfile}
                    role={role}
                    isEditing={isEditingHeader}
                    setIsEditing={setIsEditingHeader}
                    countryValue={data.country}
                    renderActions={
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleCancel('header')}
                                className="rounded-xl border p-1.5 text-gray-400 hover:bg-gray-50"
                            >
                                <X size={14} />
                            </button>
                            <button
                                onClick={() => handleSave('header')}
                                disabled={processing}
                                className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                            >
                                <Check size={14} /> Save
                            </button>
                        </div>
                    }
                    renderForm={
                        <div className="space-y-4">
                            <InputText
                                label="Core Display Name / PIC Name"
                                value={data.name}
                                onChange={(e: any) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputText
                                label="Country / Base Location"
                                placeholder="e.g., Taiwan"
                                value={data.country}
                                onChange={(e: any) =>
                                    setData('country', e.target.value)
                                }
                            />
                        </div>
                    }
                />

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3 font-bold text-gray-900">
                        <FileText size={18} className="text-gray-500" />
                        <h3>Verification Status</h3>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                Email Address
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-700">
                                {user?.email}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                Platform Hierarchy
                            </span>
                            <p className="mt-1 text-sm font-semibold tracking-wider text-blue-600 uppercase">
                                {role}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                            <UserIcon size={18} className="text-gray-500" />
                            <h3>
                                {role === 'company'
                                    ? 'Company Summary Description'
                                    : 'Professional Summary / Bio'}
                            </h3>
                        </div>
                        {!isEditingBio ? (
                            <button
                                onClick={() => setIsEditingBio(true)}
                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                            >
                                <Edit2 size={14} />
                            </button>
                        ) : (
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => handleCancel('bio')}
                                    className="rounded-lg border p-1 text-gray-400 hover:bg-gray-50"
                                >
                                    <X size={14} />
                                </button>
                                <button
                                    onClick={() => handleSave('bio')}
                                    className="rounded-lg bg-blue-600 p-1 text-white hover:bg-blue-700"
                                >
                                    <Check size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        {!isEditingBio ? (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-600">
                                {data.bio || (
                                    <span className="text-gray-400 italic">
                                        No summary description added yet. Click
                                        edit to write about your background.
                                    </span>
                                )}
                            </p>
                        ) : (
                            <textarea
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                rows={4}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/30 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        )}
                    </div>
                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                    <div className="mb-4 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                            <ShieldAlert size={18} className="text-blue-500" />
                            <h3 className="capitalize">
                                {role} Professional Credentials
                            </h3>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-400">
                            This information helps matches opportunities
                            tailored to your structural role.
                        </p>
                    </div>

                    {role === 'student' && (
                        <StudentFields
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    )}
                    {role === 'teacher' && (
                        <TeacherFields
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    )}
                    {role === 'company' && (
                        <CompanyFields
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}
