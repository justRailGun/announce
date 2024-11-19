import React from 'react'
import  FilterArray  from '@/components/Shop/FilterArray'
import { Product, PRODUCTS } from '@/constants/product';
import ProductCard from '@/components/products/ProductCard'
import { Shop } from '@/constants/Shop';


const ShopFeed =  ({category} : {category : Shop['category']}) => {
    const filter =  category ;
  return (
    <section className='flex relative'>
      
        <FilterArray category={filter} /> 
      
       <div className='mx-auto col-span-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {PRODUCTS.map((product,index)=>{
             
             return<ProductCard key={index} product={product as Product} />
             
        })}
        </div> 

    </section>
  )
}

export default ShopFeed