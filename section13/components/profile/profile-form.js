import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm() {
  const oldPassword = useRef(null);
  const newPassword = useRef(null);

  async function handleChangePassword(event) {
    event.preventDefault();
    const password = oldPassword.current.value;
    const newPassword = newPassword.current.value;

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
      alert(data);
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <form className={classes.form} onSubmit={handleChangePassword}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassword} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPassword} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
