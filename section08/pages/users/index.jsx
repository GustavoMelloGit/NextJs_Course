import Link from "next/link";
import { getPath, parseFileData } from "../api/users";

export default function Users(props) {
  const { users } = props;
  return (
    <div>
      <Link href="/">Voltar ao menu</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email}
            <button>View details</button>
          </li>
        ))}
      </ul>
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
