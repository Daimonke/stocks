import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Home</title>
        <meta name="description" content="Search of company stock prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </section>
  );
};

export default Home;
