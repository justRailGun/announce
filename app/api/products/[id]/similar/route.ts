import dbConnect from "@/lib/dbconnect";

import  baseProduct  from "@/database/products/baseProducts.model";


export const GET = async (_ : Request, context: { params: { id: string } }) => {
  try {
      await dbConnect();
      const { id } = await context.params;
     
      const product = await baseProduct.findById(id);
      if(!product){
        return new Response(JSON.stringify("No Products yet!"),{
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
      })}
// 
      const similarProducts = await baseProduct.find({category: product.category, _id: { $ne: product._id }}).limit(4);
      if(product){
        return new Response(JSON.stringify(similarProducts), {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
      })
      }
      else return new Response(JSON.stringify("No Similar Products yet!"),{
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
      })
  } catch (error) {
      return new Response(JSON.stringify(error), {
          status: 500,
          statusText: "internal server Error"
      })
  }
}