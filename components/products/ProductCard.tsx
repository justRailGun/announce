'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
// import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/constants/product";
import Rating from '@mui/material/Rating';
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import { useContext } from "react";
import { CartContext } from "@/app/Context/CartContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function ProductCard({product} : {product: Product}) {
    const cartContext = useContext(CartContext)
    const updateLength = cartContext!.updateLength ; 
    const {name,image,price,rating,numberOfRatings , _id, category,"Sub-Category" : subCategory} = product;
    const btnClassName = 'w-full justify-between px-4 py-2 rounded-md flex items-center text-sm font-medium'

  return (
    <Card className="w-[350px]  min-h-[400px] overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className=" h-56 overflow-hidden">
        <img
          src={image}
          alt="Product Image"
          className="w-full h-full object-contain bg-dark-200 transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4 justify-between h-[calc(100%-224px)] flex-col flex">

        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-dark200_light800">{name}</h2>
            <div className="flex items-center gap-4">
              <p className="text-black/60 font-inter text-sm">UserName</p>
              <Link href={"/"}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>DJ</AvatarFallback>
                </Avatar>
              </Link>
              </div>
          </div>

           <div className="flex justify-between items-center"><p>{category.name}</p><p className="mb-2 text-sm text-dark200_light800">{subCategory.name}</p></div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">${price.toLocaleString("fr-FR")}</span>
            <div className="flex items-center">
              <div className="flex items-center">
                <Rating name="read-only" value={rating} readOnly precision={0.1}/>
              </div>
              <span className="ml-2 text-sm text-gray-600">{rating} <span className="text-gray-400 small-regular">({numberOfRatings} reviews)</span></span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <Link className={btnClassName +' btn-tertiary'} href={"/products/"+_id}>More Details
          <Image src="/icons/detail.svg" className='invert-colors' width={20} height={20} alt="cart" />
          </Link>
          <button className={btnClassName +" btn-secondary"} onClick={() => {updateLength(_id);}}>
            Add to Cart <Image src="/icons/cart.svg" className='invert-colors' width={20} height={20} alt="cart" /></button>
        </div>
      </CardContent>
    </Card>
  )
}
