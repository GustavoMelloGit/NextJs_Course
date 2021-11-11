import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../helpers/posts-util";
import Head from "next/head";

export default function HomePage(props) {
  const { featuredPosts } = props;
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Gustavo's blog featured posts" />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      featuredPosts,
    },
  };
}
