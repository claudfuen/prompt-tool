import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Fuego, FuegoProvider } from "swr-firestore-v9";
import "../styles/globals.css";
import "../styles/midjourney.css";
import analytics from "../utils/analytics";
// https://github.com/lemasc/swr-firestore#readme

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const fuego = new Fuego(firebaseConfig);
analytics.page();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FuegoProvider fuego={fuego}>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </FuegoProvider>
  );
}

export default MyApp;
