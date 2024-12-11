import dbConnect from "@/lib/dbconnect"
import Category from "@/database/category.model"

// GET /api/category (reading all categories)

export const GET = async () => {
    try {
        await dbConnect();

        const categories = await Category.find();
        return new Response(JSON.stringify(categories), {
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