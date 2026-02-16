import Link from "next/link";



export default function Navbar(){
    return(
        <nav className=" w-full bg-white-600 h-20 shadow-lg  sticky bg-red-600 px-5">
            <div className=" container m-auto py-7 flex justify-between items-center m-a"> 
                <div>
                    <Link href={"/"} className="font-bold text-2xl text-white">Authentification</Link>
                </div>
                <div className="flex ">
                <ul className="flex gap-10">
                <Link className="font-semibold text-white hover:underline" href="/register">Inscription</Link>
                <Link className="font-semibold text-white hover:underline" href="/login">Connection</Link>
                 </ul>
                </div>
            </div>
        </nav>
    )
}