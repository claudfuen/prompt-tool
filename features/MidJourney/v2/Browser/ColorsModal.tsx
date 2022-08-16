import { ColorSwatchIcon } from "@heroicons/react/outline";
import { useCollection } from "swr-firestore-v9";
import FancyModal, {
  AvailableOptionObject,
  SelectedOptionObject,
} from "./Modal";

export default function ColorsModal({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
}) {
  const { data } = useCollection<AvailableOptionObject>(
    "midjourney/app/colors",
    {
      listen: true,
      orderBy: ["label", "asc"],
    }
  );

  return (
    <FancyModal
      buttonLabel="Colors"
      modalTitle="Colors"
      options={data}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      icon={<ColorSwatchIcon />}
    />
  );
}
