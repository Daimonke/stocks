import React, { useEffect } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { ChartApiData } from "./StockPriceContainer";
import { useAppContext } from "../context/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);
type Props = {
  data: ChartApiData;
};

const Chart = ({ data }: Props) => {
  const ctx = useAppContext();
  const ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const dataForChart = {
    labels: data?.t.map((t) => new Date(t * 1000).toLocaleDateString()),
    datasets: [
      {
        label: `Price (${ctx.searchResult?.currency})`,
        backgroundColor: "rgb(0, 0, 188)",
        borderColor: "rgb(0, 0, 150)",
        data: data?.c,
      },
    ],
  };
  return (
    <div>
      <Line data={dataForChart} options={ChartOptions} />
    </div>
  );
};

export default Chart;
