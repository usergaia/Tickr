import { Stocks } from "../util/stock-fetch";
import clsx from "clsx";
import { getTopGain } from "../util/get-top";
import { getTopClose } from "../util/get-top";
import Router from "../hooks/Router";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";

export default async function StockBoard() {
  const topStocks: Stocks[] | null = await getTopGain();
  const topClose: Stocks[] | null = await getTopClose();
  const volatility: string | null = null; // will add ml model after finalizing ui

  return (
    <>
      <div className="flex w-[1350px] flex-col items-center p-6 font-sans">
        {/* latest top gainers */}
        {topStocks && topStocks.length > 0 ? (
          <div className="max-h-130 w-full overflow-y-auto rounded-lg border-1 border-gray-200/50 bg-white p-6 text-black shadow-xs">
            <h2 className="mb-4 border-b-1 border-gray-100 text-lg font-bold">
              Latest Top Gainers
            </h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="items-center justify-center border-b border-gray-300 pb-2 font-medium">
                  <th className="px-3 py-2">Symbol</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Close</th>
                  <th className="px-3 py-2">Change</th>
                  <th className="px-3 py-2">Volatility</th>
                </tr>
              </thead>
              <tbody>
                {topStocks
                  ? topStocks.map((stock) => {
                      const latest = stock.historical?.[0];
                      const prev = stock.historical?.[1];
                      const change =
                        latest && prev ? latest.close - prev.close : 0;
                      return latest ? (
                        <tr
                          key={stock._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-3 py-2">{stock.symbol}</td>
                          <td className="px-3 py-2">{latest.date}</td>
                          <td className="px-3 py-2">${latest.close}</td>
                          <td className="px-3 py-2">
                            {prev && (
                              <span
                                className={clsx(
                                  latest.close > prev.close
                                    ? "text-green-600"
                                    : "text-red-600",
                                )}
                              >
                                {change > 0
                                  ? `+${change.toFixed(2)}`
                                  : change.toFixed(2)}
                              </span>
                            )}
                          </td>
                          <td className="relative left-4 px-3 py-2 text-gray-500">
                            {volatility ? volatility : "N/A"}
                          </td>
                        </tr>
                      ) : null;
                    })
                  : null}
              </tbody>
            </table>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {/* highest close stocks */}
        {topClose && topClose.length > 0 ? (
          <div className="w-full rounded-lg bg-white p-6 text-black">
            <h2 className="mb-4 border-gray-100 text-lg font-bold">
              Featured Stocks
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {topClose.map((stock) => {
                const latest = stock.historical?.[0];
                const prev = stock.historical?.[1];
                const change = latest && prev ? latest.close - prev.close : 0;
                const changePercent =
                  latest && prev ? (change / prev.close) * 100 : 0;

                return (
                  // pass stock symbol to router as params to see details of that particular stock
                  <Router key={stock._id} path={`/stocks/${stock.symbol}`}>
                    <div
                      key={stock._id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-xs hover:shadow-gray-900"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">
                          {stock.symbol}
                        </div>
                        <div className="text-xs font-medium text-gray-500">
                          {stock.symbol}
                        </div>
                      </div>

                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">
                          ${latest?.close}
                        </div>
                        <div
                          className={clsx(
                            "flex items-center text-sm font-medium",
                            change >= 0 ? "text-green-600" : "text-red-600",
                          )}
                        >
                          <span className="mr-1">
                            {changePercent > 0 ? (
                              changePercent > 5 ? (
                                <FaAnglesUp />
                              ) : (
                                <FaAngleUp />
                              )
                            ) : changePercent < -5 ? (
                              <FaAnglesDown />
                            ) : (
                              <FaAngleDown />
                            )}
                          </span>
                          {change >= 0 ? "+" : ""}
                          {change.toFixed(2)} ({changePercent >= 0 ? "+" : ""}
                          {changePercent.toFixed(2)}%)
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Last Fetch: {latest?.date}
                      </div>
                    </div>
                  </Router>
                );
              })}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
