"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTrendingSeries } from "../../services/api";
import { Spinner } from "../ui";
import { LittleMediaCard } from "../cards";
import SimpleBar from "simplebar-react";

export default function TrendingSeriesGallery({ timeWindow = "day" }) {
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadTrendingSeries = async () => {
      try {
        setLoading(true);
        const series = await getTrendingSeries(timeWindow);
        setTrendingSeries(series);
      } catch (err) {
        setError(t.errors.loadSeries);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingSeries();
  }, [timeWindow]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full max-w-[1160px] m-auto mb-4 px-4 sm:px-8">
          <h4 className="font-medium text-base sm:text-lg text-gray-700">{t.navigation.series}</h4>
        </div>
        <div className="max-w-[1160px] m-auto flex items-center justify-center min-h-[220px] px-4 sm:px-8">
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <Spinner size={20} className="border-2" /> {t.loading.series}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="w-full max-w-[1160px] m-auto mb-4 px-4 sm:px-8">
          <h4 className="font-medium text-base sm:text-lg text-gray-700">{t.navigation.series}</h4>
        </div>
        <div className="max-w-[1160px] m-auto flex items-center justify-center min-h-[220px] px-4 sm:px-8">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-[1160px] m-auto mb-4 px-4 sm:px-8">
        <h4 className="font-medium text-base sm:text-lg text-gray-700">{t.navigation.series}</h4>
      </div>
      <div className="max-w-[1160px] m-auto flex content-center px-4 sm:px-8">
        <SimpleBar autoHide={false} className="w-full">
          <div className="flex gap-4 sm:gap-6 pb-2">
            {trendingSeries.map((series) => (
              <LittleMediaCard 
                key={`series-${series.id}`} 
                media={series} 
                mediaType="tv"
              />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
