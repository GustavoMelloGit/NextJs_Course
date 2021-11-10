import fs from "fs";
import path from "path";

export function getPath(fileName) {
  return path.join(process.cwd(), "data", fileName + ".json");
}

export function parseFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function verifyValidEmail(email) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;
    const feedback = req.body.feedback;

    if (!verifyValidEmail(email)) {
      res.status(400).json({
        error: "Invalid email",
      });
    }

    const newUser = {
      id: +new Date(),
      email,
      password,
      feedback,
    };

    const filePath = getPath("users");
    const data = parseFileData(filePath);

    if (data.find((user) => user.email === email)) {
      res.status(400).json({
        error: "Email already exists",
      });
    } else {
      data.push(newUser);
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(201).json({ message: "Success", account: newUser });
    }
  }

  if (req.method === "GET") {
    const filePath = getPath("users");
    const data = parseFileData(filePath);
    res.status(200).json(data);
  }
}
