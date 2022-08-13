// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Missing code" });

  const { data }: AxiosResponse = await axios.get(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${code}&token=${process.env.API_KEY}`
  );
  if (checkIfObjEmpty(data)) {
    return res.status(400).json({ error: "Company not found" });
  }

  res.status(200).json(data);
}

const checkIfObjEmpty = (obj: { [key: string]: any }) => {
  for (const key in obj) return false;
  return true;
};
