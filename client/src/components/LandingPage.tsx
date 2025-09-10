import { Stocks } from "../util/stock-fetch";
import clsx from "clsx";
import { getTopGain } from "../util/get-top";
import { getTopClose } from "../util/get-top";
import Router from "../hooks/Router";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";

export default async function Dashboard() {
  const topStocks: Stocks[] | null = await getTopGain();
  const topClose: Stocks[] | null = await getTopClose();
  const volatility: string | null = null; // will add ml model after finalizing ui

  return (
    <>
      <div className="ml-1 flex w-full flex-col items-center p-3 font-sans">
        {/* latest top gainers */}
        {topStocks && topStocks.length > 0 ? (
          <div className="mb-3 w-full max-w-6xl overflow-y-auto rounded-lg border border-gray-200/50 bg-white p-6 text-black shadow-sm">
            <h2 className="mb-3 border-b border-gray-100 text-lg font-bold">
              Latest Top Gainers
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full text-left text-sm">
                <thead>
                  <tr className="items-center justify-center border-gray-300 pb-2 font-medium">
                    <th className="px-3 py-2">Symbol</th>
                    <th className="hidden px-3 py-2 sm:table-cell">Date</th>
                    <th className="px-3 py-2">Close</th>
                    <th className="px-3 py-2">Change</th>
                    <th className="hidden px-3 py-2 lg:table-cell">
                      Volatility
                    </th>
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
                          <tr key={stock._id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium">
                              {stock.symbol}
                            </td>
                            <td className="hidden px-3 py-2 sm:table-cell">
                              {latest.date}
                            </td>
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
                            <td className="hidden px-3 py-2 text-gray-500 lg:table-cell">
                              {volatility ? volatility : "N/A"}
                            </td>
                          </tr>
                        ) : null;
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex w-full justify-center p-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}
        {/* highest close stocks */}
        {topClose && topClose.length > 0 ? (
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 text-black">
            <h2 className="mb-4 text-lg font-bold">Featured Stocks</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">
                          {stock.stock_name}
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
                            "flex items-center text-[11px] font-medium",
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
          <div className="flex w-full justify-center p-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}
      </div>
    </>
  );
}
