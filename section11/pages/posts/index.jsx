import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../helpers/posts-util";

export default function AllPostsPage(props) {
  const { allPosts } = props;
  return <AllPosts posts={allPosts} />;
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts,
    },
  };
}
