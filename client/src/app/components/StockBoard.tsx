import { fetchItems, Stocks } from "../../util/stock-fetch";

export default async function StockBoard() {
  const backendData: Stocks[] = await fetchItems();
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <h1 className="mb-4 text-2xl font-bold">Items from Backend</h1>
      {backendData && backendData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {backendData.map((item: Stocks, index: number) => (
            <div key={item._id || index} className="rounded border p-4 shadow">
              <div>
                <strong>Symbol:</strong> {item.symbol}
              </div>
              <div>
                <strong>Volume:</strong> {item.volume}
              </div>
              <div>
                <strong>Open:</strong> {item.open}
              </div>
              <div>
                <strong>High:</strong> {item.high}
              </div>
              <div>
                <strong>Low:</strong> {item.low}
              </div>
              <div>
                <strong>Close:</strong> {item.close}
              </div>
              <div>
                <strong>Date:</strong> {item.date.toString()}
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
