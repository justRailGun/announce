import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'
import Image from "next/image"

type ReviewNote = "Excellent" | "Good" | "Average" | "Poor" | "Terrible"

interface CommentCardProps {
  productImage: string
  productName: string
  productCategory: string
  rating: number
  comment: string
  reviewNote: ReviewNote
}

const getReviewNoteColor = (note: ReviewNote): string => {
  switch (note) {
    case "Excellent": return "bg-green-500 hover:bg-green-600"
    case "Good": return "bg-blue-500 hover:bg-blue-600"
    case "Average": return "bg-yellow-500 hover:bg-yellow-600"
    case "Poor": return "bg-orange-500 hover:bg-orange-600"
    case "Terrible": return "bg-red-500 hover:bg-red-600"
  }
}

export default function CommentCard({
  productImage,
  productName,
  productCategory,
  rating,
  comment,
  reviewNote
}: CommentCardProps) {
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
            </div>
            <p className="text-sm text-muted-foreground mb-4">{comment}</p>
            <Badge className={`${getReviewNoteColor(reviewNote)} dark:${getReviewNoteColor(reviewNote)} dark:text-white`}>
              {reviewNote}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}