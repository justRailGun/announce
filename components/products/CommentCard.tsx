'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star , Edit, Trash2 } from 'lucide-react'
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

type ReviewNote = "Excellent" | "Good" | "Average" | "Poor" | "Terrible"

interface CommentCardProps {
  productImage: string
  productName: string
  productCategory: string
  rating: number
  comment: string
  reviewNote: ReviewNote
  creator? : string
}

const getReviewNoteColor =  (note: ReviewNote): string => {
 
  switch (note) {
    case "Excellent": return "bg-green-500 hover:bg-green-600"
    case "Good": return "bg-blue-500 hover:bg-blue-600"
    case "Average": return "bg-yellow-500 hover:bg-yellow-600"
    case "Poor": return "bg-orange-500 hover:bg-orange-600"
    case "Terrible": return "bg-red-500 hover:bg-red-600"
  }
}
interface User {
  _id: string;  
  name: string;
  email: string;
  image: string;
  products: string[];
  role : "admin" | "user"
}

export default function CommentCard({
  productImage,
  productName,
  productCategory,
  rating,
  comment,
  reviewNote, 
  creator,
}:  CommentCardProps) {
  const {data : session} = useSession()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const btnClassName = 'w-full justify-between px-4 py-2 rounded-md flex items-center text-sm font-medium dark:text-white'
  const btnDeleteClass =" bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
  const btnEditClass =" bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
    
  useEffect(()=>{
    const getUser= async ()=>{
      const res = await fetch(`http://localhost:3000/api/user/email/${session?.user?.email}`)
      const data = await res.json()
      setCurrentUser(data.data)
    }
   getUser()
  }
  ,[session])
    

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={productImage}
              alt={productName}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{productName}</h3>
              <Badge variant="secondary">{productCategory}</Badge>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <Badge className={`${getReviewNoteColor(reviewNote)} dark:${getReviewNoteColor(reviewNote)} dark:text-white`}>
              {reviewNote}
            </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{comment}</p>
          </div>
        </div>
        {creator === currentUser?._id &&
            <div className='flex gap-2'>
              <Button className={btnClassName +btnEditClass}>
                Edit Comment
                <Edit className='w-5 h-5 dark:text-white' onClick={()=>{}}/>
              </Button>
              <Button className={btnClassName + btnDeleteClass} >
                 Delete Comment 
                <Trash2 className='w-5 h-5  dark:text-white' onClick={()=>{}}/>
              </Button>
            </div>
            }
      </CardContent>
    </Card>
  )
}