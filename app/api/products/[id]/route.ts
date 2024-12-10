import dbConnect from "@/lib/dbconnect";
import BaseProduct from "@/database/products/baseProducts.model";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } =  await params;
    console.log("Request params ID:", id); // Debug

    const product = await BaseProduct.findById(id).populate('Sub-Category', "category");
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status: 200, data: product });
  } catch (error) {
    console.error("Internal Server Error:", error); // Debug
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH({ params, request } : { params: { id: string }; request: Request }) {
  try {
    await dbConnect();
    const product = await BaseProduct.findById(params.id);
    const { name, price, description, image  } = await request.json();
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;

      await product.save();
      return NextResponse.json({ success: true, data: product });
    } else {
      return NextResponse.json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(_: Request, { params } : { params: { id: string } }) {
  try {
    await dbConnect();
    const product = await BaseProduct.findById(params.id);
    if (product) {
      await product.delete();
      return NextResponse.json({ success: true, message: "Product deleted" });
    } else {
      return NextResponse.json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
  }
}