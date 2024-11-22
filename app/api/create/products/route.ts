import dbConnect from "@/lib/dbconnect";
import  baseProduct  from "@/database/products/baseProducts.model";
import { ProductSchema } from "@/lib/validation";
import { NextResponse } from "next/server";


export async function POST(request : Request){
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = ProductSchema.safeParse(body);
        if (!validatedData.success) {
            throw new Error();
        }
        const newProduct = await baseProduct.create(validatedData.data);
        return NextResponse.json({success:true, data:newProduct}, {status:201})
    }
    catch(e){
        console.log(e)
    }
}