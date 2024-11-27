import dbConnect from "@/lib/dbconnect";
import  Shop  from "@/database/shop.model";
import { ShopSchema } from "@/lib/validation";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
      await dbConnect();
  
      const jsonData = await request.json();
      console.log("Received data:", jsonData); // Debugging log
  
      const { body, userId } = jsonData; // Extract the body and userId
      console.log("Extracted body:", body);
      console.log("Extracted userId:", userId);
  
      // Validate the received body
      const validatedData = ShopSchema.safeParse(body);
  
      if (!validatedData.success) {
        console.error("Validation errors:", validatedData.error.format());
        return NextResponse.json(
          { success: false, errors: validatedData.error.format() },
          { status: 400 }
        );
      }
  
      // Check for existing shop
      const existingShop = await Shop.findOne({ where: { userId } });
      if (existingShop) {
        return NextResponse.json(
          { success: false, error: "Shop already exists" },
          { status: 400 }
        );
      }
  
      // Create new shop
      const newShop = await Shop.create({ ...validatedData.data, userId });
      console.log("Shop created:", newShop);
  
      return NextResponse.json({ success: true, data: newShop }, { status: 201 });
    } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  