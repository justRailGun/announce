import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbconnect'
import { getSchemaModel } from '@/database'


export async function GET(_ : Request , { params } : { params : { id : string } }) {
    try{
        await dbConnect()
        const {id} = await params ; 
        const transaction = await getSchemaModel('transaction')!.find({userId : id }).populate("products")
            if(!transaction) return NextResponse.json({error : 'User not found'})
        return NextResponse.json({ success: true, status: 200, data: { transaction } });
    }
    catch (error) {
        return NextResponse.json({error : error})
    }
}