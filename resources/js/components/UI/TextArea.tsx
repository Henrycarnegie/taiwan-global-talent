interface TextareaProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    placeholder?: string;
}

export default function TextArea({
    label,
    value,
    onChange,
    rows = 3,
    placeholder = '',
}: TextareaProps) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-gray-500">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
            />
        </div>
    )
}