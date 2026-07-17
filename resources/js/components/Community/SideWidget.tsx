import { Scroll, TrendingUp, Hash } from 'lucide-react';
import React from 'react';

export default function SideWidgets() {
    return (
        <div className="space-y-4">
            {/* Rules Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Scroll className="h-4 w-4 text-slate-500" />
                    <h3 className="text-sm font-bold text-gray-900">
                        Community Rules
                    </h3>
                </div>
                <ul className="mt-3 list-none space-y-3 text-xs leading-relaxed text-gray-600">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>Respect every member of the digital talent community.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>Do not share fake job postings or misleading information.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>Use the right tags so other students can find discussions easily.</span>
                    </li>
                </ul>
            </div>

            {/* Popular Topics Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <TrendingUp className="h-4 w-4 text-slate-500" />
                    <h3 className="text-sm font-bold text-gray-900">
                        Trending Topics
                    </h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {[
                        'InfoMagang',
                        'BeasiswaMOE',
                        'TOCFL',
                        'TaipeiTech',
                        'PartTime',
                        'LifeInTW',
                    ].map((tag) => (
                        <button
                            key={tag}
                            className="group flex items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Hash className="h-3 w-3 text-gray-400 group-hover:text-blue-500" />
                            <span>{tag}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}