import Link from "next/link"

export default function NavBar() {
    return (
        <header className="bg-gray-900 w-full fixed z-50 flex justify-center items-center">
            <nav className="flex flex-row gap-15 items-center bg-gray-900 min-h-1/12 pt-5 pb-5 w-[1160px]">
                <Link href='/'><h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text tracking-wider uppercase drop-shadow-md">MDTB</h1></Link>
                <ul className="flex flex-row font-semibold text-sm gap-5 items-center">
                    <Link className="hover:text-gray-300" href='/popular'>Populaire</Link>
                    <Link className="hover:text-gray-300" href='/top'>Top</Link>
                    <Link className="hover:text-gray-300" href='/about'>A Propos</Link>
                </ul>
            </nav>
        </header>   
    )
}