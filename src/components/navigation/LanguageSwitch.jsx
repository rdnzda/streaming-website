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
 * Sélecteur de langue avec menu déroulant moderne et responsive
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

  // Fermer avec Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleLanguageSelect = (langCode) => {
    switchLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-600/50 rounded-xl hover:from-gray-700/90 hover:to-gray-600/90 hover:border-blue-500/50 transition-all duration-300 text-white shadow-lg hover:shadow-blue-500/20 min-w-[60px] sm:min-w-[120px] px-3 py-2.5"
        aria-label="Changer de langue"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl select-none transition-transform duration-200 pb-1 group-hover:scale-110">
            {currentLanguage.flag}
          </span>
          <span className="hidden sm:block text-sm font-medium truncate">
            {currentLanguage.name}
          </span>
        </div>
        
        <svg
          className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-blue-400' : 'group-hover:text-white'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <>
          {/* Overlay pour mobile */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] sm:hidden" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full right-0 mt-2 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl overflow-hidden min-w-[200px] sm:min-w-[220px] z-[80] animate-in slide-in-from-top-2 duration-200">
            {/* Header du menu */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-gray-600/30">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Choisir une langue
              </h3>
            </div>

            {/* Liste des langues */}
            <div className="py-2">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-200 text-sm group relative ${
                    language === lang.code 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border-l-4 border-blue-400' 
                      : 'text-gray-200 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-xl select-none transition-transform duration-200 group-hover:scale-110">
                    {lang.flag}
                  </span>
                  <div className="flex-1">
                    <span className="font-medium block">{lang.name}</span>
                    <span className="text-xs text-gray-400">{lang.code.toUpperCase()}</span>
                  </div>
                  
                  {language === lang.code && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  {/* Effet de survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                </button>
              ))}
            </div>

            {/* Footer avec info */}
            <div className="px-4 py-2 bg-gray-700/30 border-t border-gray-600/30">
              <p className="text-xs text-gray-400 text-center">
                Interface disponible en {languages.length} langues
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
