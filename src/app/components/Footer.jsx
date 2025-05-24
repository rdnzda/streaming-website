import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full flex flex-col justify-center items-center pt-15 pb-10 gap-10 bg-gray-900">
            <div className="flex flex-row items-center gap-15">
                <Link href='/'><h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text tracking-wider uppercase drop-shadow-md">MDTB</h1></Link>
                <div>
                    <ul className="flex flex-row gap-7 font-semibold text-sm items-start">
                        <Link className="hover:text-gray-300" href='/popular'>Populaire</Link>
                        <Link className="hover:text-gray-300" href='/top'>Top</Link>
                        <Link className="hover:text-gray-300" href='/about'>A Propos</Link>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center gap-0.5">
                <h6 className="text-xs text-neutral-500">Site crée par @rdnzda</h6>
                <h6 className="text-xs text-neutral-500">Code présent sur GitHub</h6>
            </div>
        </footer>
    )
}