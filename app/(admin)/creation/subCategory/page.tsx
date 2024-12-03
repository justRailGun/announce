"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {SubCategorySchema} from "@/lib/validation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"


export default function ProfileForm() {
  // ...
  const form = useForm<z.infer<typeof SubCategorySchema>>({
    resolver: zodResolver(SubCategorySchema),
    defaultValues: {
      name:"",
      category: "",
    },
  })
  type Category = {
    _id: number;
    name: string;
    slug: string;
  }

  const [categories, setCategories] = useState<Category[]>([])
  const {toast} = useToast()
  useEffect(()=>{
    const fetchCategories = async () => {
        const res = await fetch("/api/admin/creation/category");
        const {data} = await res.json();
        if (res.status === 200) setCategories(data);
      };
      
      fetchCategories();
  },[])
  async function onSubmit(values: z.infer<typeof SubCategorySchema>) {
    
    const res =  await fetch('/api/admin/creation/category/subCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if(res.ok){
      toast({
        title: "SubCategory Created",
        description: "SubCategory created successfully",
      })
      form.reset();
    }
    else{
      toast({
        title : "Error",
        description : "SubCategory Already exists",
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {categories.map((item)=>(
                        <SelectItem key={item._id} value={item.slug}>{item.name}</SelectItem>
                    ))}

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
             <FormItem>
              <FormLabel>Sub-Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Sub-Category Name" {...field} />
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
