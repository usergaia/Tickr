"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { HistoricalPrice } from "@/util/stock-fetch";

// properties of chartjs that are triggered implicitly
ChartJS.register(
  // labels
  CategoryScale,
  Legend,

  // scales.y
  LinearScale,

  // <Line > component, datasets styling
  LineElement,

  // datasets
  PointElement,

  // implicitly used by Line
  Tooltip,
);

// props format
interface StockChartProps {
  data: HistoricalPrice[];
  symbol: string;
}

export function StockChart({ data, symbol }: StockChartProps) {
  // transform raw data into Chart.js format
  const chartData = {
    // extract date from oldest to latest
    labels: data
      .slice()
      .reverse()
      .map((item) => item.date),

    datasets: [
      {
        // legend and tooltip label
        label: `${symbol} Close Price`,

        // extract close price from oldest to latest
        data: data
          .slice()
          .reverse()
          .map((item) => item.close),

        // style config
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  // chart appearance and behavior
  const options = {
    // responsive config
    responsive: true,
    maintainAspectRatio: false,

    // scale config
    scales: {
      y: {
        beginAtZero: true, // start close from 0

        // y-axis tick config
        ticks: {
          callback: function (value: number | string) {
            return "$" + Number(value).toFixed(2); // add $ to price
          },
        },
      },

      x: {
        // x-axis tick config
        ticks: {
          maxTicksLimit: 8, // 8 dates max
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
}
