/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from "@/components/ui/button"
import {  Product } from '@/constants/product'
import ImageSlider from '@/components/products/Image'
import { Heart, ShoppingCart, CircleDollarSign   } from 'lucide-react'
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import {use , useEffect, useState} from 'react'
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import CommentSection from "@/components/products/CommentSection"
import SimilarProducts from "@/components/products/SimilarProduct"

 function ProductDetails( {product } : { 
    product : Product,
   }) {
  const {  name, description , price,numberOfRatings, rating , category , "Sub-Category" : SubCategory} = product
  
  return (
    <div className="w-full container p-2 mx-auto">
      <div className="flex flex-col gap-8 md:gap-4 items-start">
        <h1 className="h1-bold md:text-4xl flex justify-between">{category.name} - {SubCategory.name} - {name}</h1>
        <div className="paragraph-regular md:text-lg">
          <h2 className="text-2xl mb-4">Product Description :</h2>
          <p>{description}</p>
          </div>
        <div className="md:text-[20px] paragraph-regular w-full flex flex-col md:justify-between md:flex-row gap-4 md:gap-2">
          <div className="flex items-center gap-2 justify-between"><p>Rating:</p>  
            <Rating name="half-rating-read" emptyIcon={<StarIcon style={{ opacity: 1 }}  fontSize="inherit" />} defaultValue={rating} precision={0.5} readOnly />
            <span className="text-light-400">({numberOfRatings} reviews)</span>
          </div>
          <p className="font-inter font-semibold text-4xl"> {price.toLocaleString("fr-FR")} <span className='text-yellow-300'>€</span></p>
        </div>

        <div className="w-full flex justify-between gap-4 md:justify-end items-center">
          <Button >
            Add to Cart <ShoppingCart size={20}/>
            </Button>
          <Button>Add to Wishlist <Heart size={20} className=""/></Button>
          <Button className="bg-green-700 dark:bg-[#386515] dark:hover:bg-[#89f03b] dark:text-white hover:bg-green-900">Buy Now <CircleDollarSign size={20}/></Button>
        </div>

      </div>
    </div>
  )
}





export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = use(params).id;
  const [produit, setProduit] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product data');
        const data = await res.json();
        setProduit(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) {
    return <SkeletonCard />;
  }

  if (!produit) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <ImageSlider />
      <ProductDetails product={produit} />
      <CommentSection id={id}/>
      <SimilarProducts id={id}/>
    </>
  );
}