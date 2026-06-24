interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (val: boolean) => void;
}

export default function Toggle({ label, checked, onChange }: ToggleProps) {
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)} //  Panggil hanya saat ada interaksi asli
                />
                <div className={`block h-6 w-11 rounded-full transition ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''}`}></div>
            </div>
        </label>
    );
}