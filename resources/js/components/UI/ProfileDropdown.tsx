import { usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import EditProfileModal from './EditProfileModal';

interface ProfileDropdownProps {
    profile: {
        name?: string;
        email?: string;
        avatar?: string;
        country?: string;
        mandarin_level?: string;
        learning_goal?: string;
        bio?: string;
        is_public?: boolean;
    };
    onLogout: () => void;
    onProfileUpdate: (updatedData: any) => void;
}
interface AuthUser {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

export default function ProfileDropdown({ profile, onLogout, onProfileUpdate }: ProfileDropdownProps) {

    const { auth } = usePage().props as unknown as {
            auth: {
                user: AuthUser;
            };
        };

    const roleMapping: Record<number, string> = {
        1: 'Admin',
        2: 'Teacher',
        3: 'Student'
    };

    console.log(auth.user);

    const role = roleMapping[auth.user.role as unknown as number] || 'Student';

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* TRIGGER: Avatar & Nama */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-3 border-l border-gray-200 pl-4 text-left focus:outline-none group"
            >
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition">
                        {auth.user.name}
                    </p>
                    <p className="text-xs text-gray-400">{role}</p>
                </div>
                
                {auth?.user?.avatar ? (
                    <img 
                        src={auth.user.avatar} 
                        alt={auth.user.name} 
                        className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-100 font-bold text-blue-700 shadow-inner group-hover:bg-blue-200 transition">
                        {auth.user.name.charAt(0)}
                    </div>
                )}
            </button>

            {/* POPUP / DROPDOWN MENU */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                    {/* User Mini Info */}
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-sm font-bold text-gray-900 truncate">{auth.user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{auth.user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                    >
                        ⚙️ <span>Edit Profile Settings</span>
                    </button>

                    <div className="my-1 border-t border-gray-100"></div>

                    <button
                        onClick={onLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                        🚪 <span>Log Out</span>
                    </button>
                </div>
            )}

            {/* MODAL UNTUK CRUD DATA PROFIL */}
            <EditProfileModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                profile={profile} 
                onSave={onProfileUpdate}
            />
        </div>
    );
}