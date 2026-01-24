"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ng';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    translate: (en: string, ng: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'ng' : 'en'));
    };

    const translate = (en: string, ng: string) => {
        return language === 'ng' ? ng : en;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
