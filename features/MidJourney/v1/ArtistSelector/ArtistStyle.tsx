import { useCallback, useState } from "react";
import ArtistCard from "./ArtistCard";

const artistOptions = [
  {
    label: "Andy Warhol",
    value: "by Andy Warhol",
    exampleImage:
      "https://firebasestorage.googleapis.com/v0/b/noonshot-prod.appspot.com/o/midjourney%2Fapp_assets%2Fclaudiofuen_andy_warhol_67c9681a-01d9-4d00-9fbb-d46fb70b7e09.png?alt=media&token=73a3d313-d65d-44f8-9321-25e444de47ef",
  },
  {
    label: "Picasso",
    value: "by Picasso",
    exampleImage:
      "https://firebasestorage.googleapis.com/v0/b/noonshot-prod.appspot.com/o/midjourney%2Fapp_assets%2Fclaudiofuen_picasso_4a67f018-0aeb-4dc7-b98f-f87626b75c50.png?alt=media&token=46d9f98e-8cda-401b-97e8-bc4806e1764b",
  },
  {
    label: "Banksy",
    value: "by Banksy",
    exampleImage:
      "https://firebasestorage.googleapis.com/v0/b/noonshot-prod.appspot.com/o/midjourney%2Fapp_assets%2Fclaudiofuen_banksy_51e7ec11-b0c5-497b-9e53-893592a5c8f5.png?alt=media&token=146f0ba0-e4a6-4b37-8d87-3bd32bae3080",
  },
  {
    label: "Stranger Things",
    value: "by Stranger Things",
    exampleImage:
      "https://firebasestorage.googleapis.com/v0/b/noonshot-prod.appspot.com/o/midjourney%2Fapp_assets%2Fclaudiofuen_stranger_things_27182dc9-8bcc-454d-be63-9bc26a510817.png?alt=media&token=276025c2-f291-4a90-8b05-31c179f5bcaf",
  },
  {
    label: "Victto Ngai",
    value: "by Victto Ngai",
    exampleImage:
      "https://firebasestorage.googleapis.com/v0/b/noonshot-prod.appspot.com/o/midjourney%2Fapp_assets%2Fclaudiofuen_Victto_Ngai_5455abdf-1033-445b-8f94-40a47320192d.png?alt=media&token=971b4a17-77fa-41c0-a513-04925098061d",
  },
  {
    label: "Charlie Bowater",
    value: "by Charlie Bowater",
    exampleImage:
      "https://firebasestorage.googleapis.com/v0/b/noonshot-prod.appspot.com/o/midjourney%2Fapp_assets%2Fclaudiofuen_charlie_bowater_e4d2982a-b5dc-491b-89a7-04f4e84a2cd1.png?alt=media&token=c1879cfe-178e-40d4-9841-b16f7db22a45",
  },
];

export type ArtistOption = {
  label: string;
  value: string;
  exampleImage: string;
};

const filterArrayByUserInput = (
  array: Array<{ label: string; value: string; exampleImage: string }>,
  userInput: string
) => {
  return array.filter((element) => {
    return element.label.toLowerCase().includes(userInput.toLowerCase());
  });
};

export default function ArtistStyle({
  selectedArtists,
  setSelectedArtists,
  setShowArtistModal,
}: {
  selectedArtists: Array<ArtistOption>;
  setSelectedArtists: (artists: Array<ArtistOption>) => void;
  setShowArtistModal: (show: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userInput = event.target.value;
      setSearchQuery(userInput);
    },
    []
  );

  // add artist if it isn't already in the list, otherwise remove it
  const handleArtistClick = useCallback(
    (artist: ArtistOption) => {
      if (selectedArtists.includes(artist)) {
        setSelectedArtists(
          selectedArtists.filter((element) => element !== artist)
        );
      } else {
        setSelectedArtists([...selectedArtists, artist]);
      }
    },
    [setSelectedArtists, selectedArtists]
  );

  const handleCloseModal = useCallback(() => {
    setShowArtistModal(false);
  }, [setShowArtistModal]);

  const filteredOptions = filterArrayByUserInput(artistOptions, searchQuery);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center p-8 bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="shadow-lg border border-primary-100 rounded-xl w-full max-w-3xl">
        <div className="bg-neutral-700 p-4 rounded-t-xl flex justify-between items-center">
          <h5>Artist Style</h5>
          <div>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search.."
              onChange={handleInputChange}
              className="bg-neutral-600 p-2 rounded text-md"
            />
          </div>
        </div>
        <div className="w-full flex bg-neutral-500 flex-wrap p-4 gap-4 overflow-y-auto max-h-80 justify-center">
          {filteredOptions.map((element) => (
            <ArtistCard
              key={element.value}
              element={element}
              selectedArtists={selectedArtists}
              handleArtistClick={handleArtistClick}
            />
          ))}
        </div>
        <div className="bg-neutral-400 text-center text-xs p-1">
          This is a new feature, more styles to be added shortly.
        </div>
        <div className="bg-neutral-700 h-12 flex justify-between items-center p-4 rounded-b-xl">
          <p>{selectedArtists.length} Selected</p>
          <button
            className="p-2 bg-primary-100 rounded-xl text-sm"
            type="button"
            onClick={handleCloseModal}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
