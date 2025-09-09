import { Header } from "../components/Header";
import StockBoard from "../components/LandingPage";
import { Footer } from "../components/Footer";
// import Test from "./test";

export default function Home() {
  return (
    <div className="no-scrollbar flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center p-0">
        <div>
          <StockBoard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
