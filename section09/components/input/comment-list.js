import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList() {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch("/api/comments/e1")
      .then((res) => res.json())
      .then((data) => setComments(data.comments))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ul className={classes.comments}>
      {comments &&
        comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
          </li>
        ))}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
