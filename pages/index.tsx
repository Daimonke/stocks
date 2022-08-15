import type { NextPage } from "next";
import Head from "next/head";
import ResultsContainer from "../components/ResultsContainer";
import SearchForm from "../components/SearchForm";
import StockPriceContainer from "../components/StockPriceContainer";
import { useAppContext } from "../context/context";

const Home: NextPage = () => {
  const ctx = useAppContext();
  return (
    <section className="max-w-5xl my-4 mx-auto overflow-hidden">
      <Head>
        <title>Home</title>
        <meta name="description" content="Search of company stock prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchForm />
      <ResultsContainer />
      {ctx.showStocks && <StockPriceContainer />}
    </section>
  );
};

export default Home;
