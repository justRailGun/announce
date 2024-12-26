'use client'
import { Product } from '@/constants/product'
import React from 'react'
import { useSession } from 'next-auth/react'
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { getSchema } from '@/lib/validation';
import { getDefaultValues } from '@/constants/DefaultValues';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';
interface ShippingFormProps {
    products: Product[];
  }
const ShippingForm =  ({products} : ShippingFormProps) => {
    const ShippingSchema = getSchema("ShippingSchema")
    const formDefaultValues = getDefaultValues("ShippingForm")
    const {data:session} = useSession()
    const totalCost = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof ShippingSchema>>({
        resolver: zodResolver(ShippingSchema),
        defaultValues: formDefaultValues as z.infer<typeof ShippingSchema>});
         
    async function onSubmit(values: z.infer<typeof ShippingSchema>) {
        const res = await fetch('http://localhost:3000/api/cart', {
          method :  "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({body:values, user : session?.user , totalCost : totalCost , products : products}),
        })
        if(res.ok){
          const responseBody = await res.json(); // Parse the response body
          const id = responseBody._id 
          const userID = responseBody.userId 
          redirect(`http://localhost:3000/user/${userID}/transaction/${id}`)
          toast({
            title : "Shipping Form Submitted",
            description : "Your Shipping Form has been submitted",
          })
          redirect(`/cart/${id}/${userID}`)
        }else{
          toast({
            title : "Error",
            description : "Something went wrong",
            variant: "destructive",
          })
        }
        console.log("values",{...values})
        
      }
  return (
    <Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="m-4 border p-4 rounded-lg"
  >
    {Object.keys(formDefaultValues).map((key) => {
      if (key !== "Delivery-Instructions") {
        const section = formDefaultValues[key as keyof typeof formDefaultValues];
        return (
          <div key={key} className="flex flex-col my-4">
            <h1 className="text-2xl font-SpaceGrotesk">
              {key.replace(/ /g, "-")}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(section).map((subKey) => (
                <FormField
                  key={subKey}
                  control={form.control}
                  name={`${key}.${subKey}` as "name"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={subKey} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="w-full px-6 h-[2px] bg-gray-200 rounded-full mt-4"></div>
          </div>
        );
      } else {
        return (
          <div className="my-4" key={key}>
            <FormField
              control={form.control}
              name={key as "name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{key}</FormLabel>
                  <FormControl>
                    <Input placeholder={key} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      }
    })}
    <div className='py-2 border px-4 rounded-lg'>
      <h1 className="text-2xl font-SpaceGrotesk text-black/60">Total Cost: ${totalCost.toLocaleString("fr-FR")}</h1>
    </div>
    <Button type="submit" className="w-full mt-8">
      Submit
    </Button>
    
  </form>
</Form>

  )
}

export default ShippingForm