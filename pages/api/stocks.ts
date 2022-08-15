import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { connectToDatabase } from "../../api_utils/mongoConnection";

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
  try {
    const { code, starts, ends, name } = req.query;

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
    await logUserAction(String(name), data, String(starts), String(ends));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

const isObjEmpty = (obj: { [key: string]: any }) => {
  for (const key in obj) return false;
  return true;
};

const logUserAction = async (
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

  const connection = await connectToDatabase();
  const collection = connection.db.collection("logs");
  await collection.insertOne({
    companyName,
    stockPrices: stockPrices.c,
    dateRange: {
      starts,
      ends,
    },
  });
};
