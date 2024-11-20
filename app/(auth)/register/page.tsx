'use client'
import React from 'react'
import AuthForm from "@/components/forms/Form"
import { SignUpSchema } from '@/lib/validation'
const Register = () => {
  return (
    <AuthForm formSchema={SignUpSchema} 
    defaultValues={{
      name :"",
      username :"",
      email :"",
      password :""}} 
    formType='SIGN_UP'/>
  )
}

export default Register