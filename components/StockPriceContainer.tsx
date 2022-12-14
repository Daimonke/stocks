import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { XIcon } from "@heroicons/react/outline";
import Chart from "./Chart";
import Loader from "./Loader";

export type ChartApiData = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
} | null;

const StockPriceContainer = () => {
  const ctx = useAppContext();

  const [chartData, setChartData] = useState<ChartApiData>(null);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `api/stocks/?code=${ctx.code}&starts=${ctx.starts}&ends=${ctx.ends}&name=${ctx.searchResult?.name}`
      )
      .then(({ data }) => {
        if (data.s !== "ok") {
          ctx.setSearchError("Data not found");
          return;
        }
        setChartData(data);
      })
      .catch((err) => {
        ctx.setSearchError(err.message);
        ctx.setShowStocks(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ctx.code, ctx.starts, ctx.ends, ctx]);

  const handleClose = () => {
    setShow(false);
  };
  const handleAnimation = () => {
    if (!show) ctx.setShowStocks(false);
  };

  return (
    <div className={`absolute top-0 bottom-0 left-0 right-0 overflow-hidden`}>
      <div
        className={`h-full w-full bg-gradient-to-r from-orange-800 to-sky-800 m-auto p-4 ${
          show ? "slideFromBottom" : "slideToBottom"
        }`}
        onAnimationEnd={handleAnimation}
      >
        {loading ? (
          <div className="mt-32">
            <Loader />
          </div>
        ) : (
          <>
            <button className="absolute left-4 top-4" onClick={handleClose}>
              <XIcon className="h-8 fill-sky-400 text-sky-400 rounded-full border-2 border-sky-400 p-1 hover:scale-110 transition-all" />
            </button>
            <h1 className=" text-2xl text-center mb-8 text-gray-200 max-w-[80%] mx-auto">
              <b>{ctx.searchResult?.name}</b> stock price history (
              {ctx.searchResult?.currency})
            </h1>
            <Chart data={chartData} />
          </>
        )}
      </div>
    </div>
  );
};

export default StockPriceContainer;
