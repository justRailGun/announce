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
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, Path, useForm, DefaultValues } from "react-hook-form"

interface Props<T extends FieldValues>{
    defaultValues : T,
    fetchApi : string,
    SchemaType : z.ZodSchema<T> 
}

const CreateForm = <T extends FieldValues>({defaultValues, fetchApi, SchemaType } :Props<T>) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SchemaType>>({
    resolver: zodResolver(SchemaType),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  function onSubmit(values: z.infer<typeof SchemaType>) {
    fetch(fetchApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
                  {field.toString().toLowerCase()==='description' ?  
                    <Textarea
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="resize-none min-w-80"
                    {...formField} 
                  />
                    :           
                      <Input className="min-w-80" placeholder={field.charAt(0).toUpperCase() + field.slice(1)} {...formField} /> 
                    
                    }
                </FormControl>
                <FormMessage />
                </FormItem>


            )}
        />))}
        
        <Button type="submit" className='mt-2 min-w-80'>Create Now</Button>
      </form>
    </Form>
  )
}

export default CreateForm ; 

 