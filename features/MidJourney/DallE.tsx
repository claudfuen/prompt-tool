import { useEffect, useState } from "react";
import analytics from "../../utils/analytics";
import FacebookPixel from "../FacebookPixel";
import Footer from "./Layout/Footer";
import MidJourneyHead from "./Layout/MidJourneyHeader";
import MidJourneyNavbar from "./Layout/Navbar/MidJourneyNavbar";
import ModelSelector from "./Layout/Navbar/ModelSelector";
import ArtistSelector from "./v2/ArtistsSelector";
import CameraSelector from "./v2/CameraSelector";
import ColorSelector from "./v2/ColorSelector";
import InputBar from "./v2/InputBar";
import LightingSelector from "./v2/LightingSelector";
import OutputPrompt from "./v2/OutputPrompt";
import StyleSelector from "./v2/StyleSelector";

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

const DallEPromptTool = () => {
  const [lighting, setLighting] = useState<DropdownValueProps | null>(null);
  const [camera, setCamera] = useState<DropdownValueProps | null>(null);
  const [color, setColor] = useState<DropdownValueProps | null>(null);
  const [artist, setArtist] = useState<DropdownValueProps | null>(null);
  const [style, setStyle] = useState<DropdownValueProps | null>(null);

  const [mainIdea, setMainIdea] = useState("");

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

  const initialCommand = ``;
  const regularAttributes = `${mainIdea} ${color ? color.command : ""} ${
    style ? style.command : ""
  } ${artist ? artist.command : ""} ${lighting ? lighting.command : ""} ${
    camera ? camera.command : ""
  }`;
  const prompt = `${initialCommand} ${regularAttributes}`;
  const cleanPrompt = removeDoubleSpaces(prompt);

  useEffect(() => {
    analytics.track("DallE: View");
  }, []);

  return (
    <div>
      <MidJourneyHead title="MidJourney Prompt Tool" />
      <FacebookPixel pixelId="471445900986926" />
      <MidJourneyNavbar />
      <div className="py-8 p-4 sm:px-16 max-w-6xl mx-auto flex flex-col gap-4 midjourney justify-center overflow-y-auto items-center">
        <ModelSelector activeTab="dalle" />
        <h2 className="mt-4 text-center">Dall-E Prompt Helper</h2>
        <InputBar value={mainIdea} setValue={setMainIdea} type="dalle" />
        <div className="flex gap-2 flex-wrap justify-center">
          <CameraSelector value={camera} setValue={setCamera} />
          <LightingSelector value={lighting} setValue={setLighting} />
          <StyleSelector value={style} setValue={setStyle} />
          <ArtistSelector value={artist} setValue={setArtist} />
          <ColorSelector value={color} setValue={setColor} />
          {/* <Modal /> */}
        </div>

        <div className="w-full">
          <OutputPrompt
            prompt={cleanPrompt}
            setHistory={setHistory}
            history={history}
            activeTab={"dalle"}
          />
        </div>
        <div className="text-neutral-400 text-center">
          <p>Refresh the page to clear all properties.</p>
          <p>Bookmark this page by pressing Cmd/Ctrl + D </p>
        </div>
      </div>
    </div>
  );
};

export default DallEPromptTool;
