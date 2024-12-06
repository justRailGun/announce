'use client'
import AuthForm from "@/components/forms/Form"
import { getSchema } from "@/lib/validation";
const SignIn = () => {
  
  return (
    <AuthForm formSchema={getSchema("SignInSchema")} 
    defaultValues={{
      email :"",
      password :""}} 
    formType='SIGN_IN'/>
    
  )
}

export default SignIn