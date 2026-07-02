import Card from '@/components/UI/Card';

interface DashboardOverviewProps {
  onNavigateToCommunity: () => void;
}

export default function DashboardOverview({ onNavigateToCommunity }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-slate-900 to-blue-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="bg-blue-500/30 text-blue-200 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-400/20">
            Welcome Back • 歡迎回來
          </span>
          <h2 className="text-2xl font-bold mt-3 mb-1">
            Ready to Build Your Career in Taiwan?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Lengkapi profil Anda untuk membuka peluang magang, kerja, dan program inkubasi digital langsung dari perusahaan teknologi terkemuka di Taiwan.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Profile Completion" subTitle="檔案完整度" value="70%" badge="Action Required" badgeColor="bg-amber-100 text-amber-800" />
        <Card title="Mandarin Level" subTitle="華語能力" value="TOCFL A2" badge="Active Course" badgeColor="bg-blue-100 text-blue-800" />
        <Card title="Active Applications" subTitle="投遞進度" value="3" footerText="Perusahaan Taiwan" />
        <Card title="Certificates" subTitle="證書" value="2" footerText="Verified" />
      </div>

      {/* Baris Pengumuman & Forum Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Berita / Announcement */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-3 flex justify-between items-center">
            <span>Latest Announcement</span>
            <span className="text-xs font-normal text-gray-400">Updated today</span>
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <p className="text-xs text-blue-600 font-semibold mb-1">Taiwan Tech Career Fair 2026</p>
              <p className="text-sm font-medium text-gray-800">Registrasi kuota khusus talent internasional resmi dibuka minggu ini.</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <p className="text-xs text-green-600 font-semibold mb-1">Mandarin Center</p>
              <p className="text-sm font-medium text-gray-800">Ujian simulasi (Mock Test) TOCFL gratis tersedia di tab Mandarin Courses.</p>
            </div>
          </div>
        </div>

        {/* Kolom Komunitas Teaser */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Community Activity</h3>
            <p className="text-xs text-gray-400 mb-4">Interaksi hangat sesama mahasiswa di Taiwan</p>
            <div className="space-y-3 text-sm">
              <p className="text-gray-600">💬 <span className="font-medium text-gray-800">"Ada yang tahu info beasiswa MOE terbaru?"</span></p>
              <p className="text-gray-600">💬 <span className="font-medium text-gray-800">"Sharing pengalaman magang di Hsinchu..."</span></p>
            </div>
          </div>
          <button 
            onClick={onNavigateToCommunity}
            className="w-full mt-4 text-center text-xs font-semibold text-blue-600 hover:text-blue-700 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            Buka Forum Diskusi &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}