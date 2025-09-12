import { fetchOne } from "@/util/stock-fetch";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Router from "@/hooks/Router";
import { StockChart } from "@/components/StockChart";
import { VolumeChart } from "@/components/VolumeChart";

export default async function StockDetail({
  params, // destructure params right away
}: {
  params: { symbol: string };
}) {
  const { symbol } = params;

  try {
    const stockData = await fetchOne(symbol);

    // check if data exists
    if (!stockData || !stockData.symbol) {
      throw new Error("Invalid stock data received");
    }

    return (
      <>
        <div className="no-scrollbar flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 flex-col p-4 lg:p-6">
            {/* main container */}
            <div className="mx-auto w-full max-w-7xl">
              {/* stock header */}
              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:p-6">
                <div className="mb-2">
                  <h1 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                    {stockData.stock_name}
                  </h1>
                  <div className="text-sm text-gray-600">{stockData.name}</div>
                </div>
                {stockData.historical && stockData.historical.length > 0 ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                    <div className="text-2xl font-bold text-gray-900 lg:text-3xl">
                      ${stockData.historical[0].close.toFixed(2)}
                    </div>
                    {stockData.historical.length > 1 &&
                      (() => {
                        const latest = stockData.historical[0];
                        const prev = stockData.historical[1];
                        const change = latest.close - prev.close;
                        const changePercent = (change / prev.close) * 100;

                        return (
                          <div
                            className={`text-sm font-medium ${
                              change >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(2)} ({changePercent >= 0 ? "+" : ""}
                            {changePercent.toFixed(2)}%)
                          </div>
                        );
                      })()}
                  </div>
                ) : (
                  <div className="text-gray-500">
                    Historical data not available for this stock yet.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* left col - charts */}
                <div className="lg:col-span-2">
                  {/* price chart */}
                  <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:p-6">
                    <h2 className="mb-4 text-lg font-semibold">Price Trend</h2>
                    {stockData.historical && stockData.historical.length > 0 ? (
                      <StockChart
                        data={stockData.historical}
                        symbol={stockData.symbol}
                      />
                    ) : (
                      <div className="flex h-64 items-center justify-center rounded bg-gray-50">
                        <span className="text-gray-500">
                          No historical data available for chart
                        </span>
                      </div>
                    )}
                  </div>

                  {/* volume chart */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                      Trading Volume
                    </h2>
                    {stockData.historical && stockData.historical.length > 0 ? (
                      <VolumeChart
                        data={stockData.historical}
                        symbol={stockData.symbol}
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center rounded bg-gray-50">
                        <span className="text-gray-500">
                          No volume data available for chart
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* right col - latest data */}
                <div className="space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">
                      Current Trading Session
                    </h2>
                    {stockData.historical && stockData.historical.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Close:</span>
                          <span className="font-medium">
                            ${stockData.historical[0].close.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {stockData.historical[0].date}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Symbol:</span>
                          <span className="font-medium">
                            {stockData.symbol}
                          </span>
                        </div>
                        {stockData.historical.length > 1 && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Previous Close:
                              </span>
                              <span className="font-medium">
                                ${stockData.historical[1].close.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Change:</span>
                              <span
                                className={`font-medium ${
                                  stockData.historical[0].close >=
                                  stockData.historical[1].close
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                $
                                {(
                                  stockData.historical[0].close -
                                  stockData.historical[1].close
                                ).toFixed(2)}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Refreshed:</span>
                          <span className="font-medium">
                            {stockData.lastRefreshed || "N/A"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-center text-gray-500">
                        No trading data available for this stock yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* historical data */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="p-4 lg:p-6">
                  <h2 className="mb-4 text-lg font-semibold">
                    Historical Data (Last 30 Days)
                  </h2>
                  {stockData.historical && stockData.historical.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Date
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Open
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              High
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Low
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Close
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Volume
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Change
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Change %
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {stockData.historical.map((data, index) => {
                            const prevData = stockData.historical[index + 1];
                            const change = prevData
                              ? data.close - prevData.close
                              : 0;
                            const changePercent = prevData
                              ? (change / prevData.close) * 100
                              : 0;

                            return (
                              <tr
                                key={index}
                                className="border-b border-gray-100"
                              >
                                <td className="px-4 py-2">{data.date}</td>
                                <td className="px-4 py-2">
                                  ${data.open?.toFixed(2) || "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                  ${data.high?.toFixed(2) || "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                  ${data.low?.toFixed(2) || "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                  ${data.close.toFixed(2)}
                                </td>
                                <td className="px-4 py-2">
                                  {data.volume || "N/A"}
                                </td>
                                <td
                                  className={`px-4 py-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {prevData
                                    ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}`
                                    : "N/A"}
                                </td>
                                <td
                                  className={`px-4 py-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {prevData
                                    ? `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`
                                    : "N/A"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No historical data available for this stock yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return (
      <>
        <div className="no-scrollbar flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 flex-col p-4 lg:p-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
                {/* err icon */}
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-red-100 p-3">
                    <svg
                      className="h-8 w-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                </div>

                {/* err content */}
                <div className="text-center">
                  <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                    Stock Not Found
                  </h1>
                  <p className="mb-4 text-gray-600">
                    The stock symbol &ldquo;{symbol}&rdquo; could not be found
                    in our database.
                  </p>
                  <p className="mb-6 text-sm text-gray-500">
                    This might be because the stock hasn&apos;t been added to
                    our tracking system yet, or the symbol might be incorrect.
                  </p>

                  {/* action btns */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Router path="/stocks">
                      <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                        View All Tracked Stocks
                      </button>
                    </Router>
                    <Router path="/">
                      <button className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
                        Back to Dashboard
                      </button>
                    </Router>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}
