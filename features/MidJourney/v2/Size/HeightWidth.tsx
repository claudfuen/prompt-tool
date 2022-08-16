import GenericSelector from "../GenericSelector";

const heightOptions = [
  {
    label: "1000px",
    value: "--h 1000",
  },
  {
    label: "1080px (HD)",
    value: "--h 1080",
  },
  {
    label: "1440px (QHD)",
    value: "--h 1440",
  },
  {
    label: "1600px",
    value: "--h 1600",
  },
  {
    label: "2160px (4K)",
    value: "--h 2160",
  },
];
const widthOptions = [
  {
    label: "1000px",
    value: "--w 1000",
  },
  {
    label: "1920px (HD)",
    value: "--w 1920",
  },
  {
    label: "2650px (QHD)",
    value: "--w 2650",
  },
  {
    label: "3840px (4K)",
    value: "--w 3840",
  },
];

export default function HeightWidth({
  height,
  setHeight,
  width,
  setWidth,
}: {
  height: string;
  setHeight: (value: string) => void;
  width: string;
  setWidth: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 text-center justify-center">
      <div className="mx-auto">
        <p>Height</p>
        <GenericSelector
          value={height}
          setValue={setHeight}
          options={heightOptions}
        />
      </div>
      <div>
        <p>Width</p>
        <GenericSelector
          value={width}
          setValue={setWidth}
          options={widthOptions}
        />
      </div>
    </div>
  );
}
