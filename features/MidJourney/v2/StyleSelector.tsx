import { PencilIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  {
    label: "No preference",
    command: "",
  },
  {
    label: "3D Sculpture",
    command: "3D sculpture style",
  },
  {
    label: "Comicbook",
    command: "comicbook style",
  },
  {
    label: "Sketch Drawing",
    command: "sketch drawing style",
  },
  {
    label: "Watercolor",
    command: "watercolor style",
  },
  {
    label: "Old Photograph",
    command: "old photograph style",
  },
  {
    label: "Risograph",
    command: "risograph style",
  },
  {
    label: "Graffiti",
    command: "graffiti style",
  },
  {
    label: "Cyberpunk",
    command: "cyberpunk style",
  },
  {
    label: "Synthwave",
    command: "synthwave style",
  },
  {
    label: "Gouache",
    command: "gouache style",
  },
  {
    label: "Oil Painting",
    command: "oil painting style",
  },
];

export default function StyleSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Style"
      icon={<PencilIcon />}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
}
