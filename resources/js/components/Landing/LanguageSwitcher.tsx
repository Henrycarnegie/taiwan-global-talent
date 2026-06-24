import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();

    return (
        <div className="flex gap-2 text-sm">
            {(['en', 'id', 'zh'] as const).map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full border px-3 py-1 transition ${
                        lang === l
                            ? 'border-[#E60012] bg-[#E60012] text-white'
                            : 'bg-white hover:bg-black/5'
                    }`}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
