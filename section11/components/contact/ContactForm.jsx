import { useRef, useState, useEffect } from "react";
import classes from "./ContactForm.module.css";
import Notification from "../ui/notification";

async function sendContactData(userInput) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...userInput }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export default function ContactForm() {
  const [requestStatus, setRequestStatus] = useState(""); //pending, success, error
  const [requestError, setRequestError] = useState("");
  const emailInput = useRef(null);
  const nameInput = useRef(null);
  const messageInput = useRef(null);

  useEffect(() => {
    if (requestStatus === "success" || "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function handleSubmit(event) {
    event.preventDefault();

    const email = emailInput.current.value;
    const name = nameInput.current.value;
    const message = messageInput.current.value;

    setRequestStatus("pending");

    try {
      await sendContactData({ email, name, message });
      setRequestStatus("success");
    } catch (e) {
      setRequestStatus("error");
      setRequestError(e.message);
    }

    emailInput.current.value = "";
    nameInput.current.value = "";
    messageInput.current.value = "";
  }

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: requestStatus,
      title: "Sending Message...",
      message: "Please wait while we send your message.",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: requestStatus,
      title: "Message Sent!",
      message: "Thank you for contacting us. We will get back to you soon.",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: requestStatus,
      title: "Error Sending Message!",
      message: requestError || "Something went wrong. Please try again.",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can i help you</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your e-mail</label>
            <input type="email" id="email" required ref={emailInput} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" required ref={nameInput} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            required
            ref={messageInput}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
}
