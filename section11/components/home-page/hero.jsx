import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/profile.jpg"
          alt="Profile picture showing Gustavo"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, i'm Gustavo</h1>
      <p>I am a student of Universidade Federal de Ouro Preto</p>
    </section>
  );
}
