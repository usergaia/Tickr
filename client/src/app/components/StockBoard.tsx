import { fetchStocks, Stocks } from "../../util/stock-fetch";
import clsx from "clsx";

export default async function StockBoard() {
  const backendData: Stocks[] = await fetchStocks();

  return (
    <div className="relative top-15 left-14 flex min-h-screen w-full max-w-5xl flex-col items-center p-0 font-sans">
      {backendData && backendData.length > 0 ? (
        <div className="flex w-full flex-col justify-center">
          {backendData.map((item: Stocks, index: number) => (
            <div
              key={item._id || index}
              className="h-150 w-230 rounded-lg border border-gray-300 bg-white p-6 shadow-lg"
            >
              <div className="text-xl font-semibold text-black">
                <span className="text-black">Symbol:</span> {item.symbol}
              </div>
              <div>
                <span className="font-medium text-black">
                  Historical Prices:
                </span>
                {item.historical && item.historical.length > 0 ? (
                  <div className="max-h-130 w-full overflow-y-auto text-black">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-2 py-1">Date</th>
                          <th className="px-2 py-1">Close</th>
                          <th className="px-2 py-1">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.historical
                          .slice(0, 20)
                          .map((price, priceIndex) => (
                            <tr
                              key={priceIndex}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="px-2 py-1">{price.date}</td>
                              <td className="px-2 py-1">${price.close}</td>
                              <td className="px-2 py-1">
                                {/* stock change difference */}
                                {priceIndex < item.historical.length - 1 ? (
                                  <span
                                    className={clsx(
                                      price.close >
                                        item.historical[priceIndex + 1].close
                                        ? "text-green-600"
                                        : "text-red-600",
                                    )}
                                  >
                                    {(
                                      price.close -
                                      item.historical[priceIndex + 1].close
                                    ).toFixed(2)}
                                  </span>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No historical data
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
