import Layout from '../Layout';

export default function Community() {
    const threads = [
        {
            id: 1,
            tag: 'Beasiswa & Birokrasi',
            title: 'Tips perpanjangan ARC (Alien Resident Certificate) terbaru tahun 2026 di Taipei',
            author: 'Budi Santoso (NTUST)',
            replies: 14,
            views: 124,
            time: '2 jam yang lalu',
        },
        {
            id: 2,
            tag: 'Info Magang',
            title: 'Mencari rekan tim untuk program kompetisi inovasi digital dari ASUS Taiwan, kuota sisa 2 orang',
            author: 'Siti Rahma (NTU)',
            replies: 8,
            views: 95,
            time: '5 jam yang lalu',
        },
        {
            id: 3,
            tag: 'Kehidupan di Taiwan',
            title: 'Rekomendasi toko makanan Indonesia atau restoran ramah muslim di daerah Hsinchu?',
            author: 'Kevin Kevin (NTHU)',
            replies: 32,
            views: 310,
            time: '1 hari yang lalu',
        },
    ];

    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Kolom Kiri: Daftar Thread Utama (3/4 Lebar) */}
                <div className="space-y-4 lg:col-span-3">
                    {/* Kontrol Forum */}
                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex gap-2">
                            <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
                                Terbaru
                            </button>
                            <button className="rounded-lg border bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                                Populer
                            </button>
                        </div>
                        <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
                            + Buat Diskusi Baru
                        </button>
                    </div>

                    {/* List Diskusi */}
                    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {threads.map((thread) => (
                            <div
                                key={thread.id}
                                className="cursor-pointer space-y-3 p-5 transition hover:bg-gray-50/50"
                            >
                                <div>
                                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                                        {thread.tag}
                                    </span>
                                </div>
                                <h4 className="text-base font-semibold text-gray-900 transition hover:text-blue-600">
                                    {thread.title}
                                </h4>
                                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-600">
                                            {thread.author}
                                        </span>
                                        <span>•</span>
                                        <span>{thread.time}</span>
                                    </div>
                                    <div className="flex items-center gap-4 font-medium">
                                        <span className="flex items-center gap-1">
                                            💬 {thread.replies} Balasan
                                        </span>
                                        <span className="flex items-center gap-1">
                                            👁️ {thread.views} Dilihat
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kolom Kanan: Widget Samping (1/4 Lebar - Eksklusif setelah sidebar dihapus) */}
                <div className="space-y-4">
                    {/* Aturan Komunitas */}
                    <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900">
                            Aturan Forum 📜
                        </h3>
                        <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-gray-500">
                            <li>
                                Saling menghormati sesama anggota komunitas
                                bakat digital.
                            </li>
                            <li>
                                Dilarang menyebarkan lowongan atau informasi
                                palsu (hoax).
                            </li>
                            <li>
                                Gunakan tag yang sesuai agar diskusi mudah
                                dicari oleh mahasiswa lain.
                            </li>
                        </ul>
                    </div>

                    {/* Tag Populer */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-sm font-bold text-gray-900">
                            Kategori Populer
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
            </div>
        </Layout>
    );
}
