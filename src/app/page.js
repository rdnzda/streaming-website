import { Footer, NavBar, TrendingGallery, MediaDiscover, RecentTrailersGallery } from "../components";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen">
      <NavBar />
      <main className="w-full pt-[76px]">
        <MediaDiscover />
        <TrendingGallery />
        <RecentTrailersGallery include="both" />
      </main>
      <Footer />
    </div>
  );
}