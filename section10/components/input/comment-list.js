import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList() {
  const [comments, setComments] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    setCommentsLoading(true);
    fetch("/api/comments/e1")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setCommentsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {commentsLoading && <p>Loading...</p>}
      <ul className={classes.comments}>
        {comments &&
          comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.text}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CommentList;
