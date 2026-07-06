import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputText from '../UI/InputText';
import TextArea from '../UI/TextArea';
import Toggle from '../UI/Toggle';

interface StudentProfile {
    country?: string | null;
    university?: string | null;
    major?: string | null;
    mandarin_level?: string | null;
    toefl_score?: number | null;
    tocfl_score?: number | null;
    skills?: string | null;
    certificates?: string | null;
    learning_goal?: string | null;
    bio?: string | null;
    is_public?: boolean | null;
}

interface ProfileFormProps {
    profile?: StudentProfile | null;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        country: profile?.country ?? '',
        university: profile?.university ?? '',
        major: profile?.major ?? '',
        mandarin_level: profile?.mandarin_level ?? '',
        toefl_score: profile?.toefl_score?.toString() ?? '',
        tocfl_score: profile?.tocfl_score?.toString() ?? '',
        skills: profile?.skills ?? '',
        certificates: profile?.certificates ?? '',
        learning_goal: profile?.learning_goal ?? '',
        bio: profile?.bio ?? '',
        is_public: profile?.is_public ?? true,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/profile');
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputText
                    label="Country of Origin"
                    value={data.country}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('country', event.target.value)
                    }
                />
                <InputText
                    label="University / Institution"
                    value={data.university}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('university', event.target.value)
                    }
                />
                <InputText
                    label="Major"
                    value={data.major}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('major', event.target.value)
                    }
                />
                <InputText
                    label="Mandarin Level"
                    value={data.mandarin_level}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('mandarin_level', event.target.value)
                    }
                />
                <InputText
                    label="TOEFL Score"
                    value={data.toefl_score}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('toefl_score', event.target.value)
                    }
                />
                <InputText
                    label="TOCFL Score"
                    value={data.tocfl_score}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('tocfl_score', event.target.value)
                    }
                />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <TextArea
                    label="Skills"
                    value={data.skills}
                    onChange={(event) => setData('skills', event.target.value)}
                />
                <TextArea
                    label="Certificates & Achievements"
                    value={data.certificates}
                    onChange={(event) =>
                        setData('certificates', event.target.value)
                    }
                />
            </div>

            <TextArea
                label="Learning Goals"
                value={data.learning_goal}
                onChange={(event) =>
                    setData('learning_goal', event.target.value)
                }
            />
            <TextArea
                label="Short Bio"
                rows={4}
                value={data.bio}
                onChange={(event) => setData('bio', event.target.value)}
            />

            {Object.keys(errors).length > 0 && (
                <p className="text-sm text-red-600">
                    Please correct the highlighted profile information and try
                    again.
                </p>
            )}

            <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center">
                <Toggle
                    label="Make profile public"
                    checked={data.is_public}
                    onChange={(value) => setData('is_public', value)}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Save Profile'}
                </button>
            </div>
        </form>
    );
}
