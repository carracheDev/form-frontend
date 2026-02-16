// pages/profile.js
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        router.push('/auth/login');
        return;
      }

      const response = await fetch('http://localhost:3001/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push('/auth/login');
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
