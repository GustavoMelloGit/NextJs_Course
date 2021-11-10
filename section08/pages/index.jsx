import { useRef, useState } from "react";
import Link from "next/link";

function HomePage() {
  const [users, setUsers] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const feedbackRef = useRef();

  function getUsers() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredFeedback = feedbackRef.current.value;

    const body = {
      email: enteredEmail,
      password: enteredPassword,
      feedback: enteredFeedback,
    };
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <Link href="/users">Verificar usuários</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Type your email</label>
          <input type="email" placeholder="E-mail" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Type your password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            ref={passwordRef}
          />
        </div>
        <div>
          <label htmlFor="feedback">Type your feedback</label>
          <input
            type="textarea"
            placeholder="Feedback"
            id="feedback"
            ref={feedbackRef}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr />
      <button onClick={getUsers}>Load users</button>
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.email}</h3>
              <p>{user.password}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
