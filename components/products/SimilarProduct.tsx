import React from 'react'

import { PRODUCTS } from '@/constants/product'
import ProductCard from './ProductCard'

function SimilarProducts() {
        
        for (let i = 0; i < PRODUCTS.length; i++) {
            console.log(PRODUCTS[i])
        }

        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
               
                {[...Array(4)].map((_, i) => (
                <ProductCard key={i} product={PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]} />
                ))}
            </div>
          </div>
        )
    }
export default SimilarProducts