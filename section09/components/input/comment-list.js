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
          <li key={comment._id}>
            <p>{comment.text}</p>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
