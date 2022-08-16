import { LightBulbIcon } from "@heroicons/react/outline";
import { useCollection } from "swr-firestore-v9";
import FancyModal, {
  AvailableOptionObject,
  SelectedOptionObject,
} from "./Modal";

export default function LightingModal({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
}) {
  const { data } = useCollection<AvailableOptionObject>(
    "midjourney/app/lighting",
    {
      listen: true,
      orderBy: ["label", "asc"],
    }
  );

  return (
    <FancyModal
      buttonLabel="Lighting"
      modalTitle="Lighting"
      options={data}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      icon={<LightBulbIcon />}
    />
  );
}
