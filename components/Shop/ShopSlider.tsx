import React from "react";
import ShopCard from "./ShopCard";
import Marquee from "react-fast-marquee";
import { SHOPS } from "@/constants/Shop";
import Link from "next/link";

const ShopSlider = () => (
<div className="flex flex-col justify-center gap-4 mt-8 " suppressHydrationWarning>
    <h2 className="text-2xl font-bold text-dark200_light800 px-8">Sponsorisé</h2>
    <Marquee className="">
    {SHOPS.map((shop,index)=>{
        return <Link href={`/shops/${shop.id}`} key={index}><ShopCard  shop={shop}/>
        </Link> 
    })}
  </Marquee>
</div>
  
);

export default ShopSlider;