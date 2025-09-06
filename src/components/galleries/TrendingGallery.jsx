"use client";

import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { ToggleButton } from "../ui";
import TrendingMoviesGallery from "./TrendingMoviesGallery";
import TrendingSeriesGallery from "./TrendingSeriesGallery";

/**
 * Galerie principale des tendances
 * Combine films et séries avec sélecteur jour/semaine
 */
export default function TrendingGallery() {
  const [timeWindow, setTimeWindow] = useState("day"); // "day" ou "week"
  const { t } = useLanguage();

  return (
    <div className="w-full m-auto pt-8 flex flex-col gap-8 bg-white text-black">
      {/* En-tête avec titre et toggle */}
      <div className="w-full sm:max-w-[1200px] m-auto px-4 sm:px-8 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
        <h3 className="font-semibold text-xl sm:text-2xl tracking-tight">
          {t.home.trending}
        </h3>
        <ToggleButton selected={timeWindow} onSelect={setTimeWindow} />
      </div>

      {/* Galeries de contenu */}
      <div className="flex flex-col gap-8">
        {/* Section Films */}
        <TrendingMoviesGallery timeWindow={timeWindow} />
        
        {/* Section Séries */}
        <TrendingSeriesGallery timeWindow={timeWindow} />
      </div>
    </div>
  );
}
