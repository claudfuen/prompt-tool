import { CodeIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  {
    label: "Version 3 - Default",
    command: "",
  },
  {
    label: "Version 2",
    command: "--v 2",
  },
  {
    label: "Version 1",
    command: "--v 1",
  },
];

export default function VersionSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Version 3"
      icon={<CodeIcon />}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
}
