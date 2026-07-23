import InputText from '@/components/UI/InputText';

interface TeacherFieldsProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
}

export default function TeacherFields({ data, setData, errors }: TeacherFieldsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-gray-50/60 p-4 rounded-xl border border-gray-100 animate-in fade-in duration-150">
            <div>
                <InputText label="Full Name (For Certification)" placeholder="Enter legal full name" value={data.full_name} onChange={(e: any) => setData('full_name', e.target.value)} />
                {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>}
            </div>
            <div>
                <InputText label="Contact Phone Number" placeholder="e.g., +886..." value={data.phone} onChange={(e: any) => setData('phone', e.target.value)} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div className="md:col-span-2">
                <InputText label="Expertise / Specialization" placeholder="e.g., Business Mandarin, Advanced Web Development" value={data.expertise} onChange={(e: any) => setData('expertise', e.target.value)} />
                {errors.expertise && <p className="text-xs text-red-500 mt-1">{errors.expertise}</p>}
            </div>
            <div className="md:col-span-2">
                <InputText label="Target Learning Goal for Students" placeholder="Describe your teaching objectives..." value={data.learning_goal} onChange={(e: any) => setData('learning_goal', e.target.value)} />
            </div>
        </div>
    );
}