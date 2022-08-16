import FeedbackBox from "../v2/FeedbackBox";

export default function Footer({
  activeTab,
}: {
  activeTab: "midjourney" | "dalle";
}) {
  return (
    <div className="bg-neutral-700 p-4 rounded flex flex-col justify-center items-center mt-16 overflow-x-auto">
      <div className="flex gap-4 py-12 flex-wrap justify-center">
        <FeedbackBox activeTab={activeTab} />
      </div>
    </div>
  );
}
