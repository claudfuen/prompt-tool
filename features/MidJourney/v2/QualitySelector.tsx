import { ShieldCheckIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  {
    label: "0.25x - Rough results, 4x faster / cheaper. ",
    command: "--quality 0.25",
  },
  {
    label: "0.5x - Less detailed results but 2x faster / cheaper.",
    command: "--quality 0.5",
  },
  {
    label: "1x - Default",
    command: "",
  },
  {
    label: "2x - More detailed results but 2x slower and 2x the price.",
    command: "--quality 2",
  },
  // {
  //   label: "5x - Maximum but experimental, 5 min per image",
  //   command: "--quality 5",
  // },
];

export default function QualitySelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Quality"
      icon={<ShieldCheckIcon />}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
}
