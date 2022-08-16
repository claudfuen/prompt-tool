import Link from "next/link";
import React from "react";

export default function ModelSelector({ activeTab }: { activeTab: string }) {
  return (
    <div className="bg-neutral-700 rounded-full p-1 flex gap-1 text-sm">
      <Link href="/midjourney" passHref>
        <button
          className={`p-1 px-3 rounded-full hover:bg-primary-300 ${
            activeTab === "midjourney" ? "bg-primary-100" : ""
          }`}
        >
          MidJourney
        </button>
      </Link>
      <Link href="/dalle" passHref>
        <button
          className={`p-1 px-3 rounded-full hover:bg-primary-300 ${
            activeTab === "dalle" ? "bg-primary-100" : ""
          }`}
        >
          Dall-E
        </button>
      </Link>
    </div>
  );
}
