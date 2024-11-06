import Navbar from '@/components/navigation/Navbar'
import React from 'react'
import CategoryNavigation from '@/components/navigation/CategoryNavigation'
import ShopSlider from '@/components/Shop/ShopSlider'
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main suppressHydrationWarning className="background-light900_dark300 w-full min-h-screen overflow-hidden">
      <Navbar />
      <CategoryNavigation />
      <ShopSlider />
      <div className="flex"> 
        <section className="flex container min-h-screen mx-auto px-6 py-24 xl:py-12">
          {children}
        </section>
      </div>
    </main>
  )
}

export default RootLayout