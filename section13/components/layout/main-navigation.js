import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  function handleLogout() {
    if (session) {
      signOut();
    }
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {session && !loading ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
