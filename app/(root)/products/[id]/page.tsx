'use client'

// import { useState } from 'react'
import Image from 'next/image'
import { Star} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PRODUCTS } from '@/constants/product'

const product = PRODUCTS[0]
  
console.log(product)

const comments = [
  { id: 1, user: "Alice", content: "Great sound quality! Highly recommended.", rating: 5 },
  { id: 2, user: "Bob", content: "Comfortable for long listening sessions.", rating: 4 },
  { id: 3, user: "Charlie", content: "Good, but battery life could be better.", rating: 3 },
]

const similarProducts = [
  { id: 1, name: "Wireless Earbuds", price: 149.99, rating: 4.3, reviews: 95 },
  { id: 2, name: "Over-Ear Studio Headphones", price: 349.99, rating: 4.7, reviews: 210 },
  { id: 3, name: "Sports Neckband Earphones", price: 79.99, rating: 4.1, reviews: 62 },
]

function ImageSlider({ images }) {

//   const nextImage = () => {
//     setCurrentImage((prev) => (prev + 1) % images.length)
//   }

//   const prevImage = () => {
//     setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
//   }

  return (
    <div className="h-96 w-full mb-8">
      <Image
        src={images+'.png'}
        alt={`Product image ${images}`}
        objectFit="cover"
        className="rounded-lg"
        height={400}
        width={400}
      />
      {/* <Button
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
      </Button> */}
    </div>
  )
}

function ProductDetails({ product }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 fill-current'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>
      <Button className="w-full">Add to Cart</Button>
    </div>
  )
}

function CommentSection({ comments }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{comment.user}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < comment.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 fill-current'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">{comment.content}</p>
        </div>
      ))}
      <div className="mt-4">
        <Textarea placeholder="Leave a comment..." className="mb-2" />
        <Button>Submit Comment</Button>
      </div>
    </div>
  )
}

function SimilarProducts({ products }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-4">
              <Image
                src="/placeholder.svg?height=150&width=200&text=Product"
                alt={product.name}
                width={200}
                height={150}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">${product.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ImageSlider images={product.imageURL} />
      <ProductDetails product={product} />
      <CommentSection comments={comments} />
      <SimilarProducts products={similarProducts} />
    </div>
  )
}