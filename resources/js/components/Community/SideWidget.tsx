import React from 'react';

export default function SideWidgets() {
    return (
        <div className="space-y-4">
            {/* Rules */}
            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900">
                    Community Rules 📜
                </h3>
                <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-gray-500">
                    <li>
                        Respect every member of the digital talent community.
                    </li>
                    <li>
                        Do not share fake job postings or misleading
                        information.
                    </li>
                    <li>
                        Use the right tags so other students can find
                        discussions easily.
                    </li>
                </ul>
            </div>

            {/* Popular Topics */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-bold text-gray-900">
                    Trending Topics
                </h3>
                <div className="flex flex-wrap gap-1.5">
                    {[
                        '#InfoMagang',
                        '#BeasiswaMOE',
                        '#TOCFL',
                        '#TaipeiTech',
                        '#PartTime',
                        '#LifeInTW',
                    ].map((tag) => (
                        <span
                            key={tag}
                            className="cursor-pointer rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
