import React, { useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import analytics from "../../../utils/analytics";
import { HistoryElement } from "./HistoryPage";

export default function HistoryCard({
  historyElement,
}: {
  historyElement: HistoryElement;
}) {
  const handleCopyPrompt = useCallback(() => {
    toast.success("Copied to clipboard");
    analytics.track("MidJourney: Copy to Clipboard", {
      prompt: historyElement.prompt,
      from: "history",
    });
  }, [historyElement.prompt]);

  const historyDateString = new Date(
    historyElement.generatedAt
  ).toLocaleString();

  return (
    <div
      className="flex gap-4 p-8 bg-neutral-700 rounded w-full justify-between items-center"
      key={historyElement.generatedAt}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="overflow-x-auto w-full scrollbar">
          <p>{historyElement.prompt}</p>
        </div>
        <p className="text-neutral-500">{historyDateString}</p>
      </div>
      <CopyToClipboard text={historyElement.prompt} onCopy={handleCopyPrompt}>
        <button className="p-2 bg-neutral-600 rounded">Copy</button>
      </CopyToClipboard>
    </div>
  );
}
