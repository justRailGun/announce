'use client'
import React from 'react'
import CreateForm from '@/components/forms/createForm'
import { ProductSchema } from '@/lib/validation'
const page = () => {
  const defaultValues = {
    name: "",
    description: "",
    price: "",
    category: "",
  }
  return (
    <section className='flex flex-col items-center justify-center w-full h-screen'>
      <CreateForm defaultValues={defaultValues} fetchApi="/api/create/products" SchemaType={ProductSchema}/>
    </section>
  )
}

export default page