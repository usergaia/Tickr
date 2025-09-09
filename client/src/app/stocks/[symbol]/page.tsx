import { fetchOne, Stocks } from "@/util/stock-fetch";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function StockDetail({
  params, // destructure params right away
}: {
  params: { symbol: string };
}) {
  const { symbol } = params;

  try {
    const stockData: Stocks = await fetchOne(symbol);
    return (
      <>
        <Header />
        <div>
          <h1>Stock Detail: {stockData.symbol}</h1>
          <p>Symbol: {stockData.symbol}</p>
          {stockData.name ? (
            <p>Name: {stockData.name}</p>
          ) : (
            <p>No name found.</p>
          )}
          {stockData.stock_name ? (
            <p>Stock Name: {stockData.stock_name}</p>
          ) : (
            <p>No stock name found.</p>
          )}
          <p>Historical Prices:</p>
          <ul>
            {stockData.historical.map((price, index) => (
              <li key={index}>
                {price.date}: ${price.close}
              </li>
            ))}
          </ul>
          {/* Add more details as needed */}
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.log("Stock does not exist: ", error);

    return (
      <>
        <Header />
        <div>Error loading stock data.</div>
        <Footer />
      </>
    );
  }
}
