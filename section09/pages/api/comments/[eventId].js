import { emailIsValid } from "../../../helpers/api-util";
import { verifyEmailExists } from "../newsletter";

export default function handler(req, res) {
  const method = req.method;
  const eventId = req.query.eventId;

  if (method === "GET") {
    const DUMMY = [
      { id: "c1", name: "MAX", text: "Comment" },
      { id: "c2", name: "JORGE", text: "Comment" },
    ];

    res.status(200).json({ comments: DUMMY });
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

    res.status(201).json({ message: "Comment added" });
  }
}
