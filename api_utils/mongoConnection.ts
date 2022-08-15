import mongoose from "mongoose";

const con = async () =>
  mongoose.connect(process.env.MONGO_URI as string, {
    dbName: "stocks",
  });

export default con;
