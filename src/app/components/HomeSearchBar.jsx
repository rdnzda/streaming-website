"use client";

import { useState } from "react";

export default function HomeSearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="top-[76px] rounded-3xl flex flex-col items-center w-full bg-white z-50">
        <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl flex flex-row overflow-hidden w-[1160px] items-center">
            <input
            type="text"
            placeholder="Rechercher des films..."
            className="search-input pl-5 outline-none italic text-black w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-gradient-to-r from-blue-500 to-blue-300 h-full py-3 pl-6 pr-6 rounded-3xl cursor-pointer">Search</button>
        </form>
        </div>
    )
}