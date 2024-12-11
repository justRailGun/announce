'use client'
import React, { useEffect, useState } from 'react'
import { Product } from "@/constants/product"
import ProductCard from '../products/ProductCard'
import { useQueryState } from 'nuqs'
import SkeletonCard from '../Skeleton/SkeletonCard'
import  getIcons  from '@/constants/icons'
const Store = () => {
  const [q] = useQueryState('q')
  const [category] = useQueryState('category')
  // fetching 
  const [produit, setProduit] = useState<[Product] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [dataCategory, setDataCategory] = useState<[Product["category"]]| null>(null)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/`);
        if (!res.ok) throw new Error('Failed to fetch product data');
        const data = await res.json();
        setProduit(data.data);
         console.log(data.data) 
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
  
  
    getProduct();
    return ()=>{}
  },[])
    
  if (loading) {
    return <SkeletonCard />;
  }

  if (!produit) {
    return <p>Product not found</p>;
  }
  
  // Consolidate filtering for products based on query and category
  const filteredProducts = produit.filter((product) => {
    const matchesQuery = q ? product.name.toLowerCase().includes(q.toLowerCase()) : true
    const matchesCategory = category 
      ? product.category.name.toLowerCase() === category.toLowerCase()
      : true
    
    return matchesQuery && matchesCategory
  })
  // Filter categories only if category is selected
    const categoryy = Array.from(
            new Set(produit.map((product)=>{
            return product.category.name
        
          })))
  // const cateArray = Object.values(CATEGORY) 
  const filteredCategories = category ? 
  categoryy.filter(cate => cate.toLowerCase() === category.toLowerCase()) 
    : categoryy

   

  return (
    <section className='w-full mx-auto'>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cate, index) => (
          <div className="flex flex-col gap-8" key={index}>
            <h1 className='h1-bold flex gap-4 items-center'>              
              {getIcons({name:cate})}
              {cate}
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8'>
              {filteredProducts.filter(product => product.category.name.toLowerCase() === cate.toLowerCase()).map((product, idx) => (
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
