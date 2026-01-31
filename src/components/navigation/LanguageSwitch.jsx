"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from "lucide-react";

const languages = [
  { code: 'fr', name: 'Français', short: 'FR' },
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'es', name: 'Español', short: 'ES' }
];

/**
 * Sélecteur de langue compact et moderne
 */
export default function LanguageSwitch() {
  const { language, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSelect = (code) => {
    switchLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer de langue"
        aria-expanded={isOpen}
        className="
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-gray-800/60 hover:bg-gray-700/80
          border border-gray-600/40 hover:border-gray-500/60
          text-gray-200 hover:text-white
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
        "
      >
        <Globe className="w-4 h-4 text-blue-400/90 flex-shrink-0" />
        <span className="text-sm font-medium tabular-nums">{currentLanguage.short}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[69] sm:block sm:bg-transparent"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="
              absolute top-full right-0 mt-2 z-[70]
              w-44 rounded-xl
              bg-gray-800 border border-gray-600/50
              shadow-xl shadow-black/30
              py-1.5
              transition-all duration-150 origin-top-right
            "
            role="listbox"
            aria-label="Langues disponibles"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={language === lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm
                  transition-colors duration-150
                  ${language === lang.code
                    ? 'bg-blue-600/20 text-white'
                    : 'text-gray-300 hover:bg-gray-700/80 hover:text-white'
                  }
                `}
              >
                <span className={`
                  w-6 text-center text-xs font-semibold tabular-nums
                  ${language === lang.code ? 'text-blue-400' : 'text-gray-500'}
                `}>
                  {lang.short}
                </span>
                <span className="flex-1 font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
