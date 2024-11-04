import Navbar from '@/components/navigation/Navbar'
import React from 'react'
import CategoryNavigation from '@/components/navigation/CategoryNavigation'
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main suppressHydrationWarning className="background-light850_dark100 relative w-full   min-h-screen overflow-hidden">
      <Navbar />
      <CategoryNavigation />
      <div className="flex"> 
        <section className="flex container min-h-screen mx-auto flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full">{children}</div>
        </section>
      </div>
    </main>
  )
}

export default RootLayout