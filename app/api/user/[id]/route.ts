import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbconnect'
import { getSchemaModel } from '@/database'


export async function GET(_ : Request , { params } : { params : { id : string } }) { 
    try {
        await dbConnect()
        const {id} = await params ; 
        const user = await getSchemaModel('userschema')!.findById(id).populate("products")
        const comments = await getSchemaModel('comment')!.find({author : id})
        console.log('user :', comments)
            if(!user) return NextResponse.json({error : 'User not found'})
        return NextResponse.json({ success: true, status: 200, data: { user , comments } });
    } catch (error) {
        return NextResponse.json({error : error})
    }
}
