'use client'
import React, { useEffect } from 'react'
import {ModeToggle} from "@/components/Theme"
import Link from 'next/link'
import {ROUTES} from '@/constants/route'
import Image from 'next/image'
import SheetMenu from '../SheetMenu'
import LocalSearch from '../search/LocalSearch'
import { Plus,LogOut, LogIn , ShoppingCart} from 'lucide-react'
// import ModalTrigger from '../Modal'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import ProductModal from '../ModalProduct'
import { Badge } from '../ui/badge'
import { CartContext } from '@/app/Context/CartContext'
import { useContext } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
interface User {
  _id: string;  
  name: string;
  email: string;
  image: string;
  products: string[];
  role : "admin" | "user"
}
const  Navbar =  () => {
  const {data:session} = useSession()
  const [user, setUser] = React.useState<User | null>(null)
  const cartContext = useContext(CartContext)
  const cart = cartContext ? cartContext.cart : []
  useEffect(() => {
    const getUser = async ()=>{
      const res = await fetch(`/api/user/email/${session?.user?.email}`)
      const data = await res.json()
      setUser(data.data)
    }
    if(session) getUser()
  }, [session])
console.log(session)
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
              {!session? 
              <Link href={ROUTES.LOGIN} className="px-4 py-2 items-center justify-center flex gap-2">Login <LogIn size={20}/></Link> : 
              <>
              <ProductModal  >Create  <Plus size={20} /></ProductModal>
              <Button onClick={()=>signOut()} className='px-4 py-2 bg-red-700 dark:text-white dark:bg-red-900'>Logout <LogOut size={20} /></Button>
              </>}
              
              <div className='flex items-center gap-4'>
                <Link href={ROUTES.CART} className='relative btn-secondary px-4 py-2 rounded-lg flex items-center gap-2'>
                  Cart <ShoppingCart size={20} />
                  <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white rounded-full dark:bg-red-700 dark:text-white ">
                {cart.length}
              </Badge>
                </Link>
                {user?._id && (
  <Link href={`/user/${user._id}`}>
    <Avatar>
      <AvatarImage src={user?.image} />
      <AvatarFallback>DJ</AvatarFallback>
    </Avatar>
  </Link>
)}

                <ModeToggle />
                          
                <SheetMenu trigger={<Image src="/icons/hamburger.svg" className='invert-colors' width={32} height={32} alt="hamburger" />} />
              
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