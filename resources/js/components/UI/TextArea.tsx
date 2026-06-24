export default function Textarea({ label, ...props }: any) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-gray-500">{label}</label>
            <textarea
                {...props}
                rows={3}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
            />
        </div>
    )
}