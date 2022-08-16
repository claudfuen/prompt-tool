import { LightningBoltIcon, SparklesIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useCallback } from "react";
import analytics from "../../../utils/analytics";

export default function InputBar({
  value,
  setValue,
  mainIdeaWeight,
  setMainIdeaWeight,
  type,
}: {
  value: string;
  setValue: (value: string) => void;
  mainIdeaWeight?: string;
  setMainIdeaWeight?: (weight: string) => void;
  type: "midjourney" | "dalle";
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      localStorage.setItem("mainIdea", e.target.value);
    },
    [setValue]
  );

  const callOpenAI = useCallback(() => {
    analytics.track("MidJourney: Magic", { prompt: value });
    axios
      .get(`/api/openai?prompt=${value}`)
      .then((response) => {
        const string = response.data.choices[0].text;
        const cleanString = string
          .replace(/\n/g, " ")
          .replace(/  /g, " ")
          .trim();

        setValue(`${value} ${cleanString}`);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [value, setValue]);

  const handleChangeWeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type !== "midjourney") return;
      if (!setMainIdeaWeight) return;

      // prevent user from entering more than 5 characters in total
      if (e.target.value.length > 5) {
        return;
      }

      if (/^[0-9]*$/.test(e.target.value)) {
        setMainIdeaWeight(e.target.value);
      }

      const periods = e.target.value.split(".").length;
      if (periods > 2) {
        return;
      } else if (e.target.value.includes(".")) {
        setMainIdeaWeight(e.target.value);
      }
    },

    [setMainIdeaWeight, type]
  );

  return (
    <>
      <div className="w-full text-black rounded-2xl  text-2xl flex justify-between">
        <div className="flex items-center bg-neutral-500 w-full rounded-2xl ">
          {/* OPEN AI IS HIDDEN FOR NOW */}
          <div className="p-4 hidden">
            <button
              onClick={callOpenAI}
              className="rounded-full bg-primary-100 p-2 text-white text-xs flex"
            >
              Surprise Me
              <SparklesIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <textarea
            value={value}
            rows={1}
            onChange={handleChange}
            placeholder="Start typing your main idea..."
            className="bg-neutral-500 w-full text-white p-8 rounded-2xl midjourney-scrollbar min-h-[8rem] md:min-h-min"
            style={{
              resize: "none",
            }}
          ></textarea>
        </div>
      </div>
      {type === "midjourney" && value.length > 0 && (
        <div className="-mt-8 rounded-b-md max-w-sm w-full">
          <div className="flex bg-neutral-700 rounded-full shadow-md items-center p-2">
            <LightningBoltIcon className="text-white h-6 w-6" />
            <input
              type="text"
              className="w-16  text-white text-center bg-transparent"
              value={mainIdeaWeight}
              onChange={handleChangeWeight}
            />
            {/* <label className="text-black">Weight</label> */}
            <input
              id="default-range"
              type="range"
              value={mainIdeaWeight}
              onChange={handleChangeWeight}
              min="0"
              max="5"
              step="0.1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            ></input>
          </div>
        </div>
      )}
    </>
  );
}
