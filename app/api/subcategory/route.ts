import dbConnect from "@/lib/dbconnect";
import SubCategory from "@/database/subCategory.model";

// GET /api/category (reading all categories)

export const GET = async () => {
    try {
        await dbConnect();

        const subcategory = await SubCategory.find();
        return new Response(JSON.stringify(subcategory), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            statusText: 'Internal Server Error',
        })
    }
}