import { Camera, Edit2, School, GraduationCap, Briefcase, Globe, Building, MapPin } from 'lucide-react';
import React from 'react';

interface ProfileHeroCardProps {
    user: any;
    userProfile: any;
    role: string;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    renderForm: React.ReactNode;
    renderActions: React.ReactNode;
    countryValue: string;
}

export default function ProfileHeroCard({ 
    user, userProfile, role, isEditing, setIsEditing, renderForm, renderActions, countryValue 
}: ProfileHeroCardProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
            <div className="h-40 w-full bg-linear-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute right-4 top-4 rounded-lg bg-black/20 p-2 text-white backdrop-blur-xs cursor-pointer hover:bg-black/30 transition">
                    <Camera size={16} />
                </div>
            </div>

            <div className="px-6 pb-6 relative">
                <div className="absolute -top-16 left-6">
                    {user?.avatar ? (
                        <img src={user.avatar} alt="" className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md" />
                    ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-md">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50">
                            <Edit2 size={13} /> Edit Profile
                        </button>
                    ) : renderActions}
                </div>

                <div className="mt-6 space-y-4">
                    {!isEditing ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {role === 'company' && userProfile.company_display_name ? userProfile.company_display_name : user?.name}
                                </h2>
                                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                                    {role}
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-medium">
                                {role === 'student' && (
                                    <>
                                        {userProfile.university && <span className="flex items-center gap-1.5"><School size={16} /> {userProfile.university}</span>}
                                        {userProfile.major && <span className="flex items-center gap-1.5"><GraduationCap size={16} /> {userProfile.major}</span>}
                                    </>
                                )}
                                {role === 'teacher' && (
                                    <>
                                        {userProfile.expertise && <span className="flex items-center gap-1.5"><Briefcase size={16} /> {userProfile.expertise}</span>}
                                        {userProfile.full_name && <span className="flex items-center gap-1.5">({userProfile.full_name})</span>}
                                    </>
                                )}
                                {role === 'company' && (
                                    <>
                                        {userProfile.company_legal_name && <span className="flex items-center gap-1.5"><Building size={16} /> {userProfile.company_legal_name}</span>}
                                        {userProfile.website_url && <span className="flex items-center gap-1.5"><Globe size={16} /> {userProfile.website_url}</span>}
                                    </>
                                )}
                                {countryValue && <span className="flex items-center gap-1.5"><MapPin size={16} /> {countryValue}</span>}
                            </div>
                        </div>
                    ) : renderForm}
                </div>
            </div>
        </div>
    );
}