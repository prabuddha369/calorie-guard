'use client'
import React from 'react'
import { Rajdhani } from "next/font/google";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500"] });
const page = () => {
  const router = useRouter()
  return (
    <div className={`px-4 flex items-center justify-center w-full h-screen ${rajdhani.className} gap-10 text-4xl flex-col bg-[#F8F8FF]`}>
    <Image
      src='/logo.png'
      height={100}
      width={150}
      className='p-2 rounded-3xl shadow-xl bg-[#FAF9F6]'
    />
        Coming Soon on 
        <Image
          src="/playstore.png"
          height={5} width={150} 
        />
        <p>
          For early access sign up for our <strong>Beta Test Programme</strong>
        </p>
        <Link href='https://forms.gle/RdZBWhehhhK2vQHc6' target='_blank' onClick={()=>router.push('/')}>
        <Button className='bg-[#0d0d0d] text-3xl text-white rounded-md'>Sign Up!</Button>
        </Link>
    </div>
  )
}

export default page