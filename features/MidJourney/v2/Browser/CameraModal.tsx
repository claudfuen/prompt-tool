import { CameraIcon } from "@heroicons/react/outline";
import { useCollection } from "swr-firestore-v9";
import FancyModal, {
  AvailableOptionObject,
  SelectedOptionObject,
} from "./Modal";

export default function CameraModal({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: SelectedOptionObject[];
  setSelectedOptions: (selectedOptions: SelectedOptionObject[]) => void;
}) {
  const { data } = useCollection<AvailableOptionObject>(
    "midjourney/app/camera",
    {
      listen: true,
      orderBy: ["label", "asc"],
    }
  );

  return (
    <FancyModal
      buttonLabel="Camera"
      modalTitle="Camera/Lens"
      options={data}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      icon={<CameraIcon />}
    />
  );
}
