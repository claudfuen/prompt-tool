import GenericSelector from "../GenericSelector";

const aspectRatioOptions = [
  {
    label: "1:1 Square",
    value: "--ar 1:1",
  },
  {
    label: "2:1 Standard TV/Film",
    value: "--ar 2:1",
  },
  {
    label: "3:2 Standard DSLR",
    value: "--ar 3:2",
  },
  {
    label: "4:3 Early Video/Photography",
    value: "--ar 4:3",
  },
  {
    label: "16:9 Standard HD Video",
    value: "--ar 16:9",
  },
  {
    label: "21:9 Ultrawide",
    value: "--ar 21:9",
  },
  {
    label: "1:2 Vertical",
    value: "--ar 1:2",
  },
  {
    label: "4:5 Vertical Instagram Post",
    value: "--ar 4:5",
  },
  {
    label: "9:16 Vertical/Instagram Story",
    value: "--ar 9:16",
  },
];

export default function AspectRatio({
  aspectRatioString,
  setAspectRatioString,
}: {
  aspectRatioString: string;
  setAspectRatioString: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-col">
      <GenericSelector
        value={aspectRatioString}
        setValue={setAspectRatioString}
        options={aspectRatioOptions}
      />
    </div>
  );
}
