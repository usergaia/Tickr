import { Header } from "../../components/Header";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";

export default function StocksPage() {
  return (
    <>
      <div className="no-scrollbar flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 flex-col p-0">
          <div>
            <About />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
