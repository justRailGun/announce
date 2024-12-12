import dbConnect from "@/lib/dbconnect";

import  Comment  from "@/database/comment.model";


export const GET = async (_ : Request, {params} : {params : {id : string}}) => {
  try {
      await dbConnect();
      const id = await params.id;
      const comments = await Comment.find({
          author: id
      }).populate('creator');
      return new Response(JSON.stringify(comments), {
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