import React from 'react';

interface HeaderLogoProps {
    userName?: string;
}

export default function HeaderLogo({ userName }: HeaderLogoProps) {
    return (
        <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                TW
            </div>
            <div>
                <h1 className="text-base font-bold text-gray-900 truncate max-w-45">
                    {userName ?? 'User'}
                </h1>
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                    Talent Net Platform
                </p>
            </div>
        </div>
    );
}