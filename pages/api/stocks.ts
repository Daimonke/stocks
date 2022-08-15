// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { ChartApiData } from "../../components/StockPriceContainer";

type ChartData = {
  t: number[];
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  s: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, starts, ends } = req.query;

  if (!starts || !ends || !code) {
    return res
      .status(400)
      .json({ error: "Please enter a code and starts/ends dates" });
  }

  // convert date string to unix format seconds
  const start = new Date(String(starts)).getTime() / 1000;
  const end = new Date(String(ends)).getTime() / 1000;

  const { data }: AxiosResponse<ChartData> = await axios.get(
    `https://finnhub.io/api/v1/stock/candle?symbol=${String(
      code
    ).toUpperCase()}&resolution=D&from=${start}&to=${end}&token=${
      process.env.API_KEY
    }`
  );
  if (isObjEmpty(data)) {
    return res.status(404).json({ error: "Data not found" });
  }
  logUserAction(String(code).toUpperCase(), data, String(starts), String(ends));
  res.status(200).json(data);
}

const isObjEmpty = (obj: { [key: string]: any }) => {
  for (const key in obj) return false;
  return true;
};

// stockPrices type is ChartApiData without null option
const logUserAction = (
  companyName: string,
  stockPrices: ChartData,
  starts: string,
  ends: string
) => {
  console.log(`
  --USER ACTION--
  Company name: ${companyName}
  Stock prices: ${JSON.stringify(stockPrices.c)}
  Date range:  ${starts} - ${ends}`);
};
