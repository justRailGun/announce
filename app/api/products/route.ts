import dbConnect from "@/lib/dbconnect";
import BaseProduct from "@/database/products/baseProducts.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await dbConnect();
  
      const product = await BaseProduct.find().populate(['category', 'Sub-Category']);

      return NextResponse.json({ success: true, data:product});
    } catch (error) {     
        console.log(error)
    }
  }