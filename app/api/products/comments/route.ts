import dbConnect from "@/lib/dbconnect";
import { getSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import  Comment  from "@/database/comment.model";

export async function POST(req: Request) {
    try {
      await dbConnect();
      const jsonData = await req.json();
      const {body , author , product} = jsonData;
      const validatedData = getSchema("CommentSchema").safeParse(body);
      if (!validatedData.success) {
        return NextResponse.json({ success: false, message: validatedData.error.issues[0].message }, { status: 400 });
      }
      const existingComment = await Comment.findOne({ author });
      if(existingComment){
        return NextResponse.json({ success: false, message: "You cannot Comment twice" }, { status: 400 });
      }
      const newComment = await Comment.create({ ...validatedData.data, author, product });
      console.log("Comment created:", newComment);
  
      return NextResponse.json({ success: true, data: newComment });
  
    } catch (error) {
      console.error("Internal Server Error:", error); // Debug
      return NextResponse.json({ error: "Internal Server Error"},{ status: 500 });
    }
  }   
  