import React from 'react';
import { Shop, SHOPS } from '@/constants/Shop';
import ShopHeader from '@/components/Shop/ShopHeader';
import ShopFeed from '@/components/Shop/ShopFeed';
interface Params {
  params: {
    id: string;
  };
}
const getShop = (id: string) => {
    const shop = SHOPS.find((shop) => shop.id === Number(id));
    return shop;
  }  
const getCategory = (shop: Shop) => {
    return shop.category;
  };
const page = async ({ params }: Params) => {

  const { id } = await params;
  const route = decodeURIComponent(id);
  
  const shop = getShop(route);
  const category = getCategory(shop as Shop); 
  
  return (<div className='w-full relative container mx-auto h-screen'>
      <ShopHeader	shop={shop as Shop} />
      {console.log(category)}
      <ShopFeed category ={category} />
    </div>
    
  );
};

export default page;
