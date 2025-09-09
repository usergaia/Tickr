import logo from "@/../public/globe.svg";
import { GrSend } from "react-icons/gr";
import Image from "next/image";
export function Header() {
  return (
    <div className="flex w-full items-center justify-between border-b-2 p-2">
      <div className="flex items-center">
        <div className="ml-8">
          <Image src={logo} alt="Logo" className="h-8 w-8" />
        </div>
        <div className="flex items-center text-[13px] select-none">
          <div className="ml-2 text-xl font-bold">Tickr</div>
          <div className="ml-6 cursor-pointer rounded p-1 hover:bg-gray-400">
            Home
          </div>
          <div className="ml-6 cursor-pointer rounded p-1 hover:bg-gray-400">
            Dashboard
          </div>
          <div className="ml-6 cursor-pointer rounded p-1 hover:bg-gray-400">
            About
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 flex cursor-pointer flex-row items-center hover:text-blue-700">
          <GrSend className="mr-1 h-5 w-5" />
          <span className="font-medium">Feedback</span>
        </div>
      </div>
    </div>
  );
}
