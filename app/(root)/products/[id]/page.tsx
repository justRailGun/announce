/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from "@/components/ui/button"
import {  Product } from '@/constants/product'
import ImageSlider from '@/components/products/Image'
import * as React from "react"
import { Heart, ShoppingCart, CircleDollarSign   } from 'lucide-react'
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import {use , useEffect, useState} from 'react'
import { Skeleton } from "@/components/ui/skeleton"

 function ProductDetails( {product  } : { 
    product : Product,
   }) {
    console.log(product)
  const {  name, description, price  } = product
  

  return (
    <div className="w-full container p-2 mx-auto">
      <div className="flex flex-col gap-8 md:gap-4 items-start">
        <h1 className="h1-bold md:text-4xl">{name}</h1>
        <p className="paragraph-regular md:text-lg">{description}</p>
        <div className="md:text-[20px] paragraph-regular w-full flex flex-col md:justify-between md:flex-row gap-4 md:gap-2">
          <div className="flex items-center gap-2 justify-between"><p>Rating:</p>  
            <Rating name="half-rating-read" emptyIcon={<StarIcon style={{ opacity: 1 }}  fontSize="inherit" />} defaultValue={4} precision={0.5} readOnly />
            <span className="text-light-400">(250 reviews)</span>
          </div>

          <p className="font-inter font-semibold">Price: <span className='text-green-700 dark:text-[#96FB4A]'>{price}$</span></p>
        </div>

        <div className="w-full flex justify-between gap-4 md:justify-end items-center">
          <Button >
            Add to Cart <ShoppingCart size={20} className=""/>
            </Button>
          <Button>Add to Wishlist <Heart size={20} className=""/></Button>
          <Button className="bg-green-700 dark:bg-[#96FB4A] dark:hover:bg-[#89f03b] text-white hover:bg-green-900">Buy Now <CircleDollarSign size={20} className=""/></Button>
        </div>

      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}




export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = use(params).id;
  const [produit, setProduit] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product data');
        const data = await res.json();
        setProduit(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) {
    return <SkeletonCard />;
  }

  if (!produit) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <ImageSlider />
      <ProductDetails product={produit} />
    </>
  );
}