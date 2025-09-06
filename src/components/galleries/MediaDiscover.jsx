"use client";

import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { HomeSearchBar } from "../forms";

export default function MediaDiscover() {
    const { t } = useLanguage();
    const [showingSuggestions, setShowingSuggestions] = useState(false);

    const handleSuggestionsChange = (isShowing) => {
        console.log("MediaDiscover: suggestions changed to", isShowing);
        setShowingSuggestions(isShowing);
    };

    return (
        <section className={`
            relative w-full
            transition-all duration-500 ease-in-out
            min-h-fit
        `}>
            {/* Gradient de fond */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700" />
            {/* Overlay pour améliorer le contraste si besoin */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.10),transparent_60%)]" />
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />

            <div className="relative mx-auto w-full sm:max-w-[1200px] flex flex-col pt-14 sm:pt-16 md:pt-20 px-4 sm:px-6 md:px-8 gap-8 sm:gap-10">
                <header className="space-y-3 text-justify px-4 sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                        {t.home.welcome}
                    </h1>
                        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                        {t.home.subtitle}
                    </h2>
                </header>
                <div className={`
                    transition-all duration-500 ease-in-out
                    ${showingSuggestions ? 'pb-[455px]' : 'pb-16 md:pb-5'}
                `}>
                    <HomeSearchBar variant="light" onSuggestionsChange={handleSuggestionsChange} />
                </div>
            </div>
        </section>
    );
}