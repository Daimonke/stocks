import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { useAppContext } from "../context/context";
import autoAnimate from "@formkit/auto-animate";

const SearchForm = (): JSX.Element => {
  const ctx = useAppContext();

  // autoAnimate
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ctx.code.length === 0) {
      return ctx.setSearchError("Please enter a company code");
    }
    const valid = codeInputValidation(ctx.code);
    if (!valid) return;
    ctx.setLoading(true);
    axios
      .get(`api/company/?code=${ctx.code}`)
      .then((res) => {
        ctx.setSearchResult(res.data);
      })
      .catch((err) => {
        ctx.setSearchResult(null);
        ctx.setSearchError(err.response.data.error);
      })
      .finally(() => {
        ctx.setLoading(false);
      });
  };

  const codeInputValidation = (code: string): boolean => {
    if (code.length > 35) {
      ctx.setSearchError("Code must be less than 35 characters");
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(code) && code.length !== 0) {
      ctx.setSearchError("Code can only contain english letters and spaces");
      return false;
    }
    ctx.setSearchError("");
    return true;
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    codeInputValidation(e.target.value);
    ctx.setCode(e.target.value);
  };

  return (
    <div
      className="p-4 py-6 bg-gray-500 rounded-lg shadow-black shadow-md"
      ref={parent}
    >
      <form
        className="gap-4 flex justify-center flex-col sm:flex-row"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          onChange={handleCodeInput}
          value={ctx.code}
          className="p-2 w-full rounded-lg bg-gray-900/50 shadow-black shadow-inner focus:outline-none focus:shadow-outline focus:bg-gray-900/60 placeholder:text-gray-400"
          placeholder="Enter company code"
        />
        <div className="flex justify-between gap-1">
          <div className="shadow-black shadow-inner rounded-lg w-full text-center bg-gray-900/50 ::bg-gray-900/60 p-2">
            <span className="text-blue-400 font-bold">Starts</span>
            <input
              onChange={(e) => ctx.setStarts(e.target.value)}
              value={ctx.starts}
              type="date"
              name="start"
              className="w-full rounded-b-lg bg-transparent focus:outline-none uppercase flex justify-center text-center"
            />
          </div>
          <div className="shadow-black shadow-inner rounded-lg w-full text-center bg-gray-900/50 ::bg-gray-900/60 p-2">
            <span className="text-blue-400 font-bold">Ends</span>
            <input
              onChange={(e) => ctx.setEnds(e.target.value)}
              value={ctx.ends}
              type="date"
              name="start"
              className="w-full rounded-b-lg bg-transparent focus:outline-none uppercase flex justify-center text-center"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-400 shadow-black shadow-inner rounded-lg hover:bg-blue-500 transition-all flex justify-center items-center sm:justify-start"
        >
          <SearchIcon className="h-14 fill-stone-700 p-3 hover:p-2 transition-all" />
        </button>
      </form>
      {ctx.searchError && (
        <div className="relative text-center mt-4 p-4 bg-red-600/80 rounded-md  shadow-black shadow-sm">
          <p>{ctx.searchError}</p>
          <XIcon
            onClick={() => ctx.setSearchError("")}
            className="absolute bg-black rounded-full -top-2 -right-2 h-8 w-8 text-red-600 p-[3px] hover:scale-110 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default SearchForm;
