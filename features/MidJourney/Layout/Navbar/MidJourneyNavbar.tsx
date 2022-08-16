import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function MidJourneyNavbar() {
  return (
    <div className="bg-neutral-700 flex items-center gap-2 justify-between p-2 midjourney-navbar">
      <a
        href="https://www.noonshot.app"
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
      <div className="flex gap-2">
        <a
          href="https://www.noonshot.com/"
          className="hidden md:block bg-neutral-600 p-2 px-6 rounded text-white hover:bg-primary-100 hover:text-white"
        >
          Sell Your Art as NFTs
        </a>
        <SocialIcons />
      </div>
    </div>
  );
}
