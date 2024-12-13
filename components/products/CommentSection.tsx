'use client'
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import {MessageCircleMore} from "lucide-react";
import { useEffect , useState} from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { useSession } from "next-auth/react"
interface Comment {
  _id: number;
  author: {
    name: string;
    email: string;
    image: string;
  };
  content: string;
  rating: number;
}



const CommentSection =  ( { id } :  { id: string } )  => {
  const CommentComponent =  ({ id } :  { id: string }) => {
    
    const schema = getSchema("CommentSchema")
    const {data : session} = useSession()
    console.log(session)
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        content: "",
        rating: "",
      },
    })
  async function onSubmit(values: z.infer<typeof schema>) {
      const validatedData = schema.safeParse(values)
      const res =  await fetch(`http://localhost:3000/api/products/comments`, {
        method: 'POST',
        body: JSON.stringify({body : validatedData.data ,  product : id , email : session?.user?.email}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!res.ok){
      }
  
    }
    return(
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment here</FormLabel>
              <FormControl>
                <Textarea className="dark:bg-gray-700 placeholder:dark:text-white/80" placeholder="Share Your Opinion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rate</FormLabel>
              <FormControl>
                <Textarea  className="dark:bg-gray-700 placeholder:dark:text-white/80" placeholder="your rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
            <Button className="bg-green-700 dark:bg-[#96FB4A] dark:hover:bg-[#89f03b] text-white hover:bg-green-900">
              Submit Comment <MessageCircleMore size={20}/></Button></div>
      </form>
    </Form>
      )
  }
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<[Comment]|null>(null);
    useEffect(()=>{
      const getComments = async()=>{
        try {
          const res = await fetch(`/api/products/${id}/comments`);
          const data = await res.json();
          setComments(data);
        }
        catch(error) {
          console.error('Error fetching comments:', error);
        }
        finally{
          setLoading(false);
        }
      }

      getComments()
    },[id])
    if(loading){
      return <p>Loading...</p>
    }
    console.log(comments)
    if(!comments){
      return <><p>No comments yet be the first</p> <CommentComponent id={id}/></>
    }
    return (
      <div className="mb-8" >
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {comments && comments.map((comment) => (
          <div key={comment._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-dark-200">{comment.author.name}</span>
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
        <CommentComponent id={id}/>
      </div>
    )
  }


export default CommentSection