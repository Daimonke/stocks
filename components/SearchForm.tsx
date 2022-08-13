import axios from "axios";
import React, { FormEvent, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { useAppContext } from "../context/context";

const SearchForm = (): JSX.Element => {
  const ctx = useAppContext();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    ctx.setLoading(true);
    e.preventDefault();
    axios
      .get(`api/company/?code=${ctx.code}`)
      .then((res) => {
        ctx.setSearchResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        ctx.setSearchResult(null);
        console.log(err.response.data.error);
      })
      .finally(() => {
        ctx.setLoading(false);
      });
  };

  return (
    <form
      className="gap-4 p-4 py-6 mt-4 bg-gray-500 flex justify-center flex-col sm:flex-row rounded-lg shadow-black shadow-md"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        onChange={(e) => ctx.setCode(e.target.value)}
        className="p-2 w-full rounded-lg bg-gray-900/50 shadow-black shadow-inner focus:outline-none focus:shadow-outline focus:bg-gray-900/60 placeholder:text-gray-400"
        placeholder="Enter company code"
      />
      <div className="flex justify-between gap-1">
        <div className="shadow-black shadow-inner rounded-lg w-full text-center bg-gray-900/50 ::bg-gray-900/60 p-2">
          <span className="text-blue-400 font-bold">Starts</span>
          <input
            onChange={(e) => ctx.setStarts(e.target.value)}
            type="date"
            name="start"
            className="w-full text-center rounded-b-lg bg-transparent focus:outline-none"
          />
        </div>
        <div className="shadow-black shadow-inner rounded-lg w-full text-center bg-gray-900/50 ::bg-gray-900/60 p-2">
          <span className="text-blue-400 font-bold">Ends</span>
          <input
            onChange={(e) => ctx.setEnds(e.target.value)}
            type="date"
            name="start"
            className="w-full text-center rounded-b-lg bg-transparent focus:outline-none"
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
  );
};

export default SearchForm;
