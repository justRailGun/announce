import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";



function ImageSlider({ images } : { images : string}) {
    const arrayOfImages =[images,images,images] ; 
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }
    const prevImage = () => {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

    
      return (
        <div  className="h-96 mb-8">
          <Image
            src={arrayOfImages[currentImage]+'.png'}
            alt={`Product image ${arrayOfImages[currentImage]}`}
            objectFit="cover"
            className="rounded-lg"
            height={400}
            width={400}
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )
    }
    
export default ImageSlider