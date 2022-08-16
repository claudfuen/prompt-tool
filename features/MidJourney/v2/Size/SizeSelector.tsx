import { Popover, Transition } from "@headlessui/react";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import PopoverButton from "../PopoverButton";
import AspectRatio from "./AspectRatio";
import DefaultSize from "./DefaultSize";
import HeightWidth from "./HeightWidth";
import SizeTabs from "./SizeTabs";

export default function SizeSelector({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("none");
  const [aspectRatioString, setAspectRatioString] = useState("--ar 1:1");
  const [height, setHeight] = useState("--h 1000");
  const [width, setWidth] = useState("--w 1000");

  useEffect(() => {
    if (activeTab === "none") {
      setValue("");
    }
    if (activeTab === "aspectRatio") {
      setValue(aspectRatioString);
    }
    if (activeTab === "heightWidth") {
      setValue(`${height} ${width}`);
    }
  }, [value, activeTab, aspectRatioString, height, width, setValue]);

  const activeTabString = (() => {
    if (activeTab === "aspectRatio") {
      return "Aspect Ratio";
    } else if (activeTab === "heightWidth") {
      return "Height/Width";
    }
    return "";
  })();

  return (
    <div>
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton
              open={open}
              label="Size"
              icon={<ArrowsExpandIcon />}
              isActive={activeTab !== "none"}
              isActiveString={activeTabString}
            />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xl -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative gap-8 bg-white p-7 text-black flex flex-col items-center">
                    <SizeTabs
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                    <div className="bg-neutral-200 rounded p-8">
                      {activeTab === "aspectRatio" && (
                        <AspectRatio
                          aspectRatioString={aspectRatioString}
                          setAspectRatioString={setAspectRatioString}
                        />
                      )}
                      {activeTab === "heightWidth" && (
                        <HeightWidth
                          height={height}
                          setHeight={setHeight}
                          width={width}
                          setWidth={setWidth}
                        />
                      )}
                      {activeTab === "none" && <DefaultSize />}
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
