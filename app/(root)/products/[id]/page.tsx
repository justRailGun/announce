'use client'

import { Star} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PRODUCTS , Product } from '@/constants/product'
import ImageSlider from '@/components/products/Image'

const product = PRODUCTS[0]
  



function ProductDetails({ product } : { product : Product }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
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
      <Button className="w-full">Add to Cart</Button>
    </div>
  )
}



export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex gap-8 justify-center items-center">
      <ImageSlider images={product.imageURL} />
      <ProductDetails product={product} />
    </div>
  )
}