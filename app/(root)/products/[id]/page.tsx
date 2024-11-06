'use client'

import { Star} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PRODUCTS , Product } from '@/constants/product'
import ImageSlider from '@/components/products/Image'
import Image from 'next/image'

const product = PRODUCTS[0]
const size = ["XS" , "S" , "M", "L"  , "XL"];

const buttonStyle = "btn-lately  w-full max-md:justify-center justify-between px-4 py-2 rounded-md flex items-center text-sm font-medium"

function ProductDetails({ product } : { product : Product }) {
  return (
    <div className="mb-8 max-xl:gap-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-dark400_light700 mb-4 base-medium">{product.description}</p>
      </div> 
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl font-inter font-bold text-primary-500">${product.price.toFixed(2)}</span>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 fill-current'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.numberOfRatings} reviews)
          </span>
        </div>
      </div>
      <h3 className='h3-bold text-dark300_light700'>Pick Your Size:</h3>  
            <form className='flex gap-8'> 
            {size.map((size)=>{
              return <div key={size} className='flex flex-col items-center gap-2'>
                <input type='radio' value={size} name={size}/><label htmlFor={size}>{size}</label>
              </div>
            })}
            </form>
      <div className='grid grid-cols-4 gap-2'>
         <Button className="col-span-2 lately">Buy Now <Image src="/icons/cash.svg" width={24} height={24} alt="cart" /></Button>
        <Button className={buttonStyle}><p className='max-md:hidden'>Add to Cart</p> <Image src="/icons/cart.svg" className='invert-colors' width={24} height={24} alt="cart" /></Button>
        <Button className={buttonStyle}><p className='max-md:hidden'>Add to Favorite</p> <Image src="/icons/favorite.svg" className='invert-colors' width={24} height={24} alt="cart" /></Button>
      </div>
     
    </div>
  )
}



export default function ProductPage() {
  return (
    <div className="container border-b-2 max-xl:py-2 flex xl:flex-row flex-col gap-0 xl:gap-4 ">
      <ImageSlider images={product.imageURL} />
      <ProductDetails product={product} />
    </div>
  )
}