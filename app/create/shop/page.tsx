import React from 'react'
import CreateForm from '@/components/forms/createForm'
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
      <CreateForm defaultValues={defaultValues}/>
    </section>
  )
}

export default page