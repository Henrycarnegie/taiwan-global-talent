import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Waiting() {
    const [copied, setCopied] = useState(false);
    const adminWhatsApp = "6281234567890"; // Replace with your admin's WhatsApp number

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`+${adminWhatsApp}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Waiting for Admin Approval" />

            <div className="sm:mx-auto w-full max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100 text-center">

                    {/* Loading / Clock Animation */}
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-indigo-50 text-indigo-600 mb-6 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 animate-pulse"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <span className="absolute top-0 right-0 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                        </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                        Your Application Is Under Review
                    </h2>

                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        Thank you for completing your profile. Our team is currently reviewing your submitted information and documents. This process usually takes <strong className="text-gray-800">1–2 business days</strong>.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg
                                    className="h-5 w-5 text-amber-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-amber-800">
                                    Important Information
                                </h3>
                                <p className="mt-1 text-xs text-amber-700 leading-relaxed">
                                    Once your account has been approved by the administrator, you will be automatically redirected to the Teacher Dashboard.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Contact Admin */}
                        <a
                            href={`https://wa.me/${adminWhatsApp}?text=Hello%20Admin,%20I%20would%20like%20to%20check%20the%20status%20of%20my%20teacher%20application.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411 0 11.973 0c3.178.001 6.165 1.24 8.413 3.494 2.25 2.253 3.487 5.244 3.485 8.423-.003 6.621-5.355 11.97-11.915 11.97-2.004-.001-3.973-.51-5.713-1.486L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.023-5.092-2.884-6.956C16.584 1.874 14.12.85 11.5.851c-5.44 0-9.866 4.414-9.869 9.831-.001 1.742.46 3.442 1.336 4.954l-.993 3.626 3.71-.973zm11.334-7.108c-.287-.144-1.696-.838-1.957-.934-.26-.096-.45-.144-.64.144-.19.287-.736.934-.903 1.125-.167.19-.334.215-.62.072-.287-.144-1.21-.447-2.306-1.424-.853-.761-1.43-1.7-1.597-1.986-.167-.287-.018-.442.125-.584.13-.127.287-.335.43-.502.144-.167.19-.287.287-.478.096-.19.048-.36-.024-.503-.072-.143-.64-1.542-.877-2.114-.23-.557-.465-.48-.64-.49-.166-.008-.356-.01-.547-.01-.19 0-.501.072-.763.36-.26.287-.993.971-.993 2.37 0 1.399 1.018 2.75 1.16 2.94.144.19 2.004 3.059 4.856 4.287.678.293 1.208.468 1.62.598.682.217 1.3.187 1.79.114.545-.081 1.696-.693 1.933-1.362.238-.669.238-1.243.166-1.362-.07-.12-.26-.19-.546-.334z" />
                            </svg>
                            Contact Admin via WhatsApp
                        </a>

                        {/* Copy Admin Contact */}
                        <button
                            onClick={copyToClipboard}
                            className="w-full text-xs text-gray-500 hover:text-gray-700 transition py-1"
                        >
                            {copied
                                ? '✓ Admin phone number copied!'
                                : 'Copy admin phone number'}
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                            Signed in with the wrong account?
                        </span>

                        <button
                            onClick={handleLogout}
                            className="text-xs font-semibold text-red-600 hover:text-red-500 transition focus:outline-none"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}