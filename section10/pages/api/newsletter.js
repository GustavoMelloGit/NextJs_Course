import { emailIsValid } from "../../helpers/api-util";
import { connectDatabase, insertDocument } from "../../helpers/db-util";

export function verifyEmailExists(email) {
  const data = getStoredData();
  return data.find((item) => email === item);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email.toLowerCase();

    if (!emailIsValid(email)) {
      res.status(422).json({ message: "Invalid e-mail" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ message: "Cant connect to server" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: email });
      client.close();
    } catch (e) {
      res.status(500).json({ message: "Insert data failed" });
      return;
    }
    res.status(200).json({ message: "E-mail registrated with success" });
  }
}
