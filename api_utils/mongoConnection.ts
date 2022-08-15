import { MongoClient } from "mongodb";
const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

const con = async () => {
  return client.connect();
};
export default con;
