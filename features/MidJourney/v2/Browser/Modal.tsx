import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { Fragment, useCallback, useState } from "react";
import { Document } from "swr-firestore-v9";

import SelectorCard from "./SelectorCard";

export type AvailableOptionObject = {
  label: string;
  command: string;
  imageUrl: string;
};

export type SelectedOptionObject = {
  label: string;
  command: string;
  imageUrl: string;
  weight: string;
};

export default function FancyModal({
  buttonLabel,
  modalTitle,
  options,
  bannerText,
  selectedOptions,
  setSelectedOptions,
  icon,
}: {
  buttonLabel: string;
  modalTitle: string;
  options: Document<AvailableOptionObject>[] | undefined | null;
  bannerText?: string;
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
  icon?: React.ReactElement;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClearAllOptions = useCallback(() => {
    setSelectedOptions([]);
    setIsOpen(false);
  }, [setSelectedOptions]);

  const handleSearchTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );

  const handleClearSearchText = useCallback(() => {
    setSearchText("");
  }, [setSearchText]);

  const categoryIsActive = selectedOptions.length > 0;

  if (!options) {
    return null;
  }
  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="">
      <button
        className={`min-w-[12rem] h-12   relative w-full rounded text-white py-2 px-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm cursor-pointer ${
          categoryIsActive ? "bg-primary-100" : "bg-neutral-500"
        }`}
        type="button"
        onClick={openModal}
      >
        <div className="flex gap-2 justify-center items-center">
          <div className="flex-shrink-0 h-4 w-4">{icon || <SearchIcon />}</div>
          {categoryIsActive && (
            <>
              <span className="block capitalize">{`${buttonLabel}`}</span>
              <span className="block text-sm bg-primary-300 p-1 rounded-full px-3">{`${selectedOptions.length}`}</span>
            </>
          )}

          {!categoryIsActive && <span className="block">{buttonLabel}</span>}
        </div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-6 flex flex-col sm:flex-row justify-between items-center gap-2"
                  >
                    <div>{modalTitle}</div>
                    <div className="bg-gray-200 rounded flex items-center">
                      <div className="p-2">
                        <SearchIcon className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search.."
                        className="p-2 bg-gray-100 rounded-r"
                        value={searchText}
                        onChange={handleSearchTextChange}
                      />
                    </div>
                  </Dialog.Title>
                  <div className="flex gap-4 flex-wrap justify-center py-8 overflow-y-auto max-h-[30rem] border-t border-b bg-gray-200">
                    {filteredOptions.map((i) => (
                      <SelectorCard
                        item={i}
                        key={i.label}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        category={buttonLabel}
                      />
                    ))}
                    {filteredOptions.length === 0 && (
                      <div className="p-4">
                        <div className="text-center">
                          <div className="text-gray-500">
                            {`No results found for "${searchText}"`}
                          </div>

                          <div className="text-gray-500">
                            Try searching for something else or{" "}
                            <span
                              onClick={handleClearSearchText}
                              className="underline cursor-pointer hover:text-primary-100"
                            >
                              view all results
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {bannerText && (
                    <div className="bg-gray-300 text-center text-xs text-gray-600 p-2">
                      {bannerText}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2 p-6 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleClearAllOptions}
                    >
                      {selectedOptions.length > 0
                        ? "Clear All & Close"
                        : "Cancel"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Continue ({selectedOptions.length})
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
