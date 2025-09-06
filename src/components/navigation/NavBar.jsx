"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaHome, FaFilm, FaTv, FaInfoCircle } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

/**
 * Barre de navigation principale responsive
 * Contient le logo, les menus déroulants et le sélecteur de langue
 * Avec menu hamburger pour mobile
 */
export default function NavBar() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-md w-full fixed z-[60] flex justify-center items-center border-b border-gray-800/30 shadow-lg">
      <nav className="flex flex-row items-center justify-between bg-transparent min-h-[76px] px-4 sm:px-8 w-full sm:max-w-[1200px]">
        {/* Logo original */}
        <Link href="/" className="group flex items-center ml-3" onClick={closeMobileMenu}>
          <h1 className="text-2xl mt-2 sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text tracking-wider uppercase drop-shadow-md group-hover:scale-105 transition-transform duration-300">
            MDTB
          </h1>
        </Link>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex flex-row font-medium text-sm gap-8 items-center">
            {/* Menu Films */}
            <li className="relative group">
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 py-2">
                <span>{t.navigation.films}</span>
                <FaChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[140px] z-[70] overflow-hidden">
                <div className="py-2">
                  <Link 
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200" 
                    href="/popular"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t.navigation.popular}</span>
                  </Link>
                  <Link 
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200" 
                    href="/top"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>{t.navigation.topRated}</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Menu Séries */}
            <li className="relative group">
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 py-2">
                <span>{t.navigation.series}</span>
                <FaChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[140px] z-[70] overflow-hidden">
                <div className="py-2">
                  <Link 
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200" 
                    href="/series/popular"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t.navigation.popular}</span>
                  </Link>
                  <Link 
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200" 
                    href="/series/top"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>{t.navigation.topRatedFeminine}</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Lien À Propos moderne */}
            <Link 
              className="text-gray-300 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50" 
              href="/about"
            >
              {t.navigation.about}
            </Link>
          </ul>

          {/* Sélecteur de langue avec design moderne */}
          <div className="pl-4 border-l border-gray-700/50">
            <LanguageSwitch />
          </div>
        </div>

        {/* Bouton menu mobile */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Menu mobile overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Menu mobile */}
        <div className={`fixed top-[76px] right-0 h-[calc(100vh-76px)] w-80 max-w-[80vw] bg-gray-900/98 backdrop-blur-xl border-l border-gray-800/50 shadow-2xl transform transition-transform duration-300 ease-in-out z-[80] lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header mobile */}
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <LanguageSwitch />
              </div>
            </div>

            {/* Contenu mobile */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-6">
                {/* Accueil */}
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-gray-800/50"
                >
                  <span className="font-medium">Accueil</span>
                </Link>

                {/* Films */}
                <div>
                  <button
                    onClick={() => toggleDropdown('films')}
                    className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-gray-800/50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{t.navigation.films}</span>
                    </div>
                    <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === 'films' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {openDropdown === 'films' && (
                    <div className="mt-2 ml-8 space-y-2">
                      <Link
                        href="/popular"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/30"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{t.navigation.popular}</span>
                      </Link>
                      <Link
                        href="/top"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/30"
                      >
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>{t.navigation.topRated}</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Séries */}
                <div>
                  <button
                    onClick={() => toggleDropdown('series')}
                    className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-gray-800/50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{t.navigation.series}</span>
                    </div>
                    <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === 'series' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {openDropdown === 'series' && (
                    <div className="mt-2 ml-8 space-y-2">
                      <Link
                        href="/series/popular"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/30"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{t.navigation.popular}</span>
                      </Link>
                      <Link
                        href="/series/top"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/30"
                      >
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>{t.navigation.topRatedFeminine}</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* À Propos */}
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-gray-800/50"
                >
                  <span className="font-medium">{t.navigation.about}</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
