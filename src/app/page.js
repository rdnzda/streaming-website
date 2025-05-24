import Footer from "./components/Footer";
import MediaDiscover from "./components/MediaDiscover";
import NavBar from "./components/NavBar";
import TrendingGallery from "./components/TrendingGallery";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen">
        <NavBar/>
        <main className="pt-[76px] w-full">
          <MediaDiscover/>
          <TrendingGallery/>
        </main>
        <Footer/>
      </div>
  )
}