import { MdHistory } from "react-icons/md";
import { Stocks, fetchStocks } from "../util/stock-fetch";
import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import Router from "../hooks/Router";

export async function StocksMenu() {
  const allStocks: Stocks[] | null = await fetchStocks();
  return (
    <>
      {/* menu header */}
      <div className="mx-auto flex w-full max-w-7xl flex-col p-4 lg:p-6 lg:pb-0">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
            All Tracked Stocks
          </h1>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <MdHistory className="mr-1" />
            Last updated:{" "}
            {allStocks?.sort(
              (a, b) =>
                new Date(b.lastRefreshed).getTime() -
                new Date(a.lastRefreshed).getTime(),
            )?.[0]?.lastRefreshed || "N/A"}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:px-6 lg:pb-3">
        {allStocks?.map((stock) => {
          const latest = stock.historical?.[0];
          const prev = stock.historical?.[1];
          const change = latest && prev ? latest.close - prev.close : 0;
          const changePercent =
            latest && prev ? (change / prev.close) * 100 : 0;

          return (
            <Router key={stock._id} path={`/stocks/${stock.symbol}`}>
              {/* stock cards */}
              <div
                className={clsx(
                  "cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md lg:p-7",
                  change >= 0
                    ? "border-l-4 border-l-green-400 hover:shadow-green-400/20"
                    : "border-l-4 border-l-red-400 hover:shadow-red-400/20",
                )}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-gray-900">
                    {stock.stock_name}
                  </div>
                  <div className="ml-2 hidden text-[8px] font-medium text-gray-500 sm:block">
                    {stock.symbol}
                  </div>
                </div>

                {/* stock content */}
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  <div className="text-xl font-bold text-gray-900 lg:text-2xl">
                    ${latest?.close}
                  </div>
                  <div
                    className={clsx(
                      "flex items-center text-[9px] font-medium sm:ml-0 lg:ml-6 lg:text-[11px]",
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
                    {changePercent >= 0 ? "+" : ""}
                    {changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </Router>
          );
        })}
      </div>
    </>
  );
}
