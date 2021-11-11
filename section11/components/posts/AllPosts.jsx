import classes from "./AllPosts.module.css";
import PostsGrid from "./PostsGrid";

export default function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
