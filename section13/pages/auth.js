import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

function AuthPage() {
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace("/profile");
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  } else {
    return { props: { session } };
  }
}
export default AuthPage;
