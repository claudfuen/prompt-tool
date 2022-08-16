import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import analytics from "../../../utils/analytics";
import Footer from "../Layout/Footer";
import MidJourneyHead from "../Layout/MidJourneyHeader";
import MidJourneyNavbar from "../Layout/Navbar/MidJourneyNavbar";
import HistoryCard from "./HistoryCard";

export type HistoryElement = {
  prompt: string;
  imageUrl: string | null;
  generatedAt: string;
};

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryElement[] | null>(null);

  useEffect(() => {
    const historyFromStorage = localStorage.getItem("history");
    if (historyFromStorage) {
      setHistory(JSON.parse(historyFromStorage));
    } else {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    analytics.track("MidJourney: View History");
  }, []);

  const handleClearHistory = useCallback(() => {
    analytics.track("MidJourney: Clear History");
    localStorage.removeItem("history");
    setHistory([]);
  }, []);

  return (
    <div>
      <MidJourneyHead title="MidJourney Prompt Tool - History" />
      <MidJourneyNavbar />
      <div className="py-8 p-4 pb-16 sm:px-16 max-w-6xl mx-auto flex flex-col gap-4 midjourney justify-center overflow-y-auto items-center">
        <h2 className="mt-4 text-center">Your prompt history</h2>
        <div className="w-full flex justify-between">
          <Link href="/midjourney/" passHref>
            <div className="flex gap-2 items-center cursor-pointer hover:opacity-60">
              <ArrowLeftIcon className="mt-1 h-4 w-4" />
              Go back to prompt tool
            </div>
          </Link>
          <div
            className="flex gap-2 items-center cursor-pointer hover:opacity-60"
            onClick={handleClearHistory}
          >
            <TrashIcon className="h-4 w-4" />
            Clear History
            <p>({history && history.length})</p>
          </div>
        </div>

        {history && history.length === 0 && (
          <div className="bg-neutral-700 p-8 rounded w-full text-center">
            ✨ Nothing to see here yet. To get started, head over to the prompt
            tool and generate some prompts!
          </div>
        )}
        {history &&
          history.length > 0 &&
          history
            .sort((a, b) => {
              return (
                new Date(b.generatedAt).getTime() -
                new Date(a.generatedAt).getTime()
              );
            })
            .map((historyElement) => (
              <HistoryCard
                historyElement={historyElement}
                key={historyElement.generatedAt}
              />
            ))}
      </div>
      <Footer activeTab="midjourney" />
    </div>
  );
};

export default HistoryPage;
