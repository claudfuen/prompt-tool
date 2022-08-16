import React, { useCallback, useState } from "react";
import analytics from "../../../utils/analytics";
import { callZapier } from "../../../utils/zapier";

export default function FeedbackBox({
  activeTab,
}: {
  activeTab: "midjourney" | "dalle";
}) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedback(e.target.value);
    },
    [setFeedback]
  );

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    await callZapier("submitPromptToolFeedback", {
      feedback: `${activeTab}: ${feedback}`,
    });

    if (activeTab === "midjourney") {
      analytics.track("MidJourney: Submit Feedback", {
        feedback,
      });
    }
    if (activeTab === "dalle") {
      analytics.track("DallE: Submit Feedback", {
        feedback,
      });
    }
    setFeedbackSent(true);
    setFeedback("");
    setIsSubmitting(false);
  }, [setFeedbackSent, feedback, activeTab]);

  const hanldeSubmitAnother = useCallback(() => {
    setFeedbackSent(false);
    setFeedback("");
  }, [setFeedbackSent]);

  const isEmpty = feedback.length === 0;

  return (
    <div className="flex flex-col gap-2">
      {!feedbackSent ? (
        <>
          <p className="text-center">How can we make this tool even better?</p>
          <textarea
            name=""
            id=""
            cols={32}
            rows={3}
            value={feedback}
            onChange={handleChange}
            placeholder="I wish you could..."
            className="rounded p-4 bg-neutral-600"
          ></textarea>
          <button
            className={`ounded p-2 text-sm rounded ${
              isEmpty ? "bg-neutral-400 text-opacity-50" : "bg-primary-100"
            }`}
            disabled={isEmpty || isSubmitting}
            onClick={handleSubmit}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </>
      ) : (
        <>
          <p className="text-center">Thanks for your feedback!</p>
          <div className="flex flex-col gap-2">
            <button
              className="p-2 px-4 rounded bg-neutral-600 text-sm"
              onClick={hanldeSubmitAnother}
            >
              Submit Another Suggestion
            </button>
          </div>
        </>
      )}
    </div>
  );
}
