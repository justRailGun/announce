'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
// import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/constants/product";
import Rating from '@mui/material/Rating';
import Link from "next/link";
import React from 'react'
import { useContext } from "react";
import { CartContext } from "@/app/Context/CartContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Edit, Trash2, ShoppingCart , NotepadText} from 'lucide-react'


export default function ProductCard({product } : {product : Product}) {
    const cartContext = useContext(CartContext)
    const updateLength = cartContext!.updateLength ; 
    const {name,image,price,rating,numberOfRatings , _id, category,"Sub-Category" : subCategory } = product;
    const btnClassName = 'w-full justify-between px-4 py-2 rounded-md flex items-center text-sm font-medium dark:text-white'
    const btnDeleteClass =" bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
    const btnEditClass =" bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
    const { data: session } = useSession();
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
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-dark200_light800">{name}</h2>
            <div className="flex justify-between items-center gap-4">
              <p className="text-black/60 font-inter text-sm dark:text-white/60">{product.user.name}</p>
              <Link href={"/"}>
                <Avatar>
                  <AvatarImage src={product.user.image} />
                  <AvatarFallback>{product.user.name.slice(0,1)}</AvatarFallback>
                </Avatar>
              </Link>
              </div>
          </div>

           <div className="flex justify-between items-center"><p>{category.name}</p><p className="mb-2 text-sm text-dark200_light800">{subCategory.name}</p></div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">${price.toLocaleString("fr-FR")}</span>
            <div className="flex items-center">
              <div className="flex items-center my-2">
                <Rating name="read-only" value={rating} readOnly precision={0.1}/>
              </div>
              <span className="ml-2 text-sm text-gray-600">{rating?.toFixed(1)} <span className="text-gray-400 small-regular">({numberOfRatings} reviews)</span></span>
            </div>
          </div>
        </div>

        { session?.user?.id === product.user._id ?
          <div className="flex justify-between items-center gap-2">
          <Button className={btnClassName +btnEditClass}>
            Edit Product
          <Edit className='w-5 h-5 dark:text-white' onClick={()=>{}}/>
          </Button>
          <Button className={btnClassName + btnDeleteClass} onClick={() => {updateLength(_id);}}>
            Delete Product 
            <Trash2 className='w-5 h-5  dark:text-white' onClick={()=>{}}/></Button>
        </div>
        :
          <div className="flex justify-between items-center gap-2">
          <Link className={btnClassName + " text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"} href={"/products/"+_id}>More Details
          <NotepadText className='w-5 h-5 dark:text-white' onClick={()=>{}}/>
          </Link>
          <Button className={btnClassName + " bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"} onClick={() => {updateLength(_id);}}>
            Add to Cart <ShoppingCart className='w-5 h-5 dark:text-white' onClick={()=>{}}/></Button>
        </div>  }
      </CardContent>
    </Card>
  )
}
