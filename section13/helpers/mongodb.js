import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.sbrld.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  let client;
  try {
    client = await MongoClient.connect(connectionString);
  } catch (e) {
    throw new Error("Cant connect do database");
  }
  return client;
}
