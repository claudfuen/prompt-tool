import { uuidv4 } from "@firebase/util";
import {
  ArrowLeftIcon,
  ClipboardCopyIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDropzone } from "react-dropzone";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { deleteDoc, Document, useCollection } from "swr-firestore-v9";
import Spinner from "../../components/Spinner";
import { auth } from "../_app";

const categories = [
  {
    name: "Styles",
  },
  {
    name: "Lighting",
  },
  {
    name: "Camera",
  },
  {
    name: "Materials",
  },
  {
    name: "Artists",
  },
  {
    name: "Colors",
  },
];

function TabOption({
  name,
  activeTab,
  setActiveTab,
}: {
  name: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const handleClick = useCallback(() => {
    setActiveTab(name);
  }, [setActiveTab, name]);

  const isActive = activeTab === name;

  return (
    <li className="mr-2" key={name}>
      <button
        type="button"
        className={`inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
          isActive ? "bg-primary-100 text-white" : ""
        }`}
        onClick={handleClick}
      >
        {name}
      </button>
    </li>
  );
}

function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {categories.map((category) => (
          <TabOption
            key={category.name}
            name={category.name}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        ))}
      </ul>
    </div>
  );
}

type Element = {
  label: string;
  command: string;
  imageUrl: string;
};

function SingleElement({
  element,
  activeTab,
}: {
  element: Document<Element>;
  activeTab: string;
}) {
  const path = activeTab.toLocaleLowerCase();

  const handleDelete = useCallback(() => {
    deleteDoc(`midjourney/app/${path}/${element.id}`);
  }, [path, element.id]);

  const hasImage = typeof element.imageUrl === "string";
  const imageIsValidUrl = hasImage && element.imageUrl.startsWith("https");

  return (
    <div className="p-2 bg-white flex gap-4 justify-between" key={element.id}>
      <div className="flex gap-2 items-center">
        {imageIsValidUrl ? (
          <Image
            src={element.imageUrl}
            width={128}
            height={128}
            alt=""
            className="rounded"
          />
        ) : (
          <div className="text-black">{element.imageUrl}</div>
        )}

        <div className="text-black">{element.label}</div>
        <div className="text-gray-500 p-1 bg-gray-200 rounded">
          {element.command}
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="bg-red-100 text-red-900 px-4 py-2 rounded-full shadow-lg hover:shadow-md focus:outline-none focus:shadow-outline"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ListOfElements({ activeTab }: { activeTab: string }) {
  const routeString = activeTab.toLocaleLowerCase();
  const { data } = useCollection<Element>(
    `midjourney/app/${routeString}`
    // {
    //   listen: true,
    // }
  );

  if (!data) return <div>Loading...</div>;
  if (data.length === 0)
    return <div>There are no elements in this collection.</div>;

  const elements = data.map((element) => (
    <SingleElement element={element} key={element.id} activeTab={activeTab} />
  ));
  return <div className="flex flex-col gap-2">{elements}</div>;
}

function ImageUploader({
  imageUrl,
  setImageUrl,
  activeTab,
  label,
  setLabel,
  command,
  setCommand,
}: {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  activeTab: string;
  label: string;
  setLabel: (label: string) => void;
  command: string;
  setCommand: (command: string) => void;
}) {
  const [loading, setLoading] = useState(false);

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
      const logoRef = ref(
        storage,
        `/midjourney/images/${activeTab.toLocaleLowerCase()}/${uuidv4()}`
      );

      setLoading(true);
      uploadBytes(logoRef, acceptedFiles[0])
        .then(() => {
          getDownloadURL(logoRef).then((url) => {
            setImageUrl(url);

            toast.success("Image uploaded successfully.");
            setLoading(false);

            // If label and command are empty, set them to the image name
            if (!label && !command && file.name) {
              // Remove the file extension

              // if file has a file extension, remove it
              let fileName = "";
              if (file.name.includes(".")) {
                fileName = file.name.split(".").shift() || "";
              }
              // Capitalize  all the words
              const fileNameCapitalized = fileName
                .split(" ")
                .map((word) => {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(" ");

              setLabel(fileNameCapitalized);
              setCommand(fileName);
            }
          });
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    },
    [setImageUrl, activeTab, command, label, setLabel, setCommand]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = useCallback(() => {
    setImageUrl("");
  }, [setImageUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-neutral-600 rounded-md">
        <Spinner />
      </div>
    );
  }

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
        className="border p-4 border-dashed rounded border-neutral-400 max-w-sm h-full flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="text-center">
            <PhotographIcon className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-xs">Drop the files here...</p>
          </div>
        ) : (
          <div className="text-center">
            <PhotographIcon className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-xs">Drag or click</p>
          </div>
        )}
      </div>
    </>
  );
}

function MidJourneyPrompt({ command }: { command: string }) {
  const promptString = `/imagine prompt: floating liquid drop:: ${command}::2 --seed 696`;

  const handleOnCopy = useCallback(() => {
    toast.success("Copied to clipboard!");
  }, []);

  return (
    <div className="p-4 bg-neutral-500 flex flex-col gap-2 justify-center items-center">
      <div className="text-xs">
        Use this prompt to generate the image for this option.
      </div>

      <CopyToClipboard text={promptString} onCopy={handleOnCopy}>
        <div className="flex gap-2 items-center p-2 bg-neutral-700 rounded cursor-pointer hover:bg-neutral-600">
          <p className="">{promptString}</p>
          <ClipboardCopyIcon className="w-5 h-5 text-white" />
        </div>
      </CopyToClipboard>
    </div>
  );
}

function Form({ activeTab }: { activeTab: string }) {
  const [label, setLabel] = useState("");
  const [command, setCommand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const routeString = activeTab.toLocaleLowerCase();
  const { add } = useCollection(`midjourney/app/${routeString}`);

  // If active tab changes, reset the form
  const [, setActiveTab] = useState(activeTab);
  useEffect(() => {
    setLabel("");
    setCommand("");
    setImageUrl("");
    setActiveTab(activeTab);
  }, [activeTab, setActiveTab]);

  // if user edits label, update command
  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value);
      setCommand(e.target.value.toLocaleLowerCase());
    },
    [setLabel, setCommand]
  );

  const handleCommandChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommand(e.target.value);
    },
    [setCommand]
  );

  const handleClick = useCallback(() => {
    if (label === "") {
      toast.error("Please enter a label.");
      return;
    }
    if (command === "") {
      toast.error("Please enter a command.");
      return;
    }
    if (imageUrl === "") {
      toast.error("Please upload an image.");
      return;
    }

    add({
      label,
      command,
      imageUrl,
    });

    setLabel("");
    setCommand("");
    setImageUrl("");
  }, [add, label, command, imageUrl]);

  return (
    <>
      <div className="bg-neutral-700 p-4 flex gap-2 items-center">
        <div className="w-24 h-24">
          <ImageUploader
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            activeTab={activeTab}
            label={label}
            setLabel={setLabel}
            command={command}
            setCommand={setCommand}
          />
        </div>
        <div>
          <label className="text-white">Label</label>
          <input
            type="text"
            className="bg-neutral-500 rounded-md p-2"
            placeholder="Label"
            value={label}
            onChange={handleLabelChange}
          />
        </div>
        <div>
          <label className="text-white">Command</label>
          <input
            type="text"
            className="bg-neutral-600 rounded-md p-2"
            placeholder="Command"
            value={command}
            onChange={handleCommandChange}
          />
        </div>

        <div className="ml-auto">
          <button
            type="button"
            className="p-2 rounded-md bg-primary-100"
            onClick={handleClick}
          >
            Add New Option
          </button>
        </div>
      </div>
      {command !== "" && <MidJourneyPrompt command={command} />}
    </>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Styles");
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  const handleSignInWithGoogle = useCallback(() => {
    signInWithGoogle();
  }, [signInWithGoogle]);

  return (
    <div>
      <div className="w-full bg-neutral-700 p-4 text-xs flex justify-between items-center">
        <Link href={`/midjourney`} passHref>
          <button className="flex gap-2 items-center" type="button">
            <ArrowLeftIcon className="w-4 h-4 text-white" />
            Go to Tool
          </button>
        </Link>
        <div>
          {user?.uid ? (
            `You are signed in as ${user.displayName} ${user.email}`
          ) : (
            <button onClick={handleSignInWithGoogle}>
              Sign in with Google
            </button>
          )}
        </div>
      </div>
      {user?.uid ? (
        <div className="p-4">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <Form activeTab={activeTab} />
          <ListOfElements activeTab={activeTab} />
        </div>
      ) : (
        <div className="p-8 text-center">
          You must be logged in and an admin to see this page.
        </div>
      )}
    </div>
  );
}
