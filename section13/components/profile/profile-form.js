import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm() {
  const oldPasswordInput = useRef();
  const newPasswordInput = useRef();

  async function handleChangePassword(event) {
    event.preventDefault();
    const password = oldPasswordInput.current.value;
    const newPassword = newPasswordInput.current.value;

    try {
      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify({ password, newPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Cant connect to server");
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form className={classes.form} onSubmit={handleChangePassword}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInput} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInput} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
