import mongoose from "mongoose";




const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default dbConnect