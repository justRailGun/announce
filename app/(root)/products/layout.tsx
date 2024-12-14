import React from 'react'

const ProductLayout = ({children } : {children : React.ReactNode}) => {
  return (
    <section suppressHydrationWarning className='flex flex-col gap-8 container pt-24 w-full mx-auto'>
        {children}
    </section>
  )
}

export default ProductLayout