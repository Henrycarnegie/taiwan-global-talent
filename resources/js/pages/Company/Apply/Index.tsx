import { Head, useForm } from '@inertiajs/react';
import {
    Building2,
    FileText,
    User,
    Upload,
    CheckCircle2,
    // X,
    Globe,
    Briefcase,
    MapPin,
    Phone,
    Mail,
    ImageIcon,
} from 'lucide-react';
import React, { useState } from 'react';
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
            country: 'Taiwan',
            hq_address: '',
        });

    // Preview States untuk UX Upload File
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    // Auto-generate Slug dari Brand Name
    const handleDisplayNameChange = (value: string) => {
        const generatedSlug = value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '');

        setData((prevData) => ({
            ...prevData,
            company_display_name: value,
            slug: generatedSlug,
        }));
    };

    const handleFileChange = (
        field: keyof CompanyApplyFormState,
        file: File | null,
        setPreview?: (url: string | null) => void,
    ) => {
        setData(field, file as any);

        if (file && setPreview) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        } else if (setPreview) {
            setPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('company.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setLogoPreview(null);
                setBannerPreview(null);
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Company Account Registration" />

            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5">
                {/* Header Section */}
                <div className="bg-linear-to-r from-indigo-700 via-indigo-600 to-blue-600 px-8 py-10 text-white">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-md">
                            <Building2 className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Company Verification Form
                            </h2>
                            <p className="mt-1 text-sm text-indigo-100">
                                Complete your company details to apply for an
                                official account.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 p-8">
                    {/* SECTION 1: LEGAL & VERIFICATION */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                            <FileText className="h-5 w-5 text-indigo-600" />
                            <h3 className="text-lg font-semibold text-slate-900">
                                1. Legal & Verification
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Company Name (Legal){' '}
                                    <span className="text-red-500">*</span>
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
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="e.g. PT Acme Indonesia Corporation"
                                />
                                {errors.company_legal_name && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.company_legal_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Tax ID / NIB / Business Registration Number
                                </label>
                                <input
                                    type="text"
                                    value={data.tax_id}
                                    onChange={(e) =>
                                        setData('tax_id', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="e.g. 12.345.678.9-012.000"
                                />
                                {errors.tax_id && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.tax_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Upload Business Document (PDF / Image)
                            </label>
                            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-6 transition-colors hover:border-indigo-400">
                                <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                    <div className="mt-2 flex text-sm text-slate-600">
                                        <label className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                accept=".pdf,image/*"
                                                className="sr-only"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        'business_registration_path',
                                                        e.target.files?.[0] ||
                                                            null,
                                                    )
                                                }
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500">
                                        PDF, PNG, JPG up to 10MB
                                    </p>
                                    {data.business_registration_path && (
                                        <div className="mt-2 flex items-center justify-center space-x-1 text-xs font-medium text-emerald-600">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>
                                                {
                                                    data
                                                        .business_registration_path
                                                        .name
                                                }
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errors.business_registration_path && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.business_registration_path}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* SECTION 2: PUBLIC PROFILE (BRANDING) */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                            <Briefcase className="h-5 w-5 text-indigo-600" />
                            <h3 className="text-lg font-semibold text-slate-900">
                                2. Public Profile (Branding)
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Public Brand Name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.company_display_name}
                                    onChange={(e) =>
                                        handleDisplayNameChange(e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="e.g. Acme Studio"
                                />
                                {errors.company_display_name && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.company_display_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    URL Slug{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1.5 flex rounded-lg shadow-sm">
                                    <span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 text-xs text-slate-500">
                                        /company/
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        readOnly
                                        value={data.slug}
                                        className="block w-full min-w-0 flex-1 cursor-not-allowed rounded-none rounded-r-lg border border-slate-300 bg-slate-100 px-3.5 py-2.5 text-slate-600 focus:outline-none sm:text-sm"
                                        placeholder="acme-studio"
                                    />
                                </div>
                                {errors.slug && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Industry Sector{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={data.industry}
                                    onChange={(e) =>
                                        setData('industry', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
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
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.industry}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Company Size (Number of Employees){' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={data.company_size || ''}
                                    onChange={(e) =>
                                        setData(
                                            'company_size',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="e.g. 50"
                                />
                                {errors.company_size && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.company_size}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Founded Year{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    value={data.founded_year}
                                    onChange={(e) =>
                                        setData('founded_year', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="2020"
                                />
                                {errors.founded_year && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.founded_year}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Official Website
                                </label>
                                <div className="relative mt-1.5 rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Globe className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="url"
                                        value={data.website_url}
                                        onChange={(e) =>
                                            setData(
                                                'website_url',
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pr-3.5 pl-10 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                        placeholder="https://company.com"
                                    />
                                </div>
                                {errors.website_url && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.website_url}
                                    </p>
                                )}
                            </div>

                            {/* Logo Upload with Preview */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Company Logo
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="h-6 w-6 text-slate-400" />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleFileChange(
                                                'logo_path',
                                                e.target.files?.[0] || null,
                                                setLogoPreview,
                                            )
                                        }
                                        className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                </div>
                                {errors.logo_path && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.logo_path}
                                    </p>
                                )}
                            </div>

                            {/* Banner Upload with Preview */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Company Banner
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                                        {bannerPreview ? (
                                            <img
                                                src={bannerPreview}
                                                alt="Banner preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="h-6 w-6 text-slate-400" />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleFileChange(
                                                'banner_path',
                                                e.target.files?.[0] || null,
                                                setBannerPreview,
                                            )
                                        }
                                        className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                </div>
                                {errors.banner_path && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.banner_path}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Tagline (Bio)
                            </label>
                            <input
                                type="text"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                placeholder="Short catchy tagline (e.g. Innovating the future of digital tech)"
                            />
                            {errors.bio && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.bio}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Company Overview
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={4}
                                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                placeholder="Tell us more about your company's mission, culture, and achievements..."
                            />
                            {errors.description && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* SECTION 3: PIC & CONTACT DETAILS */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                            <User className="h-5 w-5 text-indigo-600" />
                            <h3 className="text-lg font-semibold text-slate-900">
                                3. PIC & Contact Details
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    PIC Full Name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.pic_name}
                                    onChange={(e) =>
                                        setData('pic_name', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="John Doe"
                                />
                                {errors.pic_name && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.pic_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Phone Number{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mt-1.5 rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={data.pic_phone}
                                        onChange={(e) =>
                                            setData('pic_phone', e.target.value)
                                        }
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pr-3.5 pl-10 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                        placeholder="+886 912 345 678"
                                    />
                                </div>
                                {errors.pic_phone && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.pic_phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Position{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.pic_position}
                                    onChange={(e) =>
                                        setData('pic_position', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                    placeholder="e.g. HR Manager / Director"
                                />
                                {errors.pic_position && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.pic_position}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-slate-700">
                                    Corporate Email
                                </label>
                                <div className="relative mt-1.5 rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.official_email}
                                        onChange={(e) =>
                                            setData(
                                                'official_email',
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pr-3.5 pl-10 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                        placeholder="hr@company.com"
                                    />
                                </div>
                                {errors.official_email && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.official_email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    City HQ
                                </label>
                                <div className="relative mt-1.5 rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) =>
                                            setData('city', e.target.value)
                                        }
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pr-3.5 pl-10 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                        placeholder="Taipei"
                                    />
                                </div>
                                {errors.city && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.city}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={(e) =>
                                        setData('country', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-100 px-3.5 py-2.5 text-slate-700 shadow-sm focus:outline-none sm:text-sm"
                                />
                                {errors.country && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.country}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Full Address
                            </label>
                            <textarea
                                value={data.hq_address}
                                onChange={(e) =>
                                    setData('hq_address', e.target.value)
                                }
                                rows={2}
                                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
                                placeholder="Street, Building No, Suite..."
                            />
                            {errors.hq_address && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.hq_address}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="border-t border-slate-200 pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-150 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? (
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span>Submitting Application...</span>
                                </div>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
