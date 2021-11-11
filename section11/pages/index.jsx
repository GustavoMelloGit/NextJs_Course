import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../helpers/posts-util";

export default function HomePage(props) {
  const { featuredPosts } = props;
  return (
    <>
      <div>
        <Hero />
        <FeaturedPosts posts={featuredPosts} />
      </div>
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
