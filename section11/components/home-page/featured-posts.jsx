import PostsGrid from "../posts/PostsGrid";
import classes from "./featured-posts.module.css";

export default function FeaturedPosts(props) {
  const { posts } = props;

  return (
    <section className={classes.latest}>
      <h2>Featured posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
