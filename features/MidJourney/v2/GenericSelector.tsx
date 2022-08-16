import { useCallback } from "react";

export default function GenericSelector({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const optionsHtml = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="flex justify-center">
      <select
        className="text-black p-2 rounded w-56"
        onChange={handleChange}
        value={value}
      >
        {optionsHtml}
      </select>
    </div>
  );
}
