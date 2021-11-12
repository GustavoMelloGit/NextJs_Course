import { useState, useRef } from "react";
import { emailIsValid } from "../../helpers/auth";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/signIn", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (!emailIsValid(email)) {
      alert("Invalid email");
      return;
    }

    if (isLogin) {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (response.ok) {
        router.replace("/profile");
      }
    } else {
      try {
        const data = await createUser(email, password);
        console.log(data);
      } catch (err) {
        alert(err.message);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
