import Router from "@/hooks/Router";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { IoCodeSlashSharp } from "react-icons/io5";

export function About() {
  return (
    <>
      <div className="mt-4 ml-4 lg:ml-28">
        <h1 className="text-4xl font-extrabold">About Tickr</h1>
        <p className="flex max-w-2xl text-left text-base text-[13px] text-gray-500">
          Tickr is designed to track the most popular software and technology
          stocks, giving you clear insights into market movements. It highlights
          top gainers, highest closing prices, and measures volatility with
          machine learning models. By focusing on the tech sector, Tickr
          provides the tools and data you need to navigate the market and invest
          confidently in the companies you know best.
        </p>
      </div>
      <div className="m-4 mt-4 mr-14 ml-14 lg:mr-40 lg:ml-40 lg:grid">
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
            without losing depth, even with the API’s limits.
          </p>
          <p className="mt-2 text-sm text-black/70">
            As developers, we experience the dynamics of the tech world
            firsthand, we see new companies rise and watch trends shape the
            digital economy. Tickr builds on that perspective, treating it as an
            advantage when looking at the stock market. In a time where software
            and tech touch almost everyone’s lives, following these companies
            feels both practical and relatable, especially since many of the
            tracked stocks are names people already know.
          </p>
        </div>
        <div className="mt-5 w-full rounded-lg border-1 border-gray-300/50 p-4">
          <h2 className="text-lg font-semibold">
            <span className="text-blue-500">
              <IoCodeSlashSharp className="mr-1 mb-1 inline" />
            </span>{" "}
            Developer&apos;s Note
          </h2>
          <p className="mt-2 text-sm text-black/70">
            The development of Tickr grew out of my interest in integrating
            machine learning models into web applications, with time series data
            as a great starting point. Building it allowed me to explore
            concepts common in the tech industry while gaining hands-on
            experience with different tools and frameworks, expanding my options
            for future tech stacks.
          </p>
        </div>
      </div>
    </>
  );
}
