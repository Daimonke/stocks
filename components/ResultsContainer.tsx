import Image from "next/image";
import { useAppContext } from "../context/context";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import Loader from "./Loader";
import Result from "./Result";

const ResultsContainer = () => {
  const ctx = useAppContext();
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent}>
      <div>
        {ctx.searchResult && (
          <h1 className="border-b-white border-b-2 full-w text-white text-center my-4 text-2xl">
            Search results
          </h1>
        )}
        {ctx.loading && !ctx.searchResult && (
          <Loader className={`${!ctx.loading && "hidden"}`} />
        )}
      </div>
      <Result />
    </div>
  );
};

export default ResultsContainer;
