import ContactForm from "../../components/contact/ContactForm";
import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta
          name="description"
          content="Contact page to Gustavo's NextJs Blog"
        />
      </Head>
      <ContactForm />
    </>
  );
}
