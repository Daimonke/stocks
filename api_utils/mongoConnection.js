import { MongoClient } from "mongodb";

let uri = process.env.MONGO_URI;

if (!uri) throw new Error("Missing environment variable MONGO_URI");

export async function connectToDatabase() {
  if (global.connection) return global.connection;
  if (!global.connectionPromise) {
    global.connectionPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const client = await global.connectionPromise;
  const db = await client.db("stocks");
  global.connection = {
    client,
    db,
  };
  return global.connection;
}
