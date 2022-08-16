import { Popover } from "@headlessui/react";

export default function PopoverButton({
  open,
  label,
  icon,
  isActive,
  isActiveString,
}: {
  open: boolean;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isActiveString: string;
}) {
  return (
    <Popover.Button
      className={`
      ${open ? "" : ""}
      min-w-[12rem] h-12 relative w-full rounded text-white py-2 px-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm cursor-pointer flex gap-2 justify-center items-center ${
        isActive ? "bg-primary-100" : "bg-neutral-500"
      }`}
    >
      <div className="w-4 h-4">{icon}</div>
      <span className="">{isActive ? isActiveString : label}</span>
    </Popover.Button>
  );
}
