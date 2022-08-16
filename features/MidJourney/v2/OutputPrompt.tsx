import { DuplicateIcon } from "@heroicons/react/solid";
import { useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import analytics from "../../../utils/analytics";
import { HistoryElement } from "../MidJourneyPage";

export default function OutputPrompt({
  prompt,
  history,
  setHistory,
  activeTab,
}: {
  prompt: string;
  history: HistoryElement[];
  setHistory: (history: HistoryElement[]) => void;
  activeTab: "midjourney" | "dalle";
}) {
  const handleCopyPrompt = useCallback(() => {
    toast.success("Copied to clipboard");

    if (activeTab === "midjourney") {
      analytics.track("MidJourney: Copy to Clipboard", { prompt });
    }

    if (activeTab === "dalle") {
      analytics.track("DallE: Copy to Clipboard", { prompt });
    }

    const newHistory = [
      ...history,
      { prompt, imageUrl: null, generatedAt: new Date().toISOString() },
    ];
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  }, [prompt, setHistory, history, activeTab]);

  return (
    <div className="flex gap-2 rounded-xl mt-8 border-4 p-4 items-center bg-white">
      <div className="w-full text-black rounded p-2 overflow-y-auto scrollbar">
        {prompt}
      </div>
      <CopyToClipboard text={prompt} onCopy={handleCopyPrompt}>
        <button className="p-2 bg-primary-100 rounded hover:bg-primary-300 flex gap-2 items-center w-56 justify-center">
          Copy Prompt
          <DuplicateIcon className="w-6 h-6 flex-shrink-0" />
        </button>
      </CopyToClipboard>
    </div>
  );
}
