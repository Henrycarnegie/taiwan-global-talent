import { useForm } from '@inertiajs/react';

type ProfileFormProps = {
    profile?: {
        country?: string | null;
        university?: string | null;
        mandarin_level?: string | null;
        toefl_score?: string | number | null;
        tocfl_score?: string | number | null;
        skills?: string | null;
        certificates?: string | null;
        learning_goal?: string | null;
        bio?: string | null;
        is_public?: boolean | null;
    } | null;
};

export default function ProfileForm({ profile }: ProfileFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        country: profile?.country ?? '',
        university: profile?.university ?? '',
        mandarin_level: profile?.mandarin_level ?? '',
        toefl_score: profile?.toefl_score?.toString() ?? '',
        tocfl_score: profile?.tocfl_score?.toString() ?? '',
        skills: profile?.skills ?? '',
        certificates: profile?.certificates ?? '',
        learning_goal: profile?.learning_goal ?? '',
        bio: profile?.bio ?? '',
        is_public: profile?.is_public ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/profile');
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Country" error={errors.country}>
                    <input
                        value={data.country}
                        onChange={(event) =>
                            setData('country', event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </Field>

                <Field label="University" error={errors.university}>
                    <input
                        value={data.university}
                        onChange={(event) =>
                            setData('university', event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </Field>

                <Field label="Mandarin Level" error={errors.mandarin_level}>
                    <input
                        value={data.mandarin_level}
                        onChange={(event) =>
                            setData('mandarin_level', event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </Field>

                <Field label="TOEFL Score" error={errors.toefl_score}>
                    <input
                        value={data.toefl_score}
                        onChange={(event) =>
                            setData('toefl_score', event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </Field>

                <Field label="TOCFL Score" error={errors.tocfl_score}>
                    <input
                        value={data.tocfl_score}
                        onChange={(event) =>
                            setData('tocfl_score', event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </Field>

                <Field label="Skills" error={errors.skills}>
                    <input
                        value={data.skills}
                        onChange={(event) =>
                            setData('skills', event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                </Field>
            </div>

            <Field label="Certificates" error={errors.certificates}>
                <input
                    value={data.certificates}
                    onChange={(event) =>
                        setData('certificates', event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
            </Field>

            <Field label="Learning Goal" error={errors.learning_goal}>
                <textarea
                    value={data.learning_goal}
                    onChange={(event) =>
                        setData('learning_goal', event.target.value)
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
            </Field>

            <Field label="Bio" error={errors.bio}>
                <textarea
                    value={data.bio}
                    onChange={(event) => setData('bio', event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
            </Field>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                    type="checkbox"
                    checked={data.is_public}
                    onChange={(event) =>
                        setData('is_public', event.target.checked)
                    }
                    className="rounded border-gray-300"
                />
                Make my profile public
            </label>

            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-[#173b8f] px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
            >
                {processing ? 'Saving...' : 'Save Profile'}
            </button>
        </form>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block space-y-1">
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            {children}
            {error && (
                <span className="block text-xs text-red-600">{error}</span>
            )}
        </label>
    );
}
