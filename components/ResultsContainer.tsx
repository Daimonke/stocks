import Image from "next/image";
import { useAppContext } from "../context/context";
import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import Loader from "./Loader";

type Props = {};

const ResultsContainer = (props: Props) => {
  const ctx = useAppContext();
  const parent = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <div>
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
        {ctx.searchResult && !ctx.loading && (
          <div className="flex items-center gap-8" ref={parent}>
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
                <b>Website:</b> {ctx.searchResult.weburl}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultsContainer;
