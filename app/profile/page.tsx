"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://form-backend-production-aeca.up.railway.app/api';

interface User {
    userId: number;
    email:string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push('/login');
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Chargement...</div>;

  return (
   <main className='container'>
     <div className=' m-auto text-center my-24'>
      <div className=' flex flex-col gap-3'>
      <h1 className='text-lg md:text-xl font-bold text-red-600'>Profil</h1>
      <p><span className='text-red-500 font-semibold'>Email:</span> {user.email}</p>
      <p><span className='font-semibold text-red-500'>ID:</span> {user.userId}</p>
    </div></div>
   </main>
  );
}