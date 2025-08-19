import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("No MONGODB_URI env variable set");
  }
  if (isConnected) {
    return console.log("=> using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ReStack",
    });
    isConnected = true;
    return console.log("=> using new database connection");
  } catch (err) {
    console.log(err);
  }
};
