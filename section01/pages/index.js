import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <Link href="/about">About</Link>
      <Link href="/blog/post1">Blog</Link>
    </div>
  );
}
