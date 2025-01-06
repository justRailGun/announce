import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import { getSchemaModel } from '@/database';
import { Transaction } from '@/constants/product';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {

        await dbConnect();
        const { id } = await params;

        const user = await getSchemaModel('userschema')!
            .findOne({ _id: id })
            .populate({ path: 'products', populate: { path: 'user' } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' });
        }

        const comments = await getSchemaModel('comment')!
            .find({ author: id })
            .populate({ path: 'product', populate: { path: 'category', select: 'name' } });


        const Owntransaction = await getSchemaModel('transaction')!
            .find({ userId: id })
            .populate({ path: 'userId', populate: { path: 'products' } });

        const sold = await getSchemaModel('transaction')!
            .find()
            .populate({ path : 'products' , populate : { path : 'category' , select : 'name'}});

        const productsSoldWithQuantities = sold.flatMap((transaction: Transaction) =>
            transaction.products.map((product, index) => ({
                product,
                quantity: transaction.quantity[index] || 0, 
            })) || []
        );

        const filteredProducts = productsSoldWithQuantities.filter(
            (item) => item.product.user.toString() === id
        );
        return NextResponse.json({
            success: true,
            status: 200,
            data: {
                user,
                comments,
                Owntransaction,
                filteredProducts,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}
