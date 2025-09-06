"use client";

import { Footer, NavBar } from "../../components";
import { useLanguage } from "../../contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen">
      <NavBar />
      <main className="pt-[76px] w-full">
        {/* Section principale simple et moderne */}
        <section className="w-full py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5">
            {/* En-tête centré */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
                {t.about.title}
              </h1>
              <p className="text-xl md:text-2xl text-white font-medium mb-12 max-w-3xl mx-auto">
                {t.about.subtitle}
              </p>
              
              {/* Mission intégrée de façon moderne */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {t.about.mission.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.about.mission.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - redesign moderne */}
        <section className="w-full py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              {t.about.features.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {t.about.features.items.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="w-6 h-6 bg-white rounded-full opacity-90" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology & Team Section - fusionnées et simplifiées */}
        <section className="w-full py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-12">
              {t.about.technology.title}
            </h2>
            <p className="text-lg md:text-xl text-white mb-12 leading-relaxed">
              {t.about.technology.description}
            </p>
            
            {/* TMDB Badge moderne */}
            <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg mb-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">TMDB</span>
                </div>
                <span className="font-semibold">The Movie Database</span>
              </div>
            </div>

            {/* Section équipe simplifiée */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t.about.team.title}
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t.about.team.description}
              </p>
              
              <a 
                href="#" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span className="font-semibold">Découvrez notre travail</span>
                <span className="opacity-75">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}