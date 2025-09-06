"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from '../../contexts/LanguageContext';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸'
  }
];

/**
 * Sélecteur de langue avec menu déroulant
 * Affiche le drapeau et permet de changer la langue de l'interface
 */
export default function LanguageSwitch() {
  const { language, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode) => {
    switchLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 bg-gray-800/60 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 text-gray-200 text-sm font-medium min-w-[50px] gap-3 backdrop-blur-sm"
        aria-label="Changer de langue"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg select-none">{currentLanguage.flag}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[160px] z-[80]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700/70 transition-colors text-sm ${
                language === lang.code 
                  ? 'bg-gray-700/70 text-blue-400 border-l-2 border-blue-400' 
                  : 'text-gray-200'
              }`}
            >
              <span className="text-lg select-none">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && (
                <svg className="w-4 h-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
