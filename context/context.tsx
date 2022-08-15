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
  searchError: string;
  setSearchError: (searchError: string) => void;
  showStocks: boolean;
  setShowStocks: (showStocks: boolean) => void;
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
  searchError: "",
  setSearchError: (error) => {},
  showStocks: false,
  setShowStocks: (showStocks) => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [searchResult, setSearchResult] =
    useState<Context["searchResult"]>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [showStocks, setShowStocks] = useState(false);
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
        searchError,
        setSearchError,
        showStocks,
        setShowStocks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
