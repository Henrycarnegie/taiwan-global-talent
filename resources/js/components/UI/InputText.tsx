export default function InputText({ label, ...props }: any) {
    return (
        <div className="space-y-1">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
                {label}
            </label>
            <input
                {...props}
                type="text"
                placeholder="e.g. John Doe"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
        </div>
    );
}
