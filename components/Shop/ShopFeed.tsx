import React from 'react'
import  FilterArray  from '@/components/Shop/FilterArray'
import { Product, PRODUCTS } from '@/constants/product';
import ProductCard from '@/components/products/ProductCard'


const ShopFeed = async ({category}) => {
    const filter = await category ;
  return (
    <section className='grid grid-cols-4'>
      <div className='col-span-1'>
        <FilterArray category={filter} /> 
      </div>
       <div className='col-span-3 grid grid-cols-3 gap-4'>
        {PRODUCTS.map((product,index)=>{
            return <ProductCard key={index} product={product as Product} />
             
        })}
        </div> 

    </section>
  )
}

export default ShopFeed