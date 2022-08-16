import Image from "next/image";
import { useCallback } from "react";
import analytics from "../../../../utils/analytics";

export default function SocialIcons() {
  const handleRedditClick = useCallback(() => {
    analytics.track("MidJourney: Share: Reddit");
  }, []);
  const handleFacebookClick = useCallback(() => {
    analytics.track("MidJourney: Share: Facebook");
  }, []);
  const handleTwitterClick = useCallback(() => {
    analytics.track("MidJourney: Share: Twitter");
  }, []);

  return (
    <div className="flex gap-2 text-white">
      <a
        href="https://www.reddit.com/submit?title=Check%20out%20this%20helpful%20tool%20to%20easily%20generate%20complex%20MidJourney%20prompts&amp;url=https%3A%2F%2Fapp.noonshot.com%2Fmidjourney"
        target={"_blank"}
        rel={"noopener noreferrer"}
        onClick={handleRedditClick}
        className="p-2 bg-orange-500 rounded-full text-white flex gap-2 items-center hover:text-white hover:bg-opacity-70"
      >
        <Image src={"/reddit.svg"} alt={"reddit"} height={20} width={20} />
        Share
      </a>
      <a
        href="https://www.facebook.com/sharer.php?t=Check%20out%20this%20helpful%20tool%20to%20easily%20generate%20complex%20MidJourney%20prompts&amp;u=https%3A%2F%2Fapp.noonshot.com%2Fmidjourney"
        target={"_blank"}
        rel={"noopener noreferrer"}
        onClick={handleFacebookClick}
        className="p-2 bg-blue-600 rounded-full text-white flex gap-2 items-center hover:text-white hover:bg-opacity-70"
      >
        <Image src={"/facebook.svg"} alt={"facebook"} height={20} width={20} />
        Share
      </a>
      <a
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%20helpful%20tool%20to%20easily%20generate%20complex%20MidJourney%20prompts&amp;url=https%3A%2F%2Fapp.noonshot.com%2Fmidjourney"
        target={"_blank"}
        rel={"noopener noreferrer"}
        onClick={handleTwitterClick}
        className="p-2 bg-blue-400 rounded-full text-white flex gap-2 items-center  hover:text-white hover:bg-opacity-70"
      >
        <Image src={"/twitter.svg"} alt={"twitter"} height={20} width={20} />
        Tweet
      </a>
    </div>
  );
}
