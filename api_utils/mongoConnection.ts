import { MongoClient } from "mongodb";
const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

const con = async () => {
  client.connect();
  return client.db("stocks").collection("logs");
};
export default con;
