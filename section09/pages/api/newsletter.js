import fs from "fs";
import path from "path";
import { emailIsValid } from "../../helpers/api-util";

export function getDataPath(fileName) {
  return path.join(process.cwd(), "data", fileName + ".json");
}
export function getStoredData() {
  const dataPath = getDataPath("newsletter");
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

export function storeData(email, fileName) {
  const data = getStoredData();

  data.push(email);
  fs.writeFileSync(getDataPath(fileName), JSON.stringify(data));
}

export function verifyEmailExists(email) {
  const data = getStoredData();
  return data.find((item) => email === item);
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email.toLowerCase();

    if (!emailIsValid(email)) {
      res.status(422).json({ message: "Invalid e-mail" });
      return;
    }
    if (verifyEmailExists(email)) {
      res.status(400).json({ message: "E-mail already exists" });
      return;
    }

    storeData(email, "newsletter");
    res.status(200).json({ message: "E-mail registrated with success" });
  }
}
