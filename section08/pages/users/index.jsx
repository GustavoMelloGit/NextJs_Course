import Link from "next/link";
import { useState } from "react";
import { getPath, parseFileData } from "../api/users";

export default function Users(props) {
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const { users } = props;

  async function loadFeedbackHandler(id) {
    fetch("/api/" + id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const response = data.feedback;
        setSelectedFeedback(response.feedback);
      })
      .catch((err) => {
        console.log("Erro: " + err);
      });
  }
  return (
    <div>
      <Link href="/">Voltar ao menu</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email}
            <button onClick={loadFeedbackHandler.bind(null, user.id)}>
              View details
            </button>
          </li>
        ))}
      </ul>
      {selectedFeedback && <p>{selectedFeedback}</p>}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = getPath("users");
  const data = parseFileData(filePath);

  return {
    props: {
      users: data,
    },
  };
}
