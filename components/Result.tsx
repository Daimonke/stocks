import Image from "next/image";
import React from "react";
import { PresentationChartLineIcon } from "@heroicons/react/solid";
import { useAppContext } from "../context/context";

const Result = () => {
  const ctx = useAppContext();

  const handleStocks = (): void => {
    if (!ctx.starts || !ctx.ends) {
      ctx.setSearchError("Please select a start and end date");
      return;
    }
    ctx.setShowStocks(!ctx.showStocks);
  };

  return ctx.searchResult && !ctx.loading ? (
    <div className="flex items-center gap-8 bg-gradient-to-l from-blue-800/80 to-black/60 py-3 px-4 rounded-xl border-2 border-blue-900 shadow-md shadow-black">
      <div className="flex items-center">
        <Image
          className="rounded-full"
          src={ctx.searchResult.logo}
          alt={ctx.searchResult.name}
          width={150}
          height={150}
          unoptimized
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{ctx.searchResult.name}</h1>
        <p>
          <b>Country:</b> {ctx.searchResult.country}
        </p>
        <p>
          <b>Currency</b>: {ctx.searchResult.currency}
        </p>
        <p>
          <b>Website:</b>{" "}
          <a
            className="text-sky-400"
            href={ctx.searchResult.weburl}
            target="_blank"
            rel="noreferrer"
          >
            {ctx.searchResult.weburl}
          </a>
        </p>
        <button
          className="flex items-center mt-2 gap-1 py-1 px-2 border-2 border-gray-300 rounded-md bg-blue-800 text-gray-300"
          onClick={handleStocks}
        >
          Stock price history
          <PresentationChartLineIcon className="h-6 fill-green-400" />
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Result;
