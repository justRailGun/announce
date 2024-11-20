'use client'
import AuthForm from "@/components/forms/Form"
import { SignInSchema } from "@/lib/validation";
const SignIn = () => {
  
  return (
    <AuthForm formSchema={SignInSchema} 
    defaultValues={{
      email :"",
      password :""}} 
    formType='SIGN_IN'/>
    
  )
}

export default SignIn