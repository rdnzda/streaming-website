"use client";

/**
 * Composant de chargement réutilisable
 * Fournit différents types de loaders : spinner, skeleton, inline
 */

// Spinner de base
export function Spinner({ size = 32, className = "" }) {
  return (
    <div
      className={`relative inline-block animate-spin rounded-full border-[3px] border-gray-600 border-t-blue-500 ${className}`}
      style={{ width: size, height: size }}
      aria-label="Chargement"
    />
  );
}

// Grille de skeleton pour les cartes
export function SkeletonGrid({ count = 10 }) {
  return (
    <div className="grid grid-cols-5 gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="group relative flex flex-col gap-3 w-full max-w-[200px]"
        >
          <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 relative">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_60%)] animate-[shimmer_1.8s_infinite]" />
          </div>
          <div className="h-4 w-3/4 rounded bg-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_60%)] animate-[shimmer_1.8s_infinite]" />
          </div>
          <div className="h-3 w-1/2 rounded bg-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_60%)] animate-[shimmer_1.8s_infinite]" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Loader inline avec texte
export function InlineLoader({ loading, children }) {
  if (!loading) return children;
  return (
    <div className="flex items-center gap-3 text-sm text-gray-400">
      <Spinner size={18} />
      <span>Chargement…</span>
    </div>
  );
}

// Loader principal de page
export default function Loader() {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-16">
      <Spinner size={48} className="border-[4px]" />
      <p className="text-gray-400 text-sm tracking-wide uppercase">Chargement…</p>
      <style jsx global>{`
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(100%); } 
        }
      `}</style>
    </div>
  );
}
