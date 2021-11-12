import { getSession } from "next-auth/client";
import { hashData, verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/mongodb";

export default async function changePassword(req, res) {
  const { method } = req;

  if (method === "PATCH") {
    const { body } = req;
    const { password, newPassword } = body;

    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (password && newPassword) {
      const { email } = session.user;
      const client = await connectToDatabase();
      const usersCollection = client.db().collection("users");

      const user = await usersCollection.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        client.close();
        return;
      }

      const currentPassword = user.password;
      const passwordAreEqual = await verifyPassword(
        newPassword,
        currentPassword
      );

      if (passwordAreEqual) {
        res.status(403).json({ message: "Password do not match" });
        client.close();
        return;
      }

      const hashedNewPassword = await hashData(newPassword);

      await usersCollection.updateOne(
        { email: email },
        { $set: { password: hashedNewPassword } }
      );
      client.close();
      res.status(200).json({ message: "Password changed" });
    }
  }
}
