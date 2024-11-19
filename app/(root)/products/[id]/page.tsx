/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from "@/components/ui/button"
import { PRODUCTS , Product } from '@/constants/product'
import ImageSlider from '@/components/products/Image'
import * as React from "react"
import { Heart, ShoppingCart, CircleDollarSign   } from 'lucide-react'
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';

const product = PRODUCTS[0]

function ProductDetails({ product } : { product : Product}) {
  const { rating , name, description, price , numberOfRatings } = product
  return (
    <div className="w-full container p-2 mx-auto">

      <div className="flex flex-col gap-8 md:gap-4 items-start">
        <h1 className="h1-bold md:text-4xl">{name}</h1>
        <p className="paragraph-regular md:text-lg">{description}</p>

        <div className="md:text-[20px] paragraph-regular w-full flex flex-col md:justify-between md:flex-row gap-4 md:gap-2">
          <div className="flex items-center gap-2 justify-between"><p>Rating:</p>  
            <Rating name="half-rating-read" emptyIcon={<StarIcon style={{ opacity: 1 }}  fontSize="inherit" />} defaultValue={rating} precision={0.5} readOnly />
            <span className="text-light-400">({numberOfRatings} reviews)</span>
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




export default function ProductPage() {
  return (
    <>
      <ImageSlider />
      <ProductDetails product={product} />
    </>
  )
}