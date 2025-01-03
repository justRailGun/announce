import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/constants/product'
import React from 'react'

import CommentCard from '@/components/products/CommentCard'
interface Comment {
  _id: string;
  content: string;
  rating: number;
  product: Product;
}
const page = async ({params} : {params : Promise<{ id : string }>}) => {
    const {id} = await params
    const res  = await fetch(`http://localhost:3000/api/user/${id}`) 
    const data = await res.json()
    console.log('data :', data) 
    const products = data.data.user.products
    const comments = data.data.comments
    console.log('comments :', comments)

    function getReviewNote(rating) {
      const notes = {
        1: 'Terrible',
        2: 'Poor',
        3: 'Average',
        4: 'Good',
        5: 'Excellent',
      };
      return notes[rating] || 'No Rating';
    }
    
  return (
  <main className="max-xl:pt-24 pt-24 container mx-auto flex flex-col gap-4">
    <h1 className='text-3xl mt-8'>User Product</h1>
    <div className='grid grid-cols-4 gap-4'>
       {products.map((product: Product, index : number)=>{
        return <ProductCard key={index} product={product}/>
      })}
    </div>
     <div>
      <h1 className='text-3xl mt-8'>User Review</h1>
      <div className='grid grid-cols-4 gap-4'>
        {comments.map((comment : Comment)=>{
          return <CommentCard 
                    key={comment._id} 
                    productImage={comment.product.image} 
                    productName={comment.product.name} 
                    productCategory={comment.product.category.name} 
                    rating={comment.rating} comment={comment.content} 
                    reviewNote={getReviewNote(comment.rating)} 
                  />
        })}
      </div>
     </div>
      </main>
  )
}

export default page