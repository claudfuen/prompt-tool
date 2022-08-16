import { PhotographIcon } from "@heroicons/react/outline";
import { useCollection } from "swr-firestore-v9";
import FancyModal, {
  AvailableOptionObject,
  SelectedOptionObject,
} from "./Modal";

export default function StylesModal({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
}) {
  const { data } = useCollection<AvailableOptionObject>(
    "midjourney/app/styles",
    {
      listen: true,
      orderBy: ["label", "asc"],
    }
  );

  return (
    <FancyModal
      buttonLabel="Styles"
      modalTitle="Styles"
      options={data}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      icon={<PhotographIcon />}
    />
  );
}
