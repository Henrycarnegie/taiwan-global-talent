import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

interface CompanyApplyFormState {
    // 1. Legal & Verification
    company_legal_name: string;
    tax_id: string;
    business_registration_path: File | null;

    // 2. Public Profile (Branding)
    company_display_name: string;
    slug: string;
    industry: string;
    website_url: string;
    founded_year: string;
    company_size: number;
    logo_path: File | null;
    banner_path: File | null;
    bio: string;
    description: string;

    // 3. PIC & Contact Details
    pic_name: string;
    pic_phone: string;
    pic_position: string;
    official_email: string;
    city: string;
    country: string;
    hq_address: string;
}

export default function Apply() {
    const { data, setData, post, processing, errors, reset } =
        useForm<CompanyApplyFormState>({
            company_legal_name: '',
            tax_id: '',
            business_registration_path: null,

            company_display_name: '',
            slug: '',
            industry: '',
            website_url: '',
            founded_year: '',
            company_size: 0,
            logo_path: null,
            banner_path: null,
            bio: '',
            description: '',

            pic_name: '',
            pic_phone: '',
            pic_position: '',
            official_email: '',
            city: '',
            country: 'Taiwan', // Default from the Filament schema.
            hq_address: '',
        });

    // Generate a simple slug when the public brand name is entered.
    const handleDisplayNameChange = (value: string) => {
        setData((data) => ({
            ...data,
            company_display_name: value,
            slug: value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, ''),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('company.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Company Account Registration" />

            <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Company Verification Form
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please Fill Company Information Below
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: legal and verification. */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="mb-4 text-xl font-bold text-gray-900">
                            1. Legal & Verification
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Name (Legal) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.company_legal_name}
                                    onChange={(e) =>
                                        setData(
                                            'company_legal_name',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Legal Company Name"
                                />
                                {errors.company_legal_name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.company_legal_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tax ID / NIB
                                </label>
                                <input
                                    type="text"
                                    value={data.tax_id}
                                    onChange={(e) =>
                                        setData('tax_id', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Nomor Pajak / NIB"
                                />
                                {errors.tax_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.tax_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Upload Business Document (PDF / Image)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) =>
                                    setData(
                                        'business_registration_path',
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            {errors.business_registration_path && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.business_registration_path}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Section 2: public profile and branding. */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="mb-4 text-xl font-bold text-gray-900">
                            2. Public Profile (Branding)
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Public Brand Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.company_display_name}
                                    onChange={(e) =>
                                        handleDisplayNameChange(e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Brand Name"
                                />
                                {errors.company_display_name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.company_display_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    URL Slug *
                                </label>
                                <input
                                    type="text"
                                    required
                                    disabled
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="company-url-slug"
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Industry Sector *
                                </label>
                                <select
                                    required
                                    value={data.industry}
                                    onChange={(e) =>
                                        setData('industry', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Industry</option>
                                    <option value="Technology / IT">
                                        Technology / IT
                                    </option>
                                    <option value="Education">Education</option>
                                    <option value="Manufacturing">
                                        Manufacturing
                                    </option>
                                    <option value="Finance">Finance</option>
                                    <option value="F&B">F&B</option>
                                </select>
                                {errors.industry && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.industry}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Size (Number of Employees) *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={data.company_size}
                                    onChange={(e) =>
                                        setData(
                                            'company_size',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Company Size"
                                />
                                {errors.company_size && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.company_size}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Founded Year *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={data.founded_year}
                                    onChange={(e) =>
                                        setData('founded_year', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="2024"
                                />
                                {errors.founded_year && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.founded_year}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Official Website
                                </label>
                                <input
                                    type="url"
                                    value={data.website_url}
                                    onChange={(e) =>
                                        setData('website_url', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="https://company.com"
                                />
                                {errors.website_url && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.website_url}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Logo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'logo_path',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                {errors.logo_path && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.logo_path}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Banner
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'banner_path',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                {errors.banner_path && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.banner_path}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tagline (Bio)
                            </label>
                            <input
                                type="text"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Short catchy tagline"
                            />
                            {errors.bio && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.bio}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Company Overview
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={4}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Tell us more about the company..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Section 3: PIC and contact details. */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900">
                            3. PIC & Contact Details
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    PIC Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.pic_name}
                                    onChange={(e) =>
                                        setData('pic_name', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.pic_name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.pic_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Number *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.pic_phone}
                                    onChange={(e) =>
                                        setData('pic_phone', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="+886..."
                                />
                                {errors.pic_phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.pic_phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Position *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.pic_position}
                                    onChange={(e) =>
                                        setData('pic_position', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="e.g. HR Manager"
                                />
                                {errors.pic_position && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.pic_position}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Corporate Email
                                </label>
                                <input
                                    type="email"
                                    value={data.official_email}
                                    onChange={(e) =>
                                        setData(
                                            'official_email',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="info@company.com"
                                />
                                {errors.official_email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.official_email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    City HQ
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Taipei"
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.city}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={(e) =>
                                        setData('country', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.country && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.country}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Full Address
                            </label>
                            <textarea
                                value={data.hq_address}
                                onChange={(e) =>
                                    setData('hq_address', e.target.value)
                                }
                                rows={2}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Street, Building No..."
                            />
                            {errors.hq_address && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.hq_address}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        >
                            {processing
                                ? 'Processing...'
                                : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
