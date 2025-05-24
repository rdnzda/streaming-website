import HomeSearchBar from "./HomeSearchBar";

export default function MediaDiscover() {
    return (
        <div className="min-h-[3rem] bg-gradient-to-r from-blue-400 to-blue-600 w-full">
            <div className="w-[1160px] m-auto flex flex-col py-20 gap-10">
                <div className="welcome-text">
                    <h2 className="text-4xl font-bold">Bienvenue.</h2>
                    <h3 className="text-3xl font-semibold">Des millions de films à découvrir. Explorez maintenant.</h3>
                </div>
                <HomeSearchBar/>
            </div>
        </div>
    )
}