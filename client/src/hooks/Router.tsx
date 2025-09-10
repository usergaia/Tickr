"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface RouterParams {
  path: string;
  children: ReactNode;
  newTab?: boolean;
}

export default function Router({
  path,
  children,
  newTab = false,
}: RouterParams) {
  const router = useRouter();

  // check if external
  const isExternal = path.startsWith("http://") || path.startsWith("https://");

  const handleClick = () => {
    if (isExternal || newTab) {
      // open new tab for external links
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      // use router if internal path
      router.push(path);
    }
  };

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}
