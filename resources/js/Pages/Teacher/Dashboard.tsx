// TeacherDashboard.tsx
import { Users, BookOpen, Clock, BarChart3, Bell } from "lucide-react"; // Menggunakan lucide-react untuk ikon
import MetricCard from "@/components/UI/MetricCard";

// Simulasi diagram donat sederhana menggunakan SVG
const SimpleDoughnut = () => (
  <svg viewBox="0 0 36 36" className="w-full h-full text-blue-500">
    <path className="text-gray-200" fill="none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
    <path fill="none" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
  </svg>
);

export default function TeacherDashboard() {
  const students = [
    { name: "Bima", class: "Kelas 10A", status: "Sudah Kumpul", grade: 85, avatar: "👨‍🎓" },
    { name: "Sari", class: "Kelas 9C", status: "Belum Kumpul", grade: 92, avatar: "👩‍🎓" },
    { name: "Reno", class: "Kelas 9C", status: "Belum Kumpul", grade: 92, avatar: "👨‍🎓" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Bagian Kiri */}
      <aside className="w-64 bg-white p-6 flex flex-col border-r border-gray-100">
        <div className="flex items-center gap-3 mb-10">
          <img src="/avatar-placeholder.png" alt="Teacher Avatar" className="w-12 h-12 rounded-full border-2 border-blue-100" />
          <div>
            <p className="font-bold text-gray-900">Nama Guru</p>
            <p className="text-sm text-gray-500">Guru</p>
          </div>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-xl">
            <BookOpen className="w-5 h-5" /> Kelas
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-xl">
            <Users className="w-5 h-5" /> Siswa
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-xl">
            <Clock className="w-5 h-5" /> Tugas
          </a>
        </nav>
      </aside>

      {/* Konten Utama - Bagian Kanan */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-950">Dashboard Guru</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-500" />
            <p className="text-sm text-gray-500">00:08</p>
          </div>
        </header>

        {/* Metrik Utama Berwarna */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricCard title="Total Siswa" value="120" graph={<SimpleDoughnut />} className="border-blue-100 bg-blue-50/50" />
          <MetricCard title="Jumlah Kelas" value="5" icon={<BookOpen className="w-8 h-8" />} className="border-green-100 bg-green-50/50" />
          <MetricCard title="Tugas Pending" value="12" icon={<Clock className="w-8 h-8 text-orange-600" />} className="border-orange-100 bg-orange-50/50" />
        </div>

        {/* Daftar Siswa dan Status */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Data Siswa</h2>
          <div className="space-y-4">
            {students.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{student.avatar}</span>
                  <div>
                    <p className="font-bold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.class}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-semibold ${student.status === 'Sudah Kumpul' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {student.status}
                </div>
                <p className="text-xl font-bold text-gray-900">{student.grade}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}