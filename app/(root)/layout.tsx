import Navbar from '@/components/navigation/Navbar'
import React from 'react'
import CategoryNavigation from '@/components/navigation/CategoryNavigation'
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main suppressHydrationWarning className="background-light900_dark300 w-full min-h-screen overflow-hidden">
      <Navbar />
      <CategoryNavigation />
       
          {children}
        
    </main>
  )
}

export default RootLayout