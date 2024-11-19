/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import * as React from "react"
import { type CarouselApi } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { PRODUCTS } from "@/constants/product";

const ImageSlider = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount((api.scrollSnapList().length)/3)
    setCurrent(Math.round((api.selectedScrollSnap() + 1)/3))
 
    api.on("select", () => {
      setCurrent(Math.round((api.selectedScrollSnap() + 1)/3))
    })
  }, [api])
 
  return (
  <div suppressHydrationWarning className="">
            <Carousel className="" setApi={setApi} opts={{align:"center", loop:true}}>
              <CarouselContent>
                {PRODUCTS.map((product, index) => (
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img src={product.imageURL+".png"} width={200} height={200} alt={product.name} className="object-contain w-full" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="max-lg:hidden"/>
              <CarouselNext className="max-lg:hidden"/>
            </Carousel>
            {count !=0 && <div className="py-2 text-center text-sm text-muted-foreground">
              Slide {current} of {count}
            </div>}
  </div>
  )
}

export default ImageSlider