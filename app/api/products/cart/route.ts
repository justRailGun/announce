import { BaseProduct } from "@/database";
import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await dbConnect();
        const {cart} = await req.json();
        console.log("received cart : ",cart)
        const products =  await BaseProduct.find({_id : {$in : cart}}).populate(["category","Sub-Category"]);
        if(!products){
            return NextResponse.json({success : false, error : "Product not found"}, {status : 404})
        }
        return NextResponse.json({success : true, data : products}, {status : 200})
    }
    catch(error){
        console.error("Error in Cart API",error)
        return NextResponse.json({success : false, error : "Internal Server Error"}, {status : 500})
    }
}