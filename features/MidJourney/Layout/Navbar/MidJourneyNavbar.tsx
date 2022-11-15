import { ArrowRightIcon } from "@heroicons/react/outline";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function MidJourneyNavbar() {
  return (
    <>
      <div className="p-4 bg-primary-100 flex gap-2 justify-center items-center">
        <p className="font-bold ">
          Want to try more models, explore styles, and generate images in one
          place?
        </p>
        <a
          href="https://diffusion.land?model=midjourney"
          className="text-white hover:text-white"
        >
          <button className="flex gap-2 items-center justify-center rounded-md bg-primary-200 hover:bg-primary-300 p-2">
            <p className="font-bold ">Try Our New Prompt Tool ✨</p>
            {/* <ArrowRightIcon className="h-4 w-4" /> */}
          </button>
        </a>
      </div>
      <div className="bg-neutral-700 flex items-center gap-2 justify-between p-2 midjourney-navbar">
        <a
          href="https://diffusion.land"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          <div className="hover:opacity-75 cursor-pointer transform active:scale-95 transition-all">
            <Image
              src="/noonshot_logo.svg"
              alt="noonshot"
              height={40}
              width={120}
            />
          </div>
        </a>
      </div>
    </>
  );
}
