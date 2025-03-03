import mongoose from "mongoose"

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log("Mongo is connected")
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
