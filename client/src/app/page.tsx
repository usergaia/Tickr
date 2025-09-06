import { Header } from "./components/Header";
import StockBoard from "./components/StockBoard";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <StockBoard />
      <Footer />
    </div>
  );
}
