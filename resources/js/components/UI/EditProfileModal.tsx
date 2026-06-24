import { useState } from 'react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: any;
    onSave: (data: any) => void;
}

export default function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        avatar: '',
        mandarin_level: 'Beginner',
        learning_goal: 'Study',
        bio: '',
        is_public: true,
    });

    // Sinkronisasi data ketika modal dibuka
    if (profile) {
        setFormData({
            name: profile.name || '',
            email: profile.email || '',
            country: profile.country || '',
            avatar: profile.avatar || '',
            mandarin_level: profile.mandarin_level || 'Beginner',
            learning_goal: profile.learning_goal || 'Study',
            bio: profile.bio || '',
            is_public: profile.is_public ?? true,
        });
    }

    if (!isOpen) {
        return null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
                
                {/* Header Modal */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Account Settings</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
                </div>

                {/* Form CRUD */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Read-only Google Fields */}
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fullname (Google)</label>
                            <p className="text-sm font-medium text-gray-600 mt-0.5 truncate">{formData.name}</p>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email (Google)</label>
                            <p className="text-sm font-medium text-gray-600 mt-0.5 truncate">{formData.email}</p>
                        </div>
                    </div>

                    {/* Country Input */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Country / Asal Negara</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Indonesia"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Mandarin Level Dropdown */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Mandarin Level (華語能力)</label>
                        <select 
                            value={formData.mandarin_level}
                            onChange={(e) => setFormData({ ...formData, mandarin_level: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="Beginner">Beginner (TOCFL A1/A2)</option>
                            <option value="Intermediate">Intermediate (TOCFL B1/B2)</option>
                            <option value="Advanced">Advanced (TOCFL C1/C2)</option>
                        </select>
                    </div>

                    {/* Learning Goal */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Main Goal in Taiwan</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Study', 'Work', 'Travel'].map((goal) => (
                                <button
                                    key={goal}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, learning_goal: goal })}
                                    className={`py-2 text-xs font-medium rounded-lg border transition ${
                                        formData.learning_goal === goal 
                                            ? 'bg-blue-50 text-blue-600 border-blue-500 font-bold' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bio Textarea */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Bio (Short Description)</label>
                        <textarea 
                            rows={3}
                            placeholder="Tell the community about your expertise or interests..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Visibility Toggles */}
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                        {/* Public Profile Visibility */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                                type="checkbox"
                                checked={formData.is_public}
                                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                                <span className="block text-xs font-semibold text-gray-800">Public profile</span>
                                <span className="block text-[11px] text-gray-400">Izinkan profil Anda dicari dan dilihat oleh komunitas platform.</span>
                            </div>
                        </label>

                        {/* Private Fields Information */}
                        <div className="flex gap-2 bg-amber-50 p-2.5 rounded-lg border border-amber-100 text-[11px] text-amber-800">
                            <span>🔒</span>
                            <p><strong>Private fields active:</strong> Alamat Email Anda aman dan hanya dapat dilihat oleh Anda sendiri serta sistem kurasi.</p>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 shadow-sm transition"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}