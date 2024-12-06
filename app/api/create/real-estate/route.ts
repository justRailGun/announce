import dbConnect from "@/lib/dbconnect";
import  RealEstate  from "@/database/products/realEstate.model";
import { getSchema } from "@/lib/validation";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        // Connexion à la base de données
        await dbConnect();

        // Récupérer et valider les données
        const body = await request.json();
        console.log("Request body:", body); // Debug
        const validatedData = getSchema("ProductSchema").merge(getSchema('Real Estate')).safeParse(body);
        console.log("validatedData:", validatedData); // Debug
        if (!validatedData.success) {
            console.error("Validation errors:", validatedData.error.format());
            return NextResponse.json(
                { success: false, errors: validatedData.error.format() },
                { status: 400 }
            );
        }

        // Création du produit
        const newRealEstate = await RealEstate.create(validatedData.data);
        console.log("RealEstate created:", newRealEstate); // Debug

        return NextResponse.json({ success: true, data: newRealEstate }, { status: 201 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}