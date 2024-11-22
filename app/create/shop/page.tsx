'use client'
import React from 'react'
import CreateForm from '@/components/forms/createForm'
import { ShopSchema } from '@/lib/validation'
const page = () => {
  const defaultValues = {
    name: "",
    description: "",
    location: "",
    adress: "",
    phone: "",
  }
  return (
    <section className='flex flex-col items-center justify-center w-full h-screen'>
      <CreateForm defaultValues={defaultValues} fetchApi='/api/create/shop' SchemaType={ShopSchema}/>
    </section>
  )
}

export default page