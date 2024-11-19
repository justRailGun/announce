import { Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {MessageCircleMore} from "lucide-react";



function CommentSection() {

    const comments = [
        { id: 1, user: "Alice", content: "Great sound quality! Highly recommended.", rating: 5 },
        { id: 2, user: "Bob", content: "Comfortable for long listening sessions.", rating: 4 },
        { id: 3, user: "Charlie", content: "Good, but battery life could be better.", rating: 3 },
      ]
    return (
      <div className="mb-8" >
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-dark-200">{comment.user}</span>
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
          <Textarea placeholder="Leave a comment..." className="mb-4" />
          <div className="flex justify-end "><Button className="bg-green-700 dark:bg-[#96FB4A] dark:hover:bg-[#89f03b] text-white hover:bg-green-900">Submit Comment <MessageCircleMore size={20}/></Button></div>
        </div>
      </div>
    )
  }


export default CommentSection