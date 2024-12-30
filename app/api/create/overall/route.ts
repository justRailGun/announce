import dbConnect from "@/lib/dbconnect";
import { getSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import Category from "@/database/category.model";
import { getSchemaModel } from "@/database";
import User from "@/database/user.model";

export async function POST(request: Request) {
    try {
        // Connexion à la base de données
        await dbConnect();

        // Récupérer et valider les données
        const {body , usermail} = await request.json();
        console.log("Request body:", body);
        console.log("Request usermail:", usermail);
        const getCategoryName = await Category.findById(body.category);
        const validatedData = getSchema("ProductSchema").merge(getSchema(getCategoryName.name)).safeParse(body);

        if (!validatedData.success) {
            console.error("Validation errors:", validatedData.error.format());
            return NextResponse.json(
                { success: false, errors: validatedData.error.format() },
                { status: 400 }
            );
        }

        // Création du produit
        const ProductModel =  getSchemaModel(getCategoryName.name);
        const newUser  = await User.findOne({email  : usermail});
        if(!newUser){
            return NextResponse.json(
                { success: false, errors: "User not found" },
                { status: 400 }
            );
        }
        console.log("User :", newUser._id);
        const newProduct = await ProductModel!.create({...validatedData.data , user : newUser._id});
        
        // Ajout de l'ID du produit au tableau "products" de l'utilisateur
        newUser.products.push(newProduct._id); // Ajout en mémoire
        await newUser.save(); // Sauvegarde en base de données
        console.log("Product created:", newProduct); // Debug

        return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
