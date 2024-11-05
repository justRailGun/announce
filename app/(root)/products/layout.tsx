import CommentSection from '@/components/products/CommentSection'
import SimilarProducts from '@/components/products/SimilarProduct'
import React from 'react'

const ProductLayout = ({children} :{children:React.ReactNode}) => {

  return (
    <section suppressHydrationWarning>
      <div>
        {children}
      </div>
            <CommentSection />
            <SimilarProducts />
    </section>
  )
}

export default ProductLayout