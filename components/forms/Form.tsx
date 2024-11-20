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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className="w-full ">{formType === "SIGN_IN" ? "Sign In" : "Sign Up"}</Button>
      </form>
    </Form>
)

}
export default AuthForm