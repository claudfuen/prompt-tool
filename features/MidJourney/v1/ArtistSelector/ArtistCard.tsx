import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { ArtistOption } from "./ArtistStyle";

export default function ArtistCard({
  element,
  handleArtistClick,
  selectedArtists,
}: {
  element: {
    label: string;
    value: string;
    exampleImage: string;
  };
  handleArtistClick: (artist: ArtistOption) => void;
  selectedArtists: Array<ArtistOption>;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // If the artist is already selected, set the card to active
    if (selectedArtists.length > 0) {
      if (selectedArtists.includes(element)) {
        setIsActive(true);
      }
    }
    return () => {
      setIsActive(false);
    };
  }, [selectedArtists, element]);

  const handleClick = useCallback(() => {
    handleArtistClick(element);
    setIsActive(!isActive);
  }, [element, handleArtistClick, isActive]);

  return (
    <div
      className={`flex border rounded cursor-pointer w-56 ${
        isActive ? "bg-primary-100" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 h-32">
        <Image src={element.exampleImage} alt="" width={128} height={128} />
      </div>
      <div className="flex flex-col justify-center p-4">
        <h5>{element.label}</h5>
        {/* <input
    type="text"
    placeholder="0.75"
    className="w-24 bg-neutral-600 p-2 rounded text-md"
  /> */}
      </div>
    </div>
  );
}
