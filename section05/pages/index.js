import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <Link href={`/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/NoData",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
  };
}
export default HomePage;
