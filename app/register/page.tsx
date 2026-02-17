"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://form-backend-production-aeca.up.railway.app/api';

export default function RegisterPage(){
    const [email, setEmail]= useState('');
    const [name, setName]= useState('');
    const [password, setPassword] = useState('')
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password }),
        });

        if (response.ok) {
            router.push('/login');
        }
    }
    return(
         <main className="container m-auto my-72">
            <div className="text-center">
                <h1 className="font-bold text-lg text-red-600">Inscription</h1>
            </div>
        <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-5">
            <label htmlFor="email" className="text-md md:text-lg font-semibold text-red-500">Email: </label>
            <Input
            placeholder="Entrez votre mail..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <label htmlFor="name" className="text-md md:text-lg font-semibold text-red-500">Nom: </label>
            <Input
            placeholder="Entrez votre nom..."
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            ></Input>
            <label htmlFor="password" className="text-md md:text-lg font-semibold text-red-500">Mot de passe: </label>
            <Input
            placeholder="Mot de passe..."
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            ></Input>
                <div className="flex items-center gap-4 justify-end">
                            <Button variant="outline" className="text-red-600 border border-red-500 text-md font-semibold md:text-lg hover:bg-red-800 hover:text-white" type="submit">S'inscrire</Button>
                            <Link href={"/login"}>                             
                            <Button className="bg-red-500 font-semibold text-lg hover:outline hover:bg-white hover:text-red-600 hover:border-red-400 hover:border-2">se connecter</Button>
                            </Link>
            </div>
        </form>
        </div>
         </main>
    )
}