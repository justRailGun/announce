'use client'
import React from 'react'
import {ModeToggle} from "@/components/Theme"
import Link from 'next/link'
import {ROUTES} from '@/constants/route'
import Image from 'next/image'
import SheetMenu from '../SheetMenu'
import {useState,useEffect} from 'react'
import LocalSearch from '../search/LocalSearch'
import { Plus,LogOut, LogIn , ShoppingCart} from 'lucide-react'
import ModalTrigger from '../Modal'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
const  Navbar =  () => {
  const {data:session} = useSession()
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
        
        <div className=''>
          <LocalSearch />
            </div>
        <div className='flex items-center justify-center gap-2 max-sm:hidden'> 
            <div className='flex items-center font-inter gap-4'>
             
              <ModalTrigger  >Create  <Plus size={20} /></ModalTrigger>
              {!session? 
              <Link href={ROUTES.LOGIN} className="px-4 py-2 items-center justify-center flex gap-2">Login <LogIn size={20}/></Link> : 
              <Button onClick={()=>signOut()} className='px-4 py-2 bg-red-700 dark:text-white dark:bg-red-600'>Logout <LogOut size={20} /></Button>}
              
              <div className='flex items-center gap-4'>
                <Link href={ROUTES.CART} className='flex items-center gap-2'>
                  Cart <ShoppingCart size={20} />
                </Link><ModeToggle />
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