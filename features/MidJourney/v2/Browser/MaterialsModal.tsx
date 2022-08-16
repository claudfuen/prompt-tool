import { ColorSwatchIcon } from "@heroicons/react/outline";
import { useCollection } from "swr-firestore-v9";
import FancyModal, {
  AvailableOptionObject,
  SelectedOptionObject,
} from "./Modal";

export default function MaterialsModal({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
}) {
  const { data } = useCollection<AvailableOptionObject>(
    "midjourney/app/materials",
    {
      listen: true,
      orderBy: ["label", "asc"],
    }
  );

  return (
    <FancyModal
      buttonLabel="Materials"
      modalTitle="Materials"
      options={data}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      icon={<ColorSwatchIcon />}
    />
  );
}
