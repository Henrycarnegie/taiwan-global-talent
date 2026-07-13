import { Loader2Icon } from 'lucide-react';

interface DownloadProgressBarProps {
    isOpen: boolean;
    courseTitle: string;
}

export default function DownloadProgressBar({ isOpen, courseTitle }: DownloadProgressBarProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl border border-gray-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header Info */}
                <div className="space-y-2 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 animate-pulse">
                        <Loader2Icon size={24} className="animate-spin" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Generating Certificate</h3>
                    <p className="text-xs text-gray-500 px-4 line-clamp-2">
                        Please Wait, System is processing your certificate for course <span className="font-semibold text-gray-700">"{courseTitle}"</span>.
                    </p>
                </div>

                {/* Indikator Progress */}
                <div className="space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 relative">
                        {/* Animasi progress bar berulang (Infinite Shimmer) karena Fetch API tipe Stream tidak mengembalikan Content-Length absolut */}
                        <div className="h-full rounded-full bg-emerald-600 animate-infinite-loading w-1/2 absolute left-0"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-medium text-gray-400">
                        <span>Connecting to System...</span>
                        <span className="animate-pulse">Processing PDF</span>
                    </div>
                </div>

                {/* Catatan Pengaman */}
                <div className="rounded-xl bg-amber-50/70 p-3 border border-amber-100/50">
                    <p className="text-[11px] leading-relaxed text-amber-700 text-center">
                        ⚠️ Please don't close or refresh this page.
                    </p>
                </div>

            </div>
        </div>
    );
}