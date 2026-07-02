import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

interface ApplyFormState {
    full_name: string;
    phone: string;
    expertise: string;
    learning_goal: string;
    bio: string;
    cv: File | null;
    certificate: File | null;
}

export default function Apply() {
    const { data, setData, post, processing, errors, reset } = useForm<ApplyFormState>({
        full_name: '',
        phone: '',
        expertise: '',
        learning_goal: '',
        bio: '',
        cv: null,
        certificate: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('teacher.store'), {
            forceFormData: true, 
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Form Pengajuan Guru" />

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Teacher Application Form
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please fill out the form below according to your profile schema.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={data.full_name}
                            onChange={e => setData('full_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Your full name"
                        />
                        {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number (WhatsApp)</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="(+886) 81234567xxx"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Expertise */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expertise / Keahlian</label>
                        <input
                            type="text"
                            value={data.expertise}
                            onChange={e => setData('expertise', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="e.g. Mathematics, English, Web Development"
                        />
                        {errors.expertise && <p className="mt-1 text-sm text-red-600">{errors.expertise}</p>}
                    </div>

                    {/* Learning Goal */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Learning Goal / Target Mengajar</label>
                        <input
                            type="text"
                            value={data.learning_goal}
                            onChange={e => setData('learning_goal', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="e.g. Preparing students for IELTS, Basic Calculus"
                        />
                        {errors.learning_goal && <p className="mt-1 text-sm text-red-600">{errors.learning_goal}</p>}
                    </div>

                    {/* Bio / Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">About Me / Teaching Experience</label>
                        <textarea
                            rows={4}
                            value={data.bio}
                            onChange={e => setData('bio', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Tell us briefly about your profile and teaching experience..."
                        />
                        {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                    </div>

                    {/* Upload CV */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload CV (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={e => setData('cv', e.target.files ? e.target.files[0] : null)}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {errors.cv && <p className="mt-1 text-sm text-red-600">{errors.cv}</p>}
                    </div>

                    {/* Upload Certificate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Certificate (Optional)</label>
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={e => setData('certificate', e.target.files ? e.target.files[0] : null)}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {errors.certificate && <p className="mt-1 text-sm text-red-600">{errors.certificate}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {processing ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}