import React from 'react'
import {PRODUCTS} from "@/constants/product"
import ProductCard from '../products/ProductCard'
import { CATEGORY } from '@/constants/Category'
import Image from 'next/image'
const Store = () => {

  return (
    <section className='w-full mx-auto '>
        {Object.entries(CATEGORY).map(([key,value],index)=>{
            return <div className="flex flex-col gap-8" key={index}>
            <h1 className='h1-bold flex gap-4 items-center'><Image className='invert-colors' src={"/icons/"+key+".svg"} height={34} width={34} alt={key}/>{value}</h1> 
            <div  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8'>
                {PRODUCTS.map((product,index)=>{
                    if(value.toLocaleLowerCase()===product.category.toLocaleLowerCase()){
                        return <ProductCard key={index} product={product} />
                    } 
                })}
                </div>
            </div>}
           )}
    </section>
  )
}

export default Store