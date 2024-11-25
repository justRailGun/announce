import dbConnect from "@/lib/dbconnect";
import BaseProduct from "@/database/products/baseProducts.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await dbConnect();
  
      const product = await BaseProduct.find();
      
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        console.log(error)
    }
  }