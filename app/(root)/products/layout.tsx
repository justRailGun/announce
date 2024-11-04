import SimilarProducts from '@/components/products/SimilarProduct'
import React from 'react'

const ProductLayout = ({children} :{children:React.ReactNode}) => {
  return (
    <section className='' suppressHydrationWarning>
        {children}
        <div>
            <SimilarProducts />
        </div>
    </section>
  )
}

export default ProductLayout