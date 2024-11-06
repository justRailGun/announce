'use client'
import React from 'react'
import {ModeToggle} from "@/components/Theme"
import {Input} from "@/components/ui/input"
import Link from 'next/link'
import {ROUTES} from '@/constants/route'
import Image from 'next/image'
import SheetMenu from '../SheetMenu'
import {useState,useEffect} from 'react'
const Navbar = () => {
  const [scrollY, setScrollY] = useState(false)
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      setScrollY(window.scrollY > 50)
    })
    return ()=>{
      window.removeEventListener('scroll',()=>{
        setScrollY(window.scrollY > 50)
      })
    }
  })
  return (
    <nav
    className='w-full flex z-50 fixed items-center justify-between background-light900_dark200 p-6  text-dark100_light900 dark:shadow-none'
    > 
        <Link href='/'><h1 className='h1-bold '>
            Saha<span className='text-primary-500'> A</span> 
        </h1>
        </Link>
        
        <div className='flex items-center relative min-w-[300px]'>
            <Input type="text" placeholder="Search..." 
            className=' dark:bg-light-900 bg-gray-200 max-sm:hidden dark:placeholder:text-dark-100/60 border-2 w-full px-4 py-3 rounded-md focus:ring-0 focus:ring-offset-0' />
        </div>
        <div className='flex items-center justify-center gap-2 max-sm:hidden'> 
            <div className='flex items-center font-inter gap-4'>
              <ModeToggle />
              <Link href={ROUTES.LOGIN} className="px-4 py-2 ">Login</Link>
              <div className='flex items-center gap-4'>
                <Link href={ROUTES.CART} className='flex  items-center gap-2'>
                  <Image src="/icons/cart.svg" className='invert-colors' width={32} height={32} alt="cart" />Cart
                </Link>
                {scrollY &&             
                <SheetMenu trigger={<Image src="/icons/hamburger.svg" className='invert-colors' width={32} height={32} alt="hamburger" />} />
              }
                </div>
            </div>  
          </div>
          <div className='flex items-center justify-center gap-2 sm:hidden'>
            <SheetMenu trigger={<Image src="/icons/hamburger.svg" className='invert-colors' width={32} height={32} alt="hamburger" />} />
          </div>
    </nav>
  )
}

export default Navbar