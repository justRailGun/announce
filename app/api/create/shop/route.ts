import dbConnect from "@/lib/dbconnect";
import  Shop  from "@/database/shop.model";
import { ShopSchema } from "@/lib/validation";
import { NextResponse } from "next/server";


export async function POST(request : Request){
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = ShopSchema.safeParse(body);
        if (!validatedData.success) {
            throw new Error();
        }
        const newShop = await Shop.create(validatedData.data);
        return NextResponse.json({success:true, data:newShop}, {status:201})
    }
    catch{
        return NextResponse.json({success:false, data:''}, {status:400})
    }
}