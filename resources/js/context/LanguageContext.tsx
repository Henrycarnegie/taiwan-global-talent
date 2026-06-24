import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'id' | 'zh';

type LanguageContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        if (typeof window === 'undefined') {
            return 'en';
        }

        const stored = localStorage.getItem('lang') as Lang | null;

        return stored ?? 'en';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }

    return context;
}