import { emailIsValid, hashData } from "../../helpers/auth";
import { connectToDatabase } from "../../helpers/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    const { email, password } = body;

    if (!emailIsValid(email) || !password || password.length < 6) {
      res.status(422).json({
        error: "Invalid email or password",
      });
      return;
    }
    let client;

    try {
      client = connectToDatabase();
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
      return;
    }

    const db = await client.db();

    const hashedPassword = await hashData(password);

    db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });
  }

  if (method === "GET") {
  }
}
