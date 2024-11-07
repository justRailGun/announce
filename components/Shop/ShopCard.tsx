import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Shop } from '@/constants/Shop'
import { Rating } from '@mui/material'


const ShopCard = ({shop} : {shop: Shop}) => {

    const {name,bannerURL,popularity,overallRating,numberOfOrders} = shop
  return (
    <Card className="w-72 shadow-lg overflow-hidden transition-all m-4 duration-300 hover:shadow-lg">
    <div className="relative h-48 overflow-hidden">
      <Image
        src={bannerURL}
        width={400}
        height={400}
        alt="Product Image"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <CardContent className="p-4 invert-colors">
      <h2 className="text-xl font-semibold  text-white">{name}</h2>
      <div className="flex justify-between flex-col">
        <span className="text-lg  font-bold text-blue-600 flex items-center gap-2">Popularity : {popularity} <Image src="/icons/users-group.svg" width={20} height={20} alt="star" /></span>
        <div className="flex items-center justify-between">
          <div className="flex justify-center items-center gap-2">
          <Rating name="read-only" value={overallRating} readOnly precision={0.1}/>{overallRating}
          </div>
          <span className="flex items-center gap-2 text-gray-600"> 
            {numberOfOrders} <Image src="/icons/order.svg" width={20} height={20} alt="star" />
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default ShopCard