import Navbar from '@/components/navigation/Navbar'
import React from 'react'
import CategoryNavigation from '@/components/navigation/CategoryNavigation'
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main suppressHydrationWarning className="relative background-light900_dark300 ">
      <Navbar />
      <CategoryNavigation />
       
          {children}
        
    </main>
  )
}

export default RootLayout