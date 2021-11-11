import classes from "./PostItem.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;
  const transformedDate = new Date(date).toLocaleDateString();
  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{transformedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
