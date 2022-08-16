import { LightBulbIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  "",
  "moody lighting",
  "cinematic lighting",
  "studio lighting",
  "soft lighting",
  "hard lighting",
  "accent lighting",
  "volumetric lighting",
  "contre-jour lighting",
  "bright lighting",
  "candlelight",
  "dark lighting",
  "dramatic lighting",
  "early morning",
  "film noir lighting",
  "golden hour sunlight",
  "night lighting",
  "realistic lighting",
  "sunset lighting",
  "campfire lighting",
  "blinding lighting",
  "spotlight",
  "floodlight",
  "halfrear lighting",
  "backlight",
  "crepuscular rays",
  "natural lighting",
  "sunlight",
  "fluorescent bulb",
  "plasma globe",
  "glow stick",
  "laser",
  "neon bulb",
  "lantern",
  "edison bulb",
  "vacuum tube bulb",
  "nixie tube bulb",
  "christmas lights",
  "infrared",
  "black light bulb",
  "x-ray",
  "daylight",
  "lens flare",
  "light rays",
  "LED lights",
  "silhouette",
  "glow in the dark",
  "bioluminescence",
  "glowing",
  "fire",
  "candle",
];

const lightingOptions = options.map((option) => {
  if (option === "") {
    return { label: "No Preference", command: "" };
  }
  return {
    label: option,
    command: option,
  };
});

export default function LightingSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Lighting"
      icon={<LightBulbIcon />}
      value={value}
      setValue={setValue}
      options={lightingOptions}
    />
  );
}
