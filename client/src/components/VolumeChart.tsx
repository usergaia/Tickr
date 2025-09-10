"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { HistoricalPrice } from "@/util/stock-fetch";

// properties of chartjs that are triggered implicitly
ChartJS.register(
  // labels
  CategoryScale,
  Legend,

  // scales.y
  LinearScale,
  BarElement,

  // implicitly used by Bar
  Tooltip,
);

// props format
interface VolumeChartProps {
  data: HistoricalPrice[];
  symbol: string;
}

export function VolumeChart({ data, symbol }: VolumeChartProps) {
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
        label: `${symbol} Volume`,

        // extract volume from oldest to latest
        data: data
          .slice()
          .reverse()
          .map((item) => item.volume || 0),

        // style config
        backgroundColor: "rgb(100, 100, 100)",
        borderColor: "rgb(238,238,238)",
        borderWidth: 1,
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
        beginAtZero: true, // start vol from 0
      },
      x: {
        ticks: {
          maxTicksLimit: 8, // Show max 8 labels
        },
      },
    },
  };

  return (
    <div className="h-48">
      <Bar data={chartData} options={options} />
    </div>
  );
}
