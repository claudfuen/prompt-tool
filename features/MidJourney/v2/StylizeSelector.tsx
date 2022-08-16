import { ColorSwatchIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  {
    label: "Lowest - less artistic.",
    command: "--stylize 625",
  },
  {
    label: "Lower - 'less strict' but still 'pretty'",
    command: "--stylize 1250",
  },
  {
    label: "Default",
    command: "",
  },
  {
    label:
      "Higher - 'take over' and start drifting from your text, but not go crazy.",
    command: "--stylize 20000",
  },
  {
    label: "Highest - Hands off the wheels, who knows what will happen.",
    command: "--stylize 60000",
  },
];

export default function StylizeSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Stylize"
      icon={<ColorSwatchIcon />}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
}
