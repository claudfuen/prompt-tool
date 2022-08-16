import React, { useCallback } from "react";

export default function AvoidBar({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  return (
    <input
      className="bg-neutral-500 rounded-md p-2 w-2/3 text-red-300 text-sm"
      value={value}
      onChange={handleChange}
      placeholder="Avoid these terms.. (e.g. trees, buildings, etc.)"
    />
  );
}
