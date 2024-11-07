import { Shop } from '@/constants/Shop'
import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ShopHeader = ({shop}: {shop : Shop}) => {
    const {bannerURL , name , popularity , overallRating , numberOfOrders , location , phone , email , address} = shop;
  return (
    <section className='container py-12 max-lg:py-24 mx-auto w-full'>
      <Image src={bannerURL} width={10000} height={20} alt={`${name}`} className="w-full h-full object-contain" />

      <div className='pt-6 font-inter background-light900_dark200 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Shop information */}
        <div className='flex text-dark400_light700 flex-col gap-4'>
          <h2 className='text-2xl font-bold text-dark200_light800'>{name}</h2>
          <p className=' base-medium flex items-center gap-2'><Image className='invert-colors' src='/icons/users-group.svg' alt='users' height={24} width={24} />Popularity : {popularity} </p> 
          <div className='flex gap-4 items-center  base-medium'>
            <span>Rating :  </span>
            <Rating name="read-only" value={overallRating} className='' readOnly precision={0.1}/> {overallRating}
            </div>
        </div>
        {/* Shop information */}
        <div className='text-dark400_light700 flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-dark200_light800'>More Information</h2>
          <p className='flex items-center gap-2'><Image src="/icons/order.svg" className='invert-colors' width={24} height={24} alt={`Phone svg`} /> Order Accomplished : {numberOfOrders}</p>
          <p className='flex items-center gap-2'><Image src="/icons/pin.svg" className='invert-colors' width={24} height={24} alt={`Phone svg`} />{location}</p>
        </div>
        <div className='flex gap-2 flex-col'>
        <h2 className='text-2xl font-bold text-dark200_light800'>Contacts</h2>
          <div className='flex gap-4 items-center'>
              <Image src="/icons/phone.svg" className='invert-colors' width={24} height={24} alt={`Phone svg`} />
              <span className='text-dark400_light700 base-medium'>Phone : </span>
              <span className='text-dark400_light700 base-medium'>{phone}</span>
          </div>
            <div className='flex gap-4 items-center'>
             <Image src="/icons/email.svg" className='invert-colors' width={24} height={24} alt={`Phone svg`} />
              <span className='text-dark400_light700 base-medium'>Email : </span>
              <span className='text-dark400_light700 base-medium'>{email}</span>
            </div>
            <div className='flex gap-4 items-center'>
              <Image src="/icons/location.svg" className='invert-colors' width={24} height={24} alt={`Phone svg`} />
              <span className='text-dark400_light700 base-medium'>Address : </span>
              <span className='text-dark400_light700 base-medium'>{address}</span>
            </div>
        </div>
      </div>

      </section>
  )
}

export default ShopHeader