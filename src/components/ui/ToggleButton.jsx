"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Bouton toggle avec animation glissante
 * Utilisé pour basculer entre "Aujourd'hui" et "Cette semaine"
 */
export default function ToggleButton({ selected, onSelect }) {
  const { t } = useLanguage();
  const todayRef = useRef(null);
  const weekRef = useRef(null);
  const [dimensions, setDimensions] = useState({ todayWidth: 130, weekWidth: 150 });

  // Mesurer les largeurs réelles des boutons après le rendu
  useEffect(() => {
    const measureDimensions = () => {
      if (todayRef.current && weekRef.current) {
        const todayWidth = todayRef.current.offsetWidth;
        const weekWidth = weekRef.current.offsetWidth;
        setDimensions({ todayWidth, weekWidth });
      }
    };

    // Petit délai pour s'assurer que le rendu est terminé
    const timer = setTimeout(measureDimensions, 50);
    
    return () => clearTimeout(timer);
  }, [t.actions.today, t.actions.thisWeek]); // Re-mesurer quand les textes changent

  return (
    <div className="relative flex border border-black rounded-full overflow-hidden w-fit text-md bg-white">
      {/* Indicateur de sélection animé qui glisse */}
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 bg-gray-900 z-10"
        style={{
          width: selected === "week" ? `${dimensions.weekWidth}px` : `${dimensions.todayWidth}px`,
          transform: selected === "week" ? `translateX(${dimensions.todayWidth}px)` : "translateX(0px)"
        }}
      />

      {/* Bouton Today/Aujourd'hui */}
      <button
        ref={todayRef}
        onClick={() => onSelect("day")}
        className={`flex items-center px-5 py-1 font-semibold relative z-10 transition-colors duration-300 whitespace-nowrap ${
          selected === "day" 
            ? "bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text" 
            : "text-black"
        }`}
        aria-pressed={selected === "day"}
      >
        {t.actions.today}
      </button>

      {/* Bouton Week/Semaine */}
      <button
        ref={weekRef}
        onClick={() => onSelect("week")}
        className={`flex items-center px-5 py-1 font-semibold relative z-10 transition-colors duration-300 whitespace-nowrap ${
          selected === "week" 
            ? "bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text" 
            : "text-black"
        }`}
        aria-pressed={selected === "week"}
      >
        {t.actions.thisWeek}
      </button>
    </div>
  );
}
