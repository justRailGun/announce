import dbConnect from "@/lib/dbconnect";
import { getSchemaModel } from "@/database";
import { getSchema } from "@/lib/validation";
import { Product } from "@/constants/product";
import { NextResponse } from "next/server";
export async function POST(req : Request) {
    
    try {
        await dbConnect();
        const {body , user , totalCost , products} = await req.json();
        const validatedData = getSchema("ShippingSchema").safeParse(body);
        const newUser = await getSchemaModel("userschema")!.findOne({email : user.email});
        const productsId = products.map((product : Product) => product._id);
        const quantity = products.map((product : Product) => product.quantity);
        const transaction = await getSchemaModel("transaction")!.create({...validatedData.data , userId : newUser._id, totalCost : totalCost , products : productsId , quantity : quantity});
        return new NextResponse(JSON.stringify(transaction), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}