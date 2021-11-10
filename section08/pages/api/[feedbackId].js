import { parseFileData, getPath } from "./users";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const feedbackId = req.query.feedbackId;

      const filePath = getPath("users");
      const feedbackData = parseFileData(filePath);

      const selectedFeedback = feedbackData.find((feedback) => {
        return feedback.id === +feedbackId;
      });

      if (selectedFeedback) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ feedback: selectedFeedback });
      } else {
        throw new Error("Feedback not found");
      }
    } catch (e) {
      res.json({ error: e.message });
      res.status(405).end();
    }
  }
}
