'use client'
import React from 'react'
import { PRODUCTS } from "@/constants/product"
import ProductCard from '../products/ProductCard'
import { CATEGORY } from '@/constants/Category'
import Image from 'next/image'
import { useQueryState } from 'nuqs'

const Store = () => {
  const [q] = useQueryState('q')
  const [category] = useQueryState('category')

  // Consolidate filtering for products based on query and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery = q ? product.name.toLowerCase().includes(q.toLowerCase()) : true
    const matchesCategory = category 
      ? product.category.toLowerCase() === category.toLowerCase()
      : true
    
    return matchesQuery && matchesCategory
  })

  // Filter categories only if category is selected
  const cateArray = Object.values(CATEGORY)
  const filteredCategories = category ? 
    cateArray.filter(cate => cate.toLowerCase() === category.toLowerCase()) 
    : cateArray

  return (
    <section className='w-full mx-auto'>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cate, index) => (
          <div className="flex flex-col gap-8" key={index}>
            <h1 className='h1-bold flex gap-4 items-center'>
              <Image className='invert-colors' src="/icons/pc.svg" height={34} width={34} alt={cate} />
              {cate}
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8'>
              {filteredProducts.filter(product => product.category.toLowerCase() === cate.toLowerCase()).map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h2>No matching categories or products found.</h2>
        </div>
      )}
    </section>
  )
}

export default Store
