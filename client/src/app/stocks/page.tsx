import { StocksMenu } from "@/components/Menu";
import { Header } from "../../components/Header";
import { Footer } from "@/components/Footer";

// disable static generation
export const dynamic = "force-dynamic";

export default function StocksPage() {
  return (
    <>
      <div className="no-scrollbar flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 flex-col items-center p-0">
          <div>
            <StocksMenu />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
