import { uuidv4 } from "@firebase/util";
import { PhotographIcon, XIcon } from "@heroicons/react/solid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function ImageReference({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Upload Files to Firebase
      const file = acceptedFiles[0];
      const fileExtension = file.name.split(".").pop() || "";

      if (!["png", "jpg", "jpeg"].includes(fileExtension)) {
        toast.error("Invalid file type, only PNG, JPG, JPEG are allowed.");
        return;
      }

      if (file.size > 5000000) {
        toast.error("File size is too big, max size is 5MB.");
        return;
      }

      const storage = getStorage();
      const logoRef = ref(storage, `/midjourney/images/${uuidv4()}`);

      uploadBytes(logoRef, acceptedFiles[0]).then(() => {
        getDownloadURL(logoRef).then((url) => {
          setImageUrl(url);
        });
      });
    },
    [setImageUrl]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = useCallback(() => {
    setImageUrl("");
  }, [setImageUrl]);

  if (imageUrl !== "") {
    return (
      <div className="max-w-sm">
        <div className="relative z-10">
          <div
            className="bg-neutral-400 hover:bg-red-500 rounded-full absolute -right-2 -top-2 p-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <XIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="rounded bg-neutral-700 flex items-center justify-center">
          <Image
            src={imageUrl}
            width={196}
            height={196}
            alt=""
            className="object-contain rounded"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        {...getRootProps()}
        className="border p-4 border-dashed rounded border-neutral-400 max-w-sm"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="text-center">
            <PhotographIcon className="w-12 h-12 text-white mx-auto mb-2" />
            <p>Drop the files here...</p>
          </div>
        ) : (
          <div className="text-center">
            <PhotographIcon className="w-12 h-12 text-white mx-auto mb-2" />
            <p>Drag n drop an image file here, or click to select.</p>
          </div>
        )}
      </div>
    </>
  );
}
