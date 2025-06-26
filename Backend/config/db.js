import mongoose, { Mongoose } from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://amarjeetgiri020:AMAR0000@cluster0.8lohpoo.mongodb.net/food-dell"
  ).then(()=> console.log("DB Connected")
  )
};
