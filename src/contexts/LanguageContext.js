"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import fr from '../locales/fr';
import en from '../locales/en';
import es from '../locales/es';

const LanguageContext = createContext();

export const translations = {
  fr,
  en,
  es
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr');
  const [t, setT] = useState(fr);

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setT(translations[savedLanguage]);
    }
  }, []);

  // Sauvegarder dans localStorage quand la langue change
  useEffect(() => {
    localStorage.setItem('language', language);
    setT(translations[language]);
  }, [language]);

  const switchLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
