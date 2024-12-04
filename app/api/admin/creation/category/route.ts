import { CategorySchema } from "@/lib/validation";
import Category from "@/database/category.model"
import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await dbConnect();
        const body = await req.json();
        const validatedData = CategorySchema.safeParse(body);
        if(!validatedData.success){
            return NextResponse.json(
                {success: false, error: "Validation failed", details: validatedData.error},
                {status: 400})
        }

        const {name} = validatedData.data;
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const existingCategory = await Category.findOne({name});

        if(existingCategory){
            return NextResponse.json(
                {success: false, message: "Category already exists"}, 
                {status: 400})
        }

        const existingSlug = await Category.findOne({slug});
        if(existingSlug){
            return NextResponse.json(
                {success: false, message: "Slug already exists"}, 
                {status: 400})
        }

        const newCategory = await Category.create({...validatedData.data, slug});
        return NextResponse.json({success: true, data: newCategory}, {status: 201})
    }catch(error){
        throw new Error("Internal Server Error", {cause: error})
    }
}

export async function GET(){
try{
    await dbConnect();
    const categories = await Category.find();
    return NextResponse.json({success: true, data: categories}, {status: 200})
}catch(error){
    throw new Error("Internal Server Error", {cause: error})
}
}