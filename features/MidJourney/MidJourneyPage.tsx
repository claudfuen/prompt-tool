import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import analytics from "../../utils/analytics";
import FacebookPixel from "../FacebookPixel";
import Footer from "./Layout/Footer";
import MidJourneyHead from "./Layout/MidJourneyHeader";
import MidJourneyNavbar from "./Layout/Navbar/MidJourneyNavbar";
import ModelSelector from "./Layout/Navbar/ModelSelector";
import AvoidBar from "./v2/AvoidBar";
import ArtistsModal from "./v2/Browser/ArtistsModal";
import CameraModal from "./v2/Browser/CameraModal";
import ColorsModal from "./v2/Browser/ColorsModal";
import LightingModal from "./v2/Browser/LightingModal";
import MaterialsModal from "./v2/Browser/MaterialsModal";
import { SelectedOptionObject } from "./v2/Browser/Modal";
import StylesModal from "./v2/Browser/StylesModal";
import DOFSelector from "./v2/DepthOfFieldSelector";
import ImageReference from "./v2/ImageReference";
import InputBar from "./v2/InputBar";
import OutputPrompt from "./v2/OutputPrompt";
import QualitySelector from "./v2/QualitySelector";
import SizeSelector from "./v2/Size/SizeSelector";
import StylizeSelector from "./v2/StylizeSelector";
import VersionSelector from "./v2/VersionSelector";

export interface DropdownValueProps {
  label: string;
  command: string;
}

export type HistoryElement = {
  prompt: string;
  imageUrl: string | null;
  generatedAt: string;
};

const removeDoubleSpaces = (str: string) => str.replace(/\s+/g, " ").trim();

const formatAttributeString = (term: string) => {
  return `${term}:: `;
};
const formatAttributes = (attributes: (string | undefined)[]) => {
  const cleanAttributes: string[] = attributes.filter(
    (attr): attr is string => attr !== undefined && attr !== ""
  );
  const formattedAttributes = cleanAttributes.map(formatAttributeString);
  return formattedAttributes.join("");
};

const MidJourneyPage = () => {
  // CAMERA
  const [cameraNew, setCameraNew] = useState<SelectedOptionObject[]>([]);
  const cameraNewArrayofStrings = cameraNew.map(
    (camera) => `${camera.command}::${camera.weight}`
  );
  const cameraNewString = cameraNewArrayofStrings.join(" ");

  // LIGHTING
  const [lightingNew, setLightingNew] = useState<SelectedOptionObject[]>([]);
  const lightingNewArrayofStrings = lightingNew.map(
    (lighting) => `${lighting.command}::${lighting.weight}`
  );
  const lightingNewString = lightingNewArrayofStrings.join(" ");

  // STYLES
  const [styleNew, setStyleNew] = useState<SelectedOptionObject[]>([]);
  const styleNewArrayofStrings = styleNew.map(
    (style) => `${style.command}::${style.weight}`
  );
  const styleNewString = styleNewArrayofStrings.join(" ");

  // ARTISTS
  const [artistNew, setArtistNew] = useState<SelectedOptionObject[]>([]);
  const artistNewArrayofStrings = artistNew.map(
    (artist) => `${artist.command}::${artist.weight}`
  );
  const artistNewString = artistNewArrayofStrings.join(" ");

  // COLORS
  const [colorNew, setColorNew] = useState<SelectedOptionObject[]>([]);
  const colorNewArrayofStrings = colorNew.map(
    (color) => `${color.command}::${color.weight}`
  );
  const colorNewString = colorNewArrayofStrings.join(" ");

  // MATERIALS
  const [materialNew, setMaterialNew] = useState<SelectedOptionObject[]>([]);
  const materialNewArrayofStrings = materialNew.map(
    (material) => `${material.command}::${material.weight}`
  );
  const materialNewString = materialNewArrayofStrings.join(" ");

  const [quality, setQuality] = useState<DropdownValueProps | null>(null);
  const [stylize, setStylize] = useState<DropdownValueProps | null>(null);
  const [version, setVersion] = useState<DropdownValueProps | null>(null);
  const [dof, setDof] = useState<DropdownValueProps | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [avoid, setAvoid] = useState("");
  const avoidString = avoid ? `--no ${avoid}` : "";

  const [imageIsExpanded, setImageIsExpanded] = useState(false);
  const [size, setSize] = useState("");

  const [mainIdea, setMainIdea] = useState("");
  const [mainIdeaWeight, setMainIdeaWeight] = useState("1");
  const mainIdeaString = `${mainIdea}::${
    mainIdeaWeight !== "1" ? `${mainIdeaWeight}` : ""
  }`;

  const [history, setHistory] = useState<HistoryElement[]>([]);

  // get history from local storage
  useEffect(() => {
    const historyFromStorage = localStorage.getItem("history");
    if (historyFromStorage) {
      setHistory(JSON.parse(historyFromStorage));
    }

    const mainIdeaFromStorage = localStorage.getItem("mainIdea");
    if (mainIdeaFromStorage) {
      setMainIdea(mainIdeaFromStorage);
    }
  }, []);

  const initialCommand = `/imagine prompt:`;
  const regularArritibuteArray = [imageUrl];
  const regularArritibuteString = formatAttributes(regularArritibuteArray);

  const flagAttributes = `${dof ? dof.command : ""} ${size} ${
    version ? version.command : ""
  } ${quality ? quality.command : ""} ${
    stylize ? stylize?.command : ""
  } ${avoidString}`;

  const prompt = [
    initialCommand,
    mainIdeaString,
    regularArritibuteString,
    styleNewString,
    lightingNewString,
    cameraNewString,
    artistNewString,
    colorNewString,
    materialNewString,
    flagAttributes,
  ].join(" ");
  const cleanPrompt = removeDoubleSpaces(prompt);

  useEffect(() => {
    analytics.track("MidJourney: View");
  }, []);

  const handleToggleExpandImage = useCallback(() => {
    setImageIsExpanded(!imageIsExpanded);
  }, [imageIsExpanded]);

  const trackClickOnDocumentation = useCallback(() => {
    analytics.track("MidJouney: View Documentation");
  }, []);

  return (
    <div>
      <MidJourneyHead title="MidJourney Prompt Tool" />
      <FacebookPixel pixelId="734778551076768" />
      <MidJourneyNavbar />
      <div className="py-8 p-4 sm:px-16 max-w-6xl mx-auto flex flex-col gap-4 midjourney justify-center overflow-y-auto items-center">
        <ModelSelector activeTab="midjourney" />
        <h2 className="mt-4 text-center">MidJourney Prompt Helper</h2>
        <InputBar
          value={mainIdea}
          setValue={setMainIdea}
          mainIdeaWeight={mainIdeaWeight}
          setMainIdeaWeight={setMainIdeaWeight}
          type="midjourney"
        />
        <div className="flex justify-center flex-col items-center">
          <p>
            Not getting the result you want? Want to learn how to get better
            results?
          </p>
          <a
            href="https://docs.noonshot.com/ca78b90f389444d6b62ff1887e28a418"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackClickOnDocumentation}
          >
            Read Our Documentation
          </a>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {/* <CameraSelector value={camera} setValue={setCamera} /> */}
          <StylesModal
            selectedOptions={styleNew}
            setSelectedOptions={setStyleNew}
          />
          <LightingModal
            selectedOptions={lightingNew}
            setSelectedOptions={setLightingNew}
          />
          <CameraModal
            selectedOptions={cameraNew}
            setSelectedOptions={setCameraNew}
          />
          <ArtistsModal
            selectedOptions={artistNew}
            setSelectedOptions={setArtistNew}
          />
          <ColorsModal
            selectedOptions={colorNew}
            setSelectedOptions={setColorNew}
          />
          <MaterialsModal
            selectedOptions={materialNew}
            setSelectedOptions={setMaterialNew}
          />
          <SizeSelector value={size} setValue={setSize} />
          <DOFSelector value={dof} setValue={setDof} />
          <QualitySelector value={quality} setValue={setQuality} />
          <StylizeSelector value={stylize} setValue={setStylize} />
          <VersionSelector value={version} setValue={setVersion} />
        </div>

        <div className="flex gap-4">
          <div className="bg-neutral-500 w-64 rounded flex flex-col">
            <div
              className="flex justify-between items-center cursor-pointer p-4 hover:bg-primary-100 rounded-md"
              onClick={handleToggleExpandImage}
            >
              <UploadIcon className="w-4 h-4" />
              <p>Upload Inspiration Image</p>

              {imageIsExpanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </div>
            {imageIsExpanded && (
              <div className="p-4 flex flex-col gap-2">
                <p className="text-xs">
                  Upload an image to give the AI some visual inspiration
                </p>
                <ImageReference imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            )}
          </div>
        </div>
        <p>If you want to exclude or avoid certain terms, type them below:</p>
        <AvoidBar value={avoid} setValue={setAvoid} />
        <div className="w-full">
          <OutputPrompt
            prompt={cleanPrompt}
            setHistory={setHistory}
            history={history}
            activeTab="midjourney"
          />
        </div>
        <a
          href="https://discord.gg/cVSXqgR7a5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex gap-2 bg-neutral-700 rounded-md p-2 cursor-pointer hover:bg-primary-100">
            <p className="text-white">
              Share your creation on our Discord Community
            </p>
            <Image src="/discord-logo.svg" height={20} width={20} alt="" />
          </div>
        </a>
        <Link href="/midjourney/history" passHref>
          <div className="flex gap-2 items-center cursor-pointer hover:opacity-60">
            View your prompt history{" "}
            {history?.length > 0 ? `(${history?.length})` : ""}
            <ClockIcon className="mt-1 h-4 w-4" />
          </div>
        </Link>
        <div className="text-neutral-400 text-center">
          <p>Refresh the page to clear all properties.</p>
          <p>Bookmark this page by pressing Cmd/Ctrl + D </p>
        </div>
      </div>
      <Footer activeTab="midjourney" />
    </div>
  );
};

export default MidJourneyPage;
