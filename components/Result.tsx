import Image from "next/image";
import React from "react";
import { useAppContext } from "../context/context";

const Result = () => {
  const ctx = useAppContext();
  return ctx.searchResult && !ctx.loading ? (
    <div className="flex items-center gap-8 bg-gradient-to-l from-blue-800/80 to-black/60 py-3 px-4 rounded-xl border-2 border-blue-900 shadow-md shadow-black">
      <div>
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
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Result;
