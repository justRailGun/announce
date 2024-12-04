import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbconnect";
import {SubCategorySchema} from "@/lib/validation";
import SubCategory from "@/database/subCategory.model";
import Category from '@/database/category.model';



export async function POST(req: NextRequest) {
    const body = await req.json();
    try{
        await dbConnect();
        const validatedData = SubCategorySchema.safeParse(body);
        if(!validatedData.success){
            return NextResponse.json(
                {success : false , error :"Validation Failed" , details : validatedData.error}, 
                {status : 400})
        }
        const {name, category} = validatedData.data;
        const existingName= await SubCategory.findOne({name});
        if(existingName){
            return NextResponse.json(
                {success : false , message: "Sub Category Already Existe"},
                {status : 400})
        }
        const existingCategory = await Category.findOne({_id: category});
        if(!existingCategory){
            return NextResponse.json(
                {success : false , message: "Category Doesn't Exist"},
                {status : 401})
        }
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const existingSlug = await SubCategory.findOne({slug});
        if(existingSlug){
            return NextResponse.json(
                {success : false , message: "Slug Already Existe"},
                {status : 400})
        }
        const newSubCategory = await SubCategory.create({name , parentCategory: category, slug});
        return NextResponse.json({success : true , message : "Sub Category Created" , data : newSubCategory});
    }
    catch(error){
        console.error("Error creating sub category:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function GET() {
    try {
        await dbConnect();
        const subCategory = await SubCategory.find();
        return NextResponse.json({success: true, data: subCategory}, {status: 200})
    }
    catch(error){
        throw new Error("Internal Server Error", {cause: error})
    }
}