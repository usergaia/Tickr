import { fetchStocks, Stocks } from "../../util/stock-fetch";
import clsx from "clsx";

export default async function StockBoard() {
  const backendData: Stocks[] = await fetchStocks();

  return (
    <div className="relative top-15 left-14 flex min-h-screen w-full max-w-5xl flex-col items-center p-0 font-sans">
      <span className="mb-6 text-4xl font-medium text-teal-200">Tickr</span>
      {backendData && backendData.length > 0 ? (
        <div className="max-h-130 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white p-6 text-black shadow-lg shadow-teal-400">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-1">Symbol</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Close</th>
                <th className="px-2 py-1">Change</th>
              </tr>
            </thead>
            <tbody>
              {/* map through all stocks */}
              {backendData.map((item: Stocks, index: number) => {
                const latest = item.historical?.[0];
                const prev = item.historical?.[1];
                return latest ? (
                  <tr
                    key={item._id || index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-2 py-1">{item.symbol}</td>
                    <td className="px-2 py-1">{latest.date}</td>
                    <td className="px-2 py-1">${latest.close}</td>
                    <td className="px-2 py-1">
                      {prev && (
                        <span
                          className={clsx(
                            latest.close > prev.close
                              ? "text-green-600"
                              : "text-red-600",
                          )}
                        >
                          {(latest.close - prev.close).toFixed(2)}
                        </span>
                      )}
                    </td>
                  </tr>
                ) : (
                  <tr key={item._id || index}>
                    <td className="px-2 py-1">{item.symbol}</td>
                    <td colSpan={3} className="px-2 py-1 text-gray-500">
                      No historical data
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
