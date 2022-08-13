import { createContext, useContext, useState } from "react";

type Context = {
  code: string;
  setCode: (code: string) => void;
  starts: string;
  setStarts: (starts: string) => void;
  ends: string;
  setEnds: (ends: string) => void;
  searchResult: {
    country: string;
    currency: string;
    exchange: string;
    finnhubIndustry: string;
    ipo: string;
    logo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
  } | null;
  setSearchResult: (searchResult: Context["searchResult"] | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const AppContext = createContext<Context>({
  code: "",
  setCode: (code) => {},
  starts: "",
  setStarts: (date) => {},
  ends: "",
  setEnds: (date) => {},
  searchResult: null,
  setSearchResult: (result) => {},
  loading: false,
  setLoading: (loading) => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [searchResult, setSearchResult] =
    useState<Context["searchResult"]>(null);
  const [loading, setLoading] = useState(false);
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
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
