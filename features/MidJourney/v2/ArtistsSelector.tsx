import { ColorSwatchIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  "",
  "Pablo Picasso",
  "Vincent Van Gogh",
  "Claude Monet",
  "Edvard Munch",
  "Salvador Dali",
  "Edgar Degas",
  "Paul Cezanne",
  "Rene Magritte",
  "Sonia Delaunay",
  "Zeng Fanzhi",
  "Vitto Ngai",
  "Yoji Shinkawa",
  "J.M.W. Turner",
  "Gerald Brom",
  "Jack Kirby",
  "Pre-Raphaelite",
  "Alphonse Mucha",
  "Caspar David Friedrich",
];

const alphabeticallySortedOptions = options.sort();

const artistOptions = alphabeticallySortedOptions.map((option) => {
  if (option === "") {
    return { label: "No Preference", command: "" };
  }
  return {
    label: option,
    command: `by ${option}`,
  };
});

export default function ArtistSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Artist"
      icon={<ColorSwatchIcon />}
      value={value}
      setValue={setValue}
      options={artistOptions}
    />
  );
}
