import dbConnect from "@/lib/dbconnect";

import  Comment  from "@/database/comment.model";


export const GET = async (_ : Request, context: { params: { id: string } }) => {
  try {
      await dbConnect();
      const { id } = await context.params;
      const comments = await Comment.find({product: id}).populate("author");
      if(comments){
        return new Response(JSON.stringify(comments), {
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
      })
      }
      else return new Response(JSON.stringify("No comments yet be the first"),{
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          }
      })
      
  } catch (error) {
      return new Response(JSON.stringify(error), {
          status: 500,
          statusText: "internal server Error"
      })
  }
}