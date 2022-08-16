import googleAnalytics from "@analytics/google-analytics";
import mixpanelPlugin from "@analytics/mixpanel";
import Analytics from "analytics";

let analytics = Analytics({});

// Only attempt to initialize analytics if we're on the client
if (typeof window !== "undefined") {
  analytics = Analytics({
    app: "noonshot-app",
    plugins: [
      mixpanelPlugin({
        token: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN,
      }),
      googleAnalytics({
        measurementIds: [
          process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
          process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
        ],
      }),
    ],
  });
}

export default analytics;
