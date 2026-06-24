export default function Input({ label, ...props }: any) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-gray-500">{label}</label>
            <input
                {...props}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
            />
        </div>
    )
}