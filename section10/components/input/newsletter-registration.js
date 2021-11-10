import { useRef, useContext } from "react";
import { emailIsValid } from "../../helpers/api-util";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInput = useRef();
  const notification = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInput.current.value;

    notification.showNotification({
      title: "Signing in...",
      message: "Please wait",
      status: "pending",
    });
    // optional: validate input
    if (!emailIsValid(enteredEmail)) {
      console.log("Invalid e-mail");
      return;
    }
    // send valid data to API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notification.showNotification({
          title: "Success!!",
          message: "Successfully registered",
          status: "success",
        });
      })
      .catch((error) => {
        notification.showNotification({
          title: "Error!!",
          message: e.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
