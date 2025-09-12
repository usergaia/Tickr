import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Dashboard from "../components/LandingPage";
// import Test from "./test";

// disable static generation
export const dynamic = "force-dynamic";

export default function Home() {
  try {
    return (
      <div className="no-scrollbar flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 flex-col items-center p-0">
          <div>
            <Dashboard />
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="no-scrollbar flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 flex-col items-center p-0">
          <div>
            <Dashboard />
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
