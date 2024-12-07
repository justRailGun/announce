import CommentSection from '@/components/products/CommentSection'
import SimilarProducts from '@/components/products/SimilarProduct'
import React from 'react'

const ProductLayout = ({children} :{children:React.ReactNode}) => {

  return (
    <section suppressHydrationWarning className='flex flex-col gap-8 container pt-24 w-full mx-auto'>
        {children}
        <CommentSection />
        <SimilarProducts />
    </section>
  )
}

export default ProductLayout