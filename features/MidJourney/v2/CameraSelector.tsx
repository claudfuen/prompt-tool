import { CameraIcon } from "@heroicons/react/outline";
import { DropdownValueProps } from "../MidJourneyPage";
import PopoutInput from "./PopoutInput";

const options = [
  "",
  "super-resolution microscopy",
  "microscopy",
  "macro lens",
  "pinhole lens",
  "knolling",
  "first person view",
  "wide angle lens",
  "lens distortion",
  "ultra-wide angle lens",
  "fisheye lens",
  "telephoto lens",
  "panorama",
  "360 panorama",
  "tilt-shift lens",
  "telescope lens",
  "drone view",
  "aerial",
  "from above",
  "satellite imagery",
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

export default function CameraSelector({
  value,
  setValue,
}: {
  value: DropdownValueProps | null;
  setValue: (value: DropdownValueProps | null) => void;
}) {
  return (
    <PopoutInput
      label="Camera"
      icon={<CameraIcon />}
      value={value}
      setValue={setValue}
      options={lightingOptions}
    />
  );
}
