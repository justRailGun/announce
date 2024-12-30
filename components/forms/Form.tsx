'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, useForm, FieldValues, Path } from "react-hook-form"
import { z ,ZodType} from "zod"
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
import Image from 'next/image'
import { signIn } from "next-auth/react"
interface Props <T extends FieldValues> {
  formSchema: ZodType<T>,
  defaultValues: T;
  formType: "SIGN_IN" | "SIGN_UP";
}


const AuthForm = <T extends FieldValues>({formSchema , defaultValues , formType} :Props<T>) => { 
 




  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T> ,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }
return (
<div className="flex flex-col items-center justify-center"  suppressHydrationWarning>
    {formType === "SIGN_IN" && <h1 className="text-dark400_light700 text-2xl font-bold mb-2">Sign In</h1>}
    {formType === "SIGN_UP" && <h1 className="text-dark400_light700 text-2xl font-bold mb-2">Sign Up</h1>}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-4">
        {Object.keys(defaultValues).map((field)=>(
            <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
                <FormItem>
                <FormLabel className="paragraph-regular text-dark400_light700">{field.name === "email" ? "Email Address" : field.name.charAt(0).toUpperCase() + field.name.slice(1)}</FormLabel>
                <FormControl>
                    <Input placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />))}
        <Button type="submit" className="w-full">{formType === "SIGN_IN" ? "Sign In" : "Sign Up"}</Button>
      </form>
    </Form>
    <div className='flex gap-4 justify-center w-full items-center'>
      <Button className="w-full" onClick={()=>signIn("google", { callbackUrl: "/" })} ><Image src="/icons/google.svg" alt="google" className='' width={20} height={20}/></Button>
      <Button className="w-full dark:bg-primary-500" onClick={()=>signIn("github",{ callbackUrl: "/" })} ><Image src="/icons/github.svg" alt="github" className='' width={20} height={20}/></Button>
      </div>
  </div>
)

}
export default AuthForm