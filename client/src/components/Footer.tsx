import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
// import { SiHuggingface } from "react-icons/si";
import Router from "../hooks/Router";

export function Footer() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 border-t-2 p-4 lg:flex-row lg:gap-0">
      <div className="mono text-center text-gray-500/70 lg:text-left">
        © 2025 @usergaia
      </div>
      <div className="flex cursor-pointer flex-row gap-2 text-gray-500/50 lg:absolute lg:top-1/2 lg:right-4 lg:-translate-y-1/2">
        <Router path="https://github.com/usergaia/Tickr">
          <span className="text-2xl transition-colors hover:text-gray-700 lg:text-3xl">
            <FaGithub />
          </span>
        </Router>
        <Router path="https://www.linkedin.com/in/edgar-rafael-user5777/">
          <span className="text-2xl transition-colors hover:text-gray-700 lg:text-3xl">
            <FaLinkedin />
          </span>
        </Router>
        {/* <Router path="https://huggingface.co/">
          <span className="text-2xl transition-colors hover:text-gray-700 lg:text-3xl">
            <SiHuggingface />
          </span>
        </Router> */}
      </div>
    </div>
  );
}
