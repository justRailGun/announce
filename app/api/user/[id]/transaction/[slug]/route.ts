import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbconnect'
import { getSchemaModel } from '@/database'


export async function GET(_ : Request , { params } : { params : { id : string , slug : string } }) {
    try{

    }
    catch (error) {
        return NextResponse.json({error : error})
    }
}