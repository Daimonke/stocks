import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  code: "",
  setCode: (code: string) => {},
  starts: "",
  setStarts: (date: string) => {},
  ends: "",
  setEnds: (date: string) => {},
  searchResult: {},
  // setSearchResult takes argument of type {}
  setSearchResult: (result: {}) => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [searchResult, setSearchResult] = useState({});

  return (
    <AppContext.Provider
      value={{
        code,
        setCode,
        starts,
        setStarts,
        ends,
        setEnds,
        searchResult,
        setSearchResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
