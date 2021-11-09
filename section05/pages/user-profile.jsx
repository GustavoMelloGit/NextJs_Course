export default function UserProfile(props) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>{props.username}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "max",
    },
  };
}
