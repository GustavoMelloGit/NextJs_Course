import { emailIsValid } from "../../../helpers/api-util";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  const method = req.method;
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (e) {
    res.status(500).json({ mesage: "Database connection error" });
    return;
  }

  if (method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", -1);
      res.status(200).json({ comments: documents });
    } catch (e) {
      res.status(500).json({ message: "Get comments failed" });
    }
    client.close();
  }

  if (method === "POST") {
    const { email, name, text } = req.body;

    if (!emailIsValid(email)) {
      res.status(422).json({ message: "Invalid e-mail" });
      return;
    }
    if (name.trim().length < 2) {
      res.status(422).json({ message: "Invalid name" });
      return;
    }
    if (text.trim().length < 2) {
      res.status(422).json({ message: "Invalid comment" });
      return;
    }

    try {
      const result = await insertDocument(client, "comments", {
        ...req.body,
        eventId,
      });
      console.log(result);
    } catch (e) {
      req.status(500).json({ message: "Insert comment failed" });
      return;
    }

    res.status(201).json({ message: "Comment added" });
  }
  client.close();
}
