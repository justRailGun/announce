import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { getSchemaModel } from "@/database";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    console.log("Request params:", params);
    const { id } =  await params;

    console.log("Request params ID:", id); 
    const transaction = await getSchemaModel("transaction")!.findById(id).populate("products");
    if (!transaction) {
      return NextResponse.json({ success: false, message: "Transaction not Found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, status: 200, data: transaction });
  } catch (error) {
    console.error("Internal Server Error:", error); 
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


