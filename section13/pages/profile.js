import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const result = await getSession({ req: context.req });

  if (!result) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { result },
  };
}
export default ProfilePage;
