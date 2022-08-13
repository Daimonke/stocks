import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ResultsContainer from "../components/ResultsContainer";
import SearchForm from "../components/SearchForm";

const Home: NextPage = () => {
  return (
    <section className="max-w-5xl m-auto mx-auto">
      <Head>
        <title>Home</title>
        <meta name="description" content="Search of company stock prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchForm />
      <ResultsContainer />
    </section>
  );
};

export default Home;
