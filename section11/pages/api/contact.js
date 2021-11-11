import { MongoClient } from "mongodb";

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default async function handler(req, res) {
  const { method } = req;
  let client;

  if (method === "POST") {
    const { email, name, message } = req.body;

    if (!validateEmail(email) || !name || !message) {
      res.status(422).json({ message: "Invalid input" });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.sbrld.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const db = client.db();
    try {
      await db.collection("messages").insertOne(newMessage);
    } catch (e) {
      res.status(500).json({ message: "Cant connect to collections" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Message sent" });
  }
}
