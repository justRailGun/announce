import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Shop } from '@/constants/Shop'


const ShopCard = ({shop} : {shop: Shop}) => {

    const {name,bannerURL,popularity,overallRating,numberOfOrders,location,phone,email,address} = shop
  return (
    <Card className="w-72 overflow-hidden transition-all mx-4 duration-300 hover:shadow-lg">
    <div className="relative h-48 overflow-hidden">
      <Image
        src={bannerURL}
        width={400}
        height={400}
        alt="Product Image"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{name}</h2>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">$129.99</span>
        <div className="flex items-center">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-gray-300 fill-current" />
          </div>
          <span className="ml-2 text-sm text-gray-600">4.0 <span className="text-gray-400">(128)</span></span>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default ShopCard