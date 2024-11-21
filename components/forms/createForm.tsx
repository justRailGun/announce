'use client'


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

import { z, ZodType } from "zod"
 
import { ShopSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, Path, useForm } from "react-hook-form"
interface Props<T extends FieldValues>{
    defaultValues : ZodType<T>
}

const CreateForm = <T extends FieldValues>({defaultValues } :Props<T>) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ShopSchema>>({
    resolver: zodResolver(ShopSchema),
    defaultValues: defaultValues,
  })

  function onSubmit(values: z.infer<typeof ShopSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 justify-center">
        {Object.keys(defaultValues).map((field,index)=>(
            <FormField
            key={index}
            control={form.control}
            name={field as Path<T>}
            render={({ field : formField}) => (
                <FormItem>
                <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                <FormControl>
                    <Input placeholder={field.charAt(0).toUpperCase() + field.slice(1)} {...formField} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />))}
        
        <Button type="submit" className='mt-2 w-full'>Submit</Button>
      </form>
    </Form>
  )
}

export default CreateForm ; 

 