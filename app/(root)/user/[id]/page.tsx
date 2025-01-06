import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/constants/product'
import React from 'react'
import OwntransactionCard from '@/components/order/OwnTransactionCard'
import CommentCard from '@/components/products/CommentCard'
import SellerProductCard from '@/components/products/SellerProductCard'
interface Comment {
  _id: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  product: Product;
  author: string;
}
interface SoldProduct {
  product: Product;
  quantity: number;
}
interface TransactionCardProps {
  _id: string
  products: string[]
  productCount: number
  totalCost: number
  date: string
  customerName: string
  customerEmail: string
  customerPhone: string
  "Shipping Adress" : {
    _id : string
    address : string
    city : string
    "Zip Code" : string
    country : string
  }
  'User Information' : {
    _id : string
    name : string
    email : string  
    phone : string
  }
  createdAt : string
}

const page = async ({params} : {params : Promise<{ id : string }>}) => {
  
    const {id} = await params
    const res  = await fetch(`http://localhost:3000/api/user/${id}`) 
    const data = await res.json()
    const products = data.data.user.products
    const comments = data.data.comments
    const transactions = data.data.Owntransaction
    const sold = data.data.filteredProducts 
    function getReviewNote(rating : 1 | 2 | 3 | 4 | 5) : "Excellent" | "Good" | "Average" | "Poor" | "Terrible" {
      const notes = {
        1: 'Terrible',
        2: 'Poor',
        3: 'Average',
        4: 'Good',
        5: 'Excellent',
      };
      return notes[rating] as "Excellent" | "Good" | "Average" | "Poor" | "Terrible";
    }
  return (
  <main className="max-xl:pt-24 pt-24 container mx-auto flex flex-col gap-4">
      {transactions.length > 0 &&
       <>
      <h1 className='text-3xl'>User Transaction</h1>
      <div className='flex'>
    
      {transactions.map((transaction : TransactionCardProps)=>{
        return <OwntransactionCard 
        key={transaction._id} 
        transactionId={transaction._id} 
        productCount={transaction.products.length} 
        totalCost={transaction.totalCost} 
        date={transaction.createdAt} 
        customerName={transaction['User Information'].name} 
        customerEmail={transaction['User Information'].email} 
        customerPhone={transaction['User Information'].phone} 
        shippingAddress={transaction["Shipping Adress"].address} 
        />
      })} 
      </div></> }
      
      {sold.length > 0 &&
      <>
      <h1 className='text-3xl'>User Sold Products</h1> 
      <div className="flex gap-4">
        {sold.map((item :  SoldProduct)=>{
          return <SellerProductCard key={item.product._id} 
          name={item.product.name} 
          category={item.product.category.name}
          price={item.product.price} 
          image={item.product.image} 
          quantity={item.quantity} 
          />
        })}
      </div>
      </>
}
    <h1 className='text-3xl mt-8'>User Product</h1>
    <div className='grid grid-cols-4 gap-4'>
       {products.map((product: Product, index : number)=>{
        return <ProductCard key={index} product={product} />
      })}
    </div>
     <div>
      <h1 className='text-3xl my-8'>User Review</h1>
      <div className='grid grid-cols-4 gap-4'>
        {comments.map((comment : Comment)=>{
          return <CommentCard 
                    key={comment._id} 
                    productImage={comment.product.image} 
                    productName={comment.product.name} 
                    productCategory={comment.product.category.name} 
                    rating={comment.rating} comment={comment.content} 
                    reviewNote={getReviewNote(comment.rating)} 
                    creator={comment.author}
                  />
        })}
      </div>
     </div>
      </main>
  )
}

export default page