"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Pied de page de l'application
 * Contient les liens de navigation organisés et les crédits
 */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full flex flex-col justify-center items-center pt-12 sm:pt-15 pb-8 sm:pb-10 gap-8 sm:gap-10 bg-gray-900 border-t border-gray-800/50 px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-15 max-w-4xl w-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text tracking-wider uppercase drop-shadow-md">
            MDTB
          </h1>
        </Link>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 w-full justify-center lg:justify-start">
          {/* Section Films */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              {t.navigation.films}
            </h3>
            <ul className="flex flex-col gap-2 text-center sm:text-left">
              <li>
                <Link 
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors" 
                  href="/popular"
                >
                  {t.footer.links.popularMovies}
                </Link>
              </li>
              <li>
                <Link 
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors" 
                  href="/top"
                >
                  {t.footer.links.topMovies}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Séries */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              {t.navigation.series}
            </h3>
            <ul className="flex flex-col gap-2 text-center sm:text-left">
              <li>
                <Link 
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors" 
                  href="/series/popular"
                >
                  {t.footer.links.popularSeries}
                </Link>
              </li>
              <li>
                <Link 
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors" 
                  href="/series/top"
                >
                  {t.footer.links.topSeries}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Autres */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              {t.navigation.about}
            </h3>
            <ul className="flex flex-col gap-2 text-center sm:text-left">
              <li>
                <Link 
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors" 
                  href="/about"
                >
                  {t.footer.links.about}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Section copyright */}
      <div className="flex flex-col items-center gap-2 pt-6 border-t border-gray-800/50 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
          <p className="text-center">
            {t.footer.createdBy}
          </p>
          <span className="hidden sm:block text-gray-700">•</span>
          <p className="text-center">
            <a 
              href="https://github.com/rdnzda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors underline decoration-gray-600 hover:decoration-gray-400"
            >
              {t.footer.sourceCode}
            </a>
          </p>
        </div>
        <p className="text-xs text-gray-600 text-center">
          {t.footer.poweredBy}{" "}
          <a 
            href="https://www.themoviedb.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            The Movie Database (TMDB)
          </a>
        </p>
      </div>
    </footer>
  );
}
