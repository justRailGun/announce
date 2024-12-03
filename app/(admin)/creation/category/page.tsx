"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {CategorySchema} from "@/lib/validation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"



export default function ProfileForm() {
  // ...
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name:"",
    },
  })
 const {toast} = useToast()

  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    
    const res =  await fetch('/api/admin/creation/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if(res.ok){
      toast({
        title: "Category Created",
        description: "Category created successfully",
      })
      form.reset();
    }
    else{
      toast({
        title : "Error",
        description : "Category Already exists",
        variant: "destructive",
      })
    }
    
  }
  return (
  <div className="w-full flex justify-center items-center min-h-screen">

  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Category Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
