"use client";

import { useState } from "react";
import clsx from "clsx";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    await Reload();
  };

  const Reload = async () => {
    // Clear any potential caching
    if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-800">
          Something went wrong!
        </h2>
        <button
          onClick={handleReset}
          className={clsx("mr-2 rounded-lg px-4 py-2 transition-colors", {
            "bg-red-600 text-white hover:bg-red-700": !isLoading,
            "cursor-not-allowed bg-gray-300 text-gray-500": isLoading,
          })}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Try again"}
        </button>

        <div className="mt-4 text-sm text-gray-500">Error: {error.message}</div>
      </div>
    </div>
  );
}
