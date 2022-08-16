import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://www.noonshot.com");
  }, []);

  return null;
}
