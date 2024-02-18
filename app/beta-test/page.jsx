import React from 'react'
import { Rajdhani } from "next/font/google";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500"] });
const page = () => {
  return (
    <div className={`px-4 flex items-center justify-center w-full h-screen ${rajdhani.className} gap-10 text-4xl flex-col `}>
        Coming Soon on 
        <Image
          src="/playstore.png"
          height={5} width={150} 
        />
        <p>
          For early access sign up for our beta test
        </p>
        <Link href=''>
        <Button className='text-3xl'>Beta Test</Button>
        </Link>
    </div>
  )
}

export default page