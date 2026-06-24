interface CardProps {
  title: string;
  subTitle?: string; // Teks kecil di bawah judul (misal: Bahasa Mandarin)
  value: string | number;
  footerText?: string; // Deskripsi di bagian paling bawah
  badge?: string;
  badgeColor?: string;
}

export default function Card({ title, subTitle, value, footerText, badge, badgeColor = 'bg-gray-100 text-gray-800' }: CardProps) {
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
            {subTitle && <p className="text-[11px] text-gray-400 font-medium -mt-0.5">{subTitle}</p>}
          </div>
          {badge && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-3xl font-extrabold text-gray-900 mt-4 tracking-tight">{value}</p>
      </div>
      {footerText && <p className="text-xs text-gray-400 mt-2 font-medium">{footerText}</p>}
    </div>
  );
}