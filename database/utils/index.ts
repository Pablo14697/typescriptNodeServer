import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost/mydb", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
