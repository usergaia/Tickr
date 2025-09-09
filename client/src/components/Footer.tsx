import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

export function Footer() {
  return (
    <div className="flex flex-row items-center justify-center border-t-2 p-4">
      <div className="font-[system-ui] text-gray-500/70 italic">
        © 2025 @usergaia
      </div>
      <div className="absolute right-0 m-2 flex cursor-pointer flex-row text-gray-500/50">
        <div className="mr-2 text-3xl">
          <FaGithub />
        </div>
        <div className="mr-2 text-3xl">
          <FaLinkedin />
        </div>
        <div className="mr-2 text-3xl">
          <SiHuggingface />
        </div>
      </div>
    </div>
  );
}
