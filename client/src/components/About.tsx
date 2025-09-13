import Router from "@/hooks/Router";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { IoCodeSlashSharp } from "react-icons/io5";

export function About() {
  return (
    <>
      <div className="m-5 mt-4 flex flex-col items-center justify-center text-center lg:mr-40 lg:ml-28">
        <h1 className="mono mb-2 text-4xl font-bold">About Tickr</h1>
        <p className="mono max-w-2xl text-center text-base text-[13px] text-gray-500 lg:mt-5 lg:text-sm">
          Tickr is designed to track EOD statistics for popular SWE stocks,
          giving you clear insights into their market movements. It highlights{" "}
          <span className="text-red-300">latest top gainers</span>,{" "}
          <span className="text-red-300">highest closing prices</span>, and{" "}
          <span className="text-red-300">visualization</span> of data. Tickr
          provides the tools and data you need to navigate the market and invest
          confidently in the companies you know best.
        </p>
      </div>
      <div className="m-4 mt-4 mr-14 ml-14 flex flex-col lg:mr-40 lg:ml-40 lg:grid">
        <div className="mt-5 w-full rounded-lg border-1 border-gray-300/50 p-4">
          <h2 className="flex text-lg font-semibold">
            <span className="text-blue-500">
              <FaDatabase className="mr-1 mb-1 inline" />
            </span>{" "}
            Data Source
          </h2>
          <p className="mt-2 text-sm text-black/70">
            Tickr uses the{" "}
            <Router path="https://www.alphavantage.co/">
              <span className="rounded p-1 text-sm font-semibold hover:bg-gray-300">
                Alpha Vantage API{" "}
                <FaExternalLinkAlt className="mb-1 inline text-xs text-gray-500" />
              </span>
            </Router>{" "}
            for stock data. It’s easy to get into if you’re new to time series
            data, gives plenty to work with even on the free plan, and is handy
            for indie developers who just want to explore and build.
          </p>
        </div>
        <div className="mt-5 w-full rounded-lg border-1 border-gray-300/50 p-4">
          <h2 className="text-lg font-semibold">
            <span className="text-2xl text-blue-500">
              <AiOutlineStock className="mr-1 inline" />
            </span>{" "}
            Why Tickr Focuses on SWE Stocks
          </h2>
          <p className="mt-2 text-sm text-black/70">
            By focusing on software enterprises, Tickr keeps the scope clear
            without losing depth, even with the API&apos;s limits. This targeted
            approach allows for deeper analysis of companies that many people
            are already familiar with. Rather than spreading thin across all
            market sectors, this focus enables more meaningful insights into the
            companies that shape the technology landscape we work in every day.
          </p>
        </div>
        <div className="mt-5 w-full rounded-lg border-1 border-gray-300/50 p-4">
          <h2 className="text-lg font-semibold">
            <span className="text-blue-500">
              <IoCodeSlashSharp className="mr-1 mb-1 inline" />
            </span>{" "}
            Footnote
          </h2>
          <p className="mt-2 text-sm text-black/70">
            The development of Tickr grew out of my interest in building
            full-stack applications that handle real-time data at scale. Working
            with financial data provided an excellent opportunity to explore
            modern web technologies, and implement effective caching strategies.
            For more technical details, implementation insights, or to
            contribute to the project, feel free to check out the{" "}
            <Router path="https://github.com/usergaia/tickr">
              <span className="rounded p-1 text-sm font-semibold hover:bg-gray-300">
                GitHub repository{" "}
                <FaExternalLinkAlt className="mb-1 inline text-xs text-gray-500" />
              </span>
            </Router>
            .
          </p>
        </div>
      </div>
    </>
  );
}
