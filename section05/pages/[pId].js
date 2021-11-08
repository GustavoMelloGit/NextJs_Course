import fs from "fs/promises";
import path from "path";

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <h4>{loadedProduct.description}</h4>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pId;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pId: id } }));

  return {
    paths: params,
    fallback: false,
  };
}
