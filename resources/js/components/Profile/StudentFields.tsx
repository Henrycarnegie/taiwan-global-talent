import InputText from '@/components/UI/InputText';

interface StudentFieldsProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
}

export default function StudentFields({
    data,
    setData,
    errors,
}: StudentFieldsProps) {
    return (
        <div className="animate-in fade-in grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4 duration-150 md:grid-cols-2">
            <div>
                <InputText
                    label="University / School"
                    placeholder="e.g., NTUST"
                    value={data.university}
                    onChange={(e: any) => setData('university', e.target.value)}
                />
                {errors.university && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.university}
                    </p>
                )}
            </div>
            <div>
                <InputText
                    label="Major / Department"
                    placeholder="e.g., Computer Science"
                    value={data.major}
                    onChange={(e: any) => setData('major', e.target.value)}
                />
                {errors.major && (
                    <p className="mt-1 text-xs text-red-500">{errors.major}</p>
                )}
            </div>
            <div>
                <InputText
                    label="Mandarin Proficiency Level"
                    placeholder="e.g., TOCFL B2 / Intermediate"
                    value={data.mandarin_level}
                    onChange={(e: any) =>
                        setData('mandarin_level', e.target.value)
                    }
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <InputText
                        label="TOEFL Score"
                        placeholder="e.g., 550"
                        value={data.toefl_score}
                        onChange={(e: any) =>
                            setData('toefl_score', e.target.value)
                        }
                    />
                </div>
                <div>
                    <InputText
                        label="TOCFL Score"
                        placeholder="e.g., Level 4"
                        value={data.tocfl_score}
                        onChange={(e: any) =>
                            setData('tocfl_score', e.target.value)
                        }
                    />
                </div>
            </div>
            <div className="md:col-span-2">
                <InputText
                    label="Core Skills (Comma separated)"
                    placeholder="e.g., React, Laravel, Translation"
                    value={data.skills}
                    onChange={(e: any) => setData('skills', e.target.value)}
                />
            </div>
            <div className="md:col-span-2">
                <InputText
                    label="Learning Goal"
                    placeholder="What do you want to achieve on this platform?"
                    value={data.learning_goal}
                    onChange={(e: any) =>
                        setData('learning_goal', e.target.value)
                    }
                />
            </div>
        </div>
    );
}
