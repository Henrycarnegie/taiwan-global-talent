import InputText from '@/components/UI/InputText';

interface CompanyFieldsProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
}

export default function CompanyFields({
    data,
    setData,
    errors,
}: CompanyFieldsProps) {
    return (
        <div className="animate-in fade-in space-y-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4 duration-150">
            {/* Corporate Identity */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <InputText
                        label="Company Legal Name"
                        placeholder="As registered in corporate tax record"
                        value={data.company_legal_name}
                        onChange={(e: any) =>
                            setData('company_legal_name', e.target.value)
                        }
                    />
                    {errors.company_legal_name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.company_legal_name}
                        </p>
                    )}
                </div>
                <div>
                    <InputText
                        label="Company Display Brand Name"
                        placeholder="e.g., Asus International"
                        value={data.company_display_name}
                        onChange={(e: any) =>
                            setData('company_display_name', e.target.value)
                        }
                    />
                </div>
                <div>
                    <InputText
                        label="Tax ID / Unified Business Number"
                        placeholder="e.g., Tax Number Registration"
                        value={data.tax_id}
                        onChange={(e: any) => setData('tax_id', e.target.value)}
                    />
                </div>
                <div>
                    <InputText
                        label="Corporate Website URL"
                        placeholder="https://..."
                        value={data.website_url}
                        onChange={(e: any) =>
                            setData('website_url', e.target.value)
                        }
                    />
                </div>
            </div>

            {/* PIC Information Section */}
            <div className="border-t border-gray-200/60 pt-3">
                <span className="mb-3 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Authorized Person In Charge (PIC)
                </span>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <InputText
                            label="PIC Full Name"
                            value={data.pic_name}
                            onChange={(e: any) =>
                                setData('pic_name', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <InputText
                            label="PIC Corporate Position"
                            placeholder="e.g., HR Director"
                            value={data.pic_position}
                            onChange={(e: any) =>
                                setData('pic_position', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <InputText
                            label="PIC Contact Phone"
                            value={data.pic_phone}
                            onChange={(e: any) =>
                                setData('pic_phone', e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
