import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  return (
    <div>
      <h1>{slug}</h1>
      <p>This is the blog post content.</p>
    </div>
  );
}
