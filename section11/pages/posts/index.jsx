import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../helpers/posts-util";
import Head from "next/head";

export default function AllPostsPage(props) {
  const { allPosts } = props;
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta name="description" content="All posts of Gustavo's NextJs blog" />
      </Head>
      <AllPosts posts={allPosts} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts,
    },
  };
}
