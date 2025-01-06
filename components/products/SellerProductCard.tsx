/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SellerProductCardProps {
  name: string
  image: string
  category: string
  price: number
  quantity: number
}

export default function SellerProductCard({
  name,
  image,
  category,
  price,
  quantity
}: SellerProductCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          width={100}
          height={100}
          className="transition-transform duration-300 hover:scale-105 w-full h-full object-contain"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{name}</h3>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-muted-foreground">Quantity Sold</p>
            <p className="text-lg font-bold">{quantity}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}