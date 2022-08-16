import { LightningBoltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import analytics from "../../../../utils/analytics";
import { SelectedOptionObject } from "./Modal";

export default function SelectorCard({
  item,
  selectedOptions,
  setSelectedOptions,
  category,
}: {
  item: {
    label: string;
    command: string;
    imageUrl: string;
  };
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
  category: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const [weight, setWeight] = useState("1");

  useEffect(() => {
    if (selectedOptions.length > 0) {
      // If option is already selected, set active to true
      if (selectedOptions.find((option) => option.command === item.command)) {
        setIsActive(true);
      }
    }

    if (selectedOptions.length === 0) {
      setIsActive(false);
    }
  }, [selectedOptions, item.command]);

  const handleToggleActive = useCallback(() => {
    // check if option exists in selectedOptions, if not add it, otherwise remove it
    if (selectedOptions.find((option) => option.command === item.command)) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.command !== item.command)
      );
      setIsActive(!isActive);
    } else {
      setSelectedOptions([
        ...selectedOptions,
        {
          ...item,
          weight,
        },
      ]);
      setIsActive(isActive);
      analytics.track("MidJourney: Set Option", {
        type: category,
        selectedLabel: item.label,
        selectedCommand: item.command,
      });
    }
  }, [selectedOptions, item, setSelectedOptions, isActive, weight, category]);

  const updateWeightOfSelectedOption = useCallback(
    (weight: string) => {
      const selectedOption = selectedOptions.find(
        (option) => option.command === item.command
      );

      if (selectedOption) {
        setSelectedOptions(
          selectedOptions.map((option) => {
            if (option.command === item.command) {
              return {
                ...option,
                weight,
              };
            }
            return option;
          })
        );
      }
    },
    [selectedOptions, item.command, setSelectedOptions]
  );

  const handleChangeWeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // prevent user from entering more than 5 characters in total
      if (e.target.value.length > 5) {
        return;
      }

      if (/^[0-9]*$/.test(e.target.value)) {
        setWeight(e.target.value);
        updateWeightOfSelectedOption(e.target.value);
      }

      const periods = e.target.value.split(".").length;
      if (periods > 2) {
        return;
      } else if (e.target.value.includes(".")) {
        setWeight(e.target.value);
        updateWeightOfSelectedOption(e.target.value);
      }
    },

    [setWeight, updateWeightOfSelectedOption]
  );

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex-shrink-0 p-2 w-72 rounded-md text-center flex gap-2 mx-2 cursor-pointer ${
          isActive
            ? "bg-primary-100 text-white"
            : "bg-white text-gray-600 hover:bg-neutral-200"
        }`}
        onClick={handleToggleActive}
      >
        <div className="bg-neutral-700 h-32 w-32 rounded shrink-0">
          <Image
            src={item.imageUrl || "/placeholder-image.png"}
            alt={item.label}
            width={128}
            height={128}
            className="rounded"
          />
        </div>
        <div className="flex flex-col justify-center items- flex-grow">
          <span className="select-none break-words capitalize text-md text-left">
            {item.label}
          </span>
        </div>
      </div>
      {isActive && (
        <div className="w-full flex justify-center relative -mt-6">
          <div className="flex bg-white rounded-full shadow-md items-center p-2">
            <LightningBoltIcon className="text-black h-6 w-6" />
            <input
              type="text"
              className="w-16  text-black text-center"
              value={weight}
              onChange={handleChangeWeight}
            />
            {/* <label className="text-black">Weight</label> */}

            <input
              id="default-range"
              type="range"
              value={weight}
              onChange={handleChangeWeight}
              min="-1"
              max="5"
              step="0.1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
