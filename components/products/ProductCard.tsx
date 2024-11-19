/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
// import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/constants/product";
import Rating from '@mui/material/Rating';
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import Tags from "./Tags";

export default function ProductCard({product} : {product: Product}) {
    const {name,imageURL,price,rating,numberOfRatings} = product
    const btnClassName = 'w-full justify-between px-4 py-2 rounded-md flex items-center text-sm font-medium'
  return (
    <Card className="w-[350px]  min-h-[400px] overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className=" h-56 overflow-hidden">
        <img
          src={imageURL+'.png'}
          alt="Product Image"
          className="w-full h-full object-contain bg-dark-200 transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4 justify-between h-[calc(100%-224px)] flex-col flex">
        <div>
          <h2 className="text-xl font-semibold text-dark200_light800">{name}</h2>
           <div className="flex justify-between items-center"><p className="mb-2 text-sm text-dark200_light800">Samsung</p> <Tags /> </div>{/* Adding the brand later */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">${price}</span>
            <div className="flex items-center">
              <div className="flex items-center">
                <Rating name="read-only" value={rating} readOnly precision={0.1}/>
              </div>
              <span className="ml-2 text-sm text-gray-600">{rating} <span className="text-gray-400 small-regular">({numberOfRatings} reviews)</span></span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Link className={btnClassName +' btn-tertiary'} href={"/products/"+name}>More Details
          <Image src="/icons/detail.svg" className='invert-colors' width={20} height={20} alt="cart" />
          </Link>
          <button className={btnClassName +" btn-secondary"}>
            Add to Cart <Image src="/icons/cart.svg" className='invert-colors' width={20} height={20} alt="cart" /></button>
        </div>
      </CardContent>
    </Card>
  )
}
