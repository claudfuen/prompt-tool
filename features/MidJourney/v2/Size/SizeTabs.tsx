import React, { useCallback } from "react";

export default function SizeTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const setNoneType = useCallback(() => {
    setActiveTab("none");
  }, [setActiveTab]);
  const setAspectRatioType = useCallback(() => {
    setActiveTab("aspectRatio");
  }, [setActiveTab]);
  const setHeightWidthType = useCallback(() => {
    setActiveTab("heightWidth");
  }, [setActiveTab]);

  const sharedClasses = "p-2 border-b-2 cursor-pointer";
  const inactiveClasses = `${sharedClasses} text-gray-500`;
  const activeClasses = `${sharedClasses} border-primary-100 text-primary-100`;

  return (
    <div className="flex gap-2 justify-center text-neutral-700">
      <button
        type="button"
        onClick={setNoneType}
        className={activeTab === "none" ? activeClasses : inactiveClasses}
      >
        Default
      </button>
      <button
        type="button"
        onClick={setAspectRatioType}
        className={
          activeTab === "aspectRatio" ? activeClasses : inactiveClasses
        }
      >
        Aspect Ratio
      </button>
      <button
        type="button"
        onClick={setHeightWidthType}
        className={
          activeTab === "heightWidth" ? activeClasses : inactiveClasses
        }
      >
        Height/Width
      </button>
    </div>
  );
}
