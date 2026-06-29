import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { update } from '@/actions/App/Http/Controllers/Profile/ProfileController';
import InputText from './InputText';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: '',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [reset, isOpen]);

    if (!isOpen) {
        return null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(update.url(), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
                
                {/* Header Modal */}
                <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Account Settings</h3>
                        <p className="text-xs text-gray-500">Update your core account credentials.</p>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition">
                        ✕
                    </button>
                </div>

                {/* Form CRUD */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Read-only Google Fields */}
                    <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
                        <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            Connected Account
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            <p className="text-sm font-semibold text-gray-600 truncate">
                                Google Authentication
                            </p>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div>
                        <InputText
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={data.name}
                            onChange={(e: any) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}