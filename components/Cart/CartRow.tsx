'use client'
import { Product } from '@/constants/product'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';
import React from 'react'
import Counter from './Counter';
import { Trash , ClipboardList} from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
interface CartProduct extends Product {
    quantity: number;
}

interface CartRowProps {
    product : CartProduct;
    plusQuantity : (id : string) => void;
    minusQuantity : (id : string) => void;
    handleDelete : (id : string) => void;
}
const CartRow = ({product , plusQuantity , minusQuantity , handleDelete} : CartRowProps) => {
    const {name,image,price ,description, _id, category,"Sub-Category" : subCategory} = product;

  return (
    <div className='flex mx-auto flex-col w-[400px] p-4 border m-4 rounded-lg border-dark200_dark300 sm:w-[500px] md:w-[600px] xl:w-[800px] dark:border-dark700_dark800 '>
        <div className='py-2'>
            <h2>{category.name}</h2>
        </div>

        <div className='flex flex-col sm:block justify-between'>
            {/* first half */}
            <div className='flex items-center gap-2 mb-4'>
                <Image src={image} alt="product" width={100} height={100} className="mt-2 rounded-full"/>
                <div className='flex flex-col gap-2'>
                    <Badge className='w-16 text-xs text-center'>{subCategory.name}</Badge>
                    <h1 className='text-lg'>{name}</h1>
                    <p className='text-black/60 text-sm '>{description}</p>
                </div>
            </div>

            {/* second half */}
            <div className='flex flex-col items-end gap-2'>
                <h2 className='text-lg '>${(price*product.quantity).toLocaleString("fr-FR")}</h2>
                <div className='flex w-full gap-4 justify-end items-center'>
                    <div className='flex ml-4 gap-8 items-center justify-start md:mr-4 md:justify-end w-full'>
                        <Button className='px-4 py-2 bg-blue-500 hover:bg-blue-600'><Link href={`http://localhost:3000/products/${_id}`}><ClipboardList size={32}/> </Link></Button>
                        <Button className='px-4 py-2 bg-red-600 hover:bg-red-700' onClick={()=>handleDelete(_id)}><Trash size={32}/> </Button>
                    </div>
                    
                    <Counter
                    quantity={product.quantity}
                    plusQuantity={() => plusQuantity(_id)}
                    minusQuantity={() => minusQuantity(_id)}
                    />
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default CartRow