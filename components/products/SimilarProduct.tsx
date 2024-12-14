'use client'
import { Product } from '@/constants/product';
import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard'

function SimilarProducts({id} :  {id : string}) {
  const [similarProducts, setSimilarProducts] = useState<[Product]|null>(null);
        useEffect(()=>{
          const getSimilarProducts = async()=>{
            try {
              const res = await fetch(`/api/products/${id}/similar`);
              const data = await res.json();
              setSimilarProducts(data);
              console.log(data)
            } catch (error) {
              console.error('Error fetching similar products:', error);
            }
          }
          getSimilarProducts()
        },[id])

        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {similarProducts && similarProducts.map((product)=>{
                 return (
                  <ProductCard key={product._id} product={product}/>
                 )
               })}
            </div>
          </div>
        )
    }
export default SimilarProducts