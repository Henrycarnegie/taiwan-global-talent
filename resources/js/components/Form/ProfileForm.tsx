import { useForm } from '@inertiajs/react';
import InputText from '../UI/InputText';
import Textarea from '../UI/TextArea';
import Toggle from '../UI/Toggle';

export default function ProfileForm({ profile }: any) {
    const { data, setData, post, processing } = useForm({
        country: profile?.country || '',
        university: profile?.university || '',
        mandarin_level: profile?.mandarin_level || '',
        toefl_score: profile?.toefl_score || '',
        tocfl_score: profile?.tocfl_score || '',
        skills: profile?.skills || '',
        certificates: profile?.certificates || '',
        learning_goal: profile?.learning_goal || '',
        bio: profile?.bio || '',
        is_public: profile?.is_public ?? true,
    });

    const submit = (e: any) => {
        e.preventDefault();
        post('/profile');
    };

    return (
        <div className="mx-auto max-w-4xl p-4 md:p-6">
            <form
                onSubmit={submit}
                className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
            >
                {/* Header */}
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                        Complete Your Student Profile
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Provide your academic and language background to
                        personalize your learning journey.
                    </p>
                </div>

                <hr className="border-gray-100" />

                {/* Section 1: Personal & Academic Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                        Academic Information
                    </h3>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <InputText
                            label="Country of Origin"
                            value={data.country}
                            onChange={(e: any) =>
                                setData('country', e.target.value)
                            }
                        />
                        <InputText
                            label="University / Institution"
                            value={data.university}
                            onChange={(e: any) =>
                                setData('university', e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* Section 2: Language Proficiency */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                        Language Proficiency
                    </h3>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <InputText
                            label="Mandarin Level (e.g., A2, B1)"
                            value={data.mandarin_level}
                            onChange={(e: any) =>
                                setData('mandarin_level', e.target.value)
                            }
                        />
                        <InputText
                            label="TOEFL Score"
                            value={data.toefl_score}
                            onChange={(e: any) =>
                                setData('toefl_score', e.target.value)
                            }
                        />
                        <InputText
                            label="TOCFL Score"
                            value={data.tocfl_score}
                            onChange={(e: any) =>
                                setData('tocfl_score', e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* Section 3: Profile Details */}
                <div className="space-y-5">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                        Additional Details
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Textarea
                            label="Skills"
                            rows={3}
                            value={data.skills}
                            onChange={(e: any) =>
                                setData('skills', e.target.value)
                            }
                        />
                        <Textarea
                            label="Certificates & Achievements"
                            rows={3}
                            value={data.certificates}
                            onChange={(e: any) =>
                                setData('certificates', e.target.value)
                            }
                        />
                    </div>

                    <Textarea
                        label="Learning Goals"
                        rows={3}
                        value={data.learning_goal}
                        onChange={(e: any) =>
                            setData('learning_goal', e.target.value)
                        }
                    />

                    <Textarea
                        label="Short Bio"
                        rows={4}
                        value={data.bio}
                        onChange={(e: any) => setData('bio', e.target.value)}
                    />
                </div>

                <hr className="border-gray-100" />

                {/* Section 4: Privacy Settings & Submit */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center">
                    <div className="space-y-0.5">
                        <span className="text-sm font-semibold text-gray-900">
                            Privacy Preference
                        </span>
                        <p className="text-xs text-gray-500">
                            Public profiles are visible to verified recruiters.
                        </p>
                    </div>
                    <Toggle
                        label="Make profile public"
                        checked={data.is_public}
                        onChange={(val: boolean) => setData('is_public', val)}
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        disabled={processing}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        {processing ? (
                            <>
                                <svg
                                    className="h-4 w-4 animate-spin text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Saving Changes...
                            </>
                        ) : (
                            'Save Profile'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
