/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import React from 'react'

export default function ProductCard({product} : {product:any}) {
    const {name,imageURL,price,rating,numberOfRatings} = product
  return (
    <Card className="w-[350px]  min-h-[400px] overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className=" h-56 overflow-hidden">
        <img
          src={imageURL+'.png'}
          alt="Product Image"
          className="w-full h-full object-contain bg-gray-900 transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">${price}</span>
          <div className="flex items-center">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-gray-300 fill-current" />
            </div>
            <span className="ml-2 text-sm text-gray-600">{rating} <span className="text-gray-400">({numberOfRatings} reviews)</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}