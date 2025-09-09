"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface RouterParams {
  path: string;
  children: ReactNode;
}

export default function Router({ path, children }: RouterParams) {
  const router = useRouter();

  return (
    // div wrapper to make the entire area clickable
    <div onClick={() => router.push(path)} className="cursor-pointer">
      {children}
    </div>
  );
}
