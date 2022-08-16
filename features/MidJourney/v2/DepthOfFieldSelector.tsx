import { EyeIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  {
    label: "No preference",
    command: "",
  },
  {
    label: "Deep (full focus)",
    command: "defocus::-0.5",
  },
  {
    label: "Shallow (focal blur)",
    command: "dof",
  },
];

export default function DOFSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Depth of Field"
      icon={<EyeIcon />}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
}
