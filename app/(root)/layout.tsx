'use client'
import Navbar from '@/components/navigation/Navbar'
import React, { useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { useToast } from '@/hooks/use-toast'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  const {toast} = useToast()
  const [cart, setCart] = useState<string[]>([]);
  const updateLength = (value:string) => {
    if(!cart.includes(value)){
      setCart((prev : string[]) => [...prev, value])
      toast({
        title : 'Item Added',
        description : 'Item been added to your cart'
       })
    }else{
      setCart((prev : string[]) => prev.filter(item => item !== value))
      toast({
         title : 'Item Removed',
         description : 'You removed the item from your Cart',
         variant : 'destructive'
        })
    }
  }
  return (
    <CartContext.Provider value={{cart, setCart, updateLength}}>
      <main suppressHydrationWarning className="relative background-light900_dark300">
        <Navbar />
        {children}
      </main>
    </CartContext.Provider>
  )
}

export default RootLayout