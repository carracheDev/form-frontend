"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"





export default function Login(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    // état pour les erreurs de soumission ou de validation
    const [error, setError] = useState<string | null>(null);

    const router= useRouter();

    const handlSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault();

        // validation côté client simple
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response= await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            if(response.ok){
                const {access_token}=await response.json();
                localStorage.setItem('token', access_token);
                router.push('/profile');
            } else {
                // récupération du message d'erreur renvoyé par l'API
                const data = await response.json();
                setError(data.message || 'Erreur lors de la connexion.');
            }
        } catch (e) {
            console.error(e);
            setError('Impossible de contacter le serveur.');
        }

    };
    return(
        <main className="container m-auto my-72">
            <div className="text-center">
                <h1 className="font-bold text-lg text-red-600">Connexion</h1>
            </div>
            {/* affichage conditionnel du message d'erreur */}
            {error && (
                <p className="text-center text-red-600  mb-4">
                    {error}
                </p>
            )}
            <div className="">
        <form onSubmit={handlSubmit} className="flex flex-col gap-3 p-5">
            <label htmlFor="email" className="text-md md:text-lg font-semibold text-red-500">Email: </label>
            <Input
            placeholder="email..."
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            ></Input>
            <label htmlFor="password" className="text-md md:text-lg font-semibold text-red-500">Mot de passe: </label>
            <Input
            placeholder='mot de pass...'
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            ></Input>
                            <div className="flex items-center gap-4 justify-end">
                            <Button variant="outline" className="text-red-600 border border-red-500 text-md font-semibold md:text-lg hover:bg-red-800 hover:text-white" type="submit">se connecter</Button>
                             <Link href={"/register"}>
                             <Button className="bg-red-500 font-semibold text-lg hover:outline hover:bg-white hover:text-red-600 hover:border-red-400 hover:border-2">S'inscrire</Button>
                             </Link>
            </div>        </form>
        </div>
        </main>
    )
}