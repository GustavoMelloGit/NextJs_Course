import PostContent from "../../components/posts/PostDetail/PostContent";
import {
  getPostData,
  getPostFiles,
  removeFileExtension,
} from "../../helpers/posts-util";

export default function PostDetailPage(props) {
  return <PostContent post={props.post} />;
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostFiles();
  const slugs = postFileNames.map((file) => removeFileExtension(file));
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}
