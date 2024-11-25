import Navbar from '@/components/navigation/Navbar'
import React from 'react'
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main suppressHydrationWarning className="relative background-light900_dark300 ">
      <Navbar />

       
          {children}
        
    </main>
  )
}

export default RootLayout