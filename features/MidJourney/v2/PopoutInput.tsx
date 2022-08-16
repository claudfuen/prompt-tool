import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Fragment, useCallback, useEffect, useState } from "react";
import analytics from "../../../utils/analytics";
import { DropdownValueProps } from "../MidJourneyPage";

export default function PopoutInput({
  label,
  icon,
  options,
  value,
  setValue,
}: {
  label: string;
  icon: React.ReactNode;
  options: DropdownValueProps[];
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps) => void;
}) {
  const [isActive, setIsActive] = useState(false);
  const setSelected = useCallback(
    (selectedOption: DropdownValueProps) => {
      setValue(selectedOption);
      analytics.track("MidJourney: Set Option", {
        type: label,
        selectedLabel: selectedOption.label,
        selectedCommand: selectedOption.command,
      });
    },
    [label, setValue]
  );

  useEffect(() => {
    if (value && value?.command !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [value, setIsActive]);

  return (
    <div>
      <Listbox value={value} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`min-w-[12rem] h-12 relative w-full rounded text-white py-2 px-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm cursor-pointer ${
              isActive ? "bg-primary-100" : "bg-neutral-500"
            }`}
          >
            <div className="flex gap-2 justify-center items-center">
              <div className="flex-shrink-0 h-4 w-4">{icon}</div>
              {isActive && (
                <span className="block capitalize truncate max-w-xs">
                  {value?.label}
                </span>
              )}
              {!isActive && <span className="block">{label}</span>}
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-full midjourney-scrollbar z-10">
              {options.map((option) => (
                <Listbox.Option
                  key={option.label}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
