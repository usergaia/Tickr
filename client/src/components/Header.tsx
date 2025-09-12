import { GrSend } from "react-icons/gr";
import { SiStockx } from "react-icons/si";
import Router from "../hooks/Router";

export function Header() {
  return (
    <div className="relative flex w-full flex-col border-b-2">
      {/* logo and title */}
      <div className="flex w-full items-center justify-between p-2 lg:p-4">
        <div className="flex items-center">
          <div className="ml-2 lg:ml-8">
            <SiStockx className="h-6 w-6 text-gray-600 lg:h-8 lg:w-8" />
          </div>
          <div className="flex items-center text-xs select-none lg:text-[13px]">
            <div className="ml-2 text-lg font-bold lg:text-xl">Tickr</div>

            {/* lg nav */}
            <div className="hidden items-center lg:flex">
              <Router path={`/`}>
                <div className="ml-6 cursor-pointer rounded p-1 hover:bg-gray-400">
                  Home
                </div>
              </Router>
              <Router path={`/stocks`}>
                <div className="ml-6 cursor-pointer rounded p-1 hover:bg-gray-400">
                  Stocks
                </div>
              </Router>
              <Router path={`/about`}>
                <div className="ml-6 cursor-pointer rounded p-1 hover:bg-gray-400">
                  About
                </div>
              </Router>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {/* feedback btn */}
          <Router path="https://tally.so/r/npgVLb">
            <span className="mr-4 hidden cursor-pointer flex-row items-center hover:text-blue-700 lg:flex">
              <GrSend className="mr-1 h-5 w-5" />
              <span className="font-medium">Feedback</span>
            </span>
          </Router>

          {/* hamburger for mobile mq */}
          <div className="relative mr-2 lg:hidden">
            <input
              type="checkbox"
              id="mobile-menu-toggle"
              className="peer hidden"
            />
            <label
              htmlFor="mobile-menu-toggle"
              className="block cursor-pointer rounded p-2 hover:bg-gray-100"
            >
              <div className="flex h-5 w-5 flex-col">
                <div className="mt-1 mb-1 h-0.5 w-full bg-gray-600 transition-transform duration-300"></div>
                <div className="mb-1 h-0.5 w-full bg-gray-600 transition-transform duration-300"></div>
                <div className="h-0.5 w-full bg-gray-600 transition-transform duration-300"></div>
              </div>
            </label>

            {/* menu dropdown in mobile mq */}
            <div className="absolute top-full right-0 z-10 hidden w-screen max-w-sm border-t bg-white shadow-lg select-none peer-checked:block">
              <div className="flex flex-col space-y-1 p-4">
                <Router path={`/`}>
                  <div className="cursor-pointer rounded p-2 hover:bg-gray-100">
                    Home
                  </div>
                </Router>
                <Router path={`/stocks`}>
                  <div className="cursor-pointer rounded p-2 hover:bg-gray-100">
                    Stocks
                  </div>
                </Router>
                <Router path={`/about`}>
                  <div className="cursor-pointer rounded p-2 hover:bg-gray-100">
                    About
                  </div>
                </Router>
                <Router path="https://tally.so/r/m6BXP5">
                  <span className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-100">
                    <GrSend className="mr-2 h-4 w-4" />
                    <span>Feedback</span>
                  </span>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
