import * as amplitude from "@amplitude/analytics-browser";
import {
  sessionReplayPlugin,
} from "@amplitude/plugin-session-replay-browser";

export const initAmplitude = () => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  console.log(apiKey);
  amplitude.init(apiKey, {
    defaultTracking: true,
    serverZone: "EU",
  });

  const sessionReplayTracking = sessionReplayPlugin({ sampleRate: 1 });

  amplitude.add(sessionReplayTracking);
};

export const logEvent = (eventName, eventProperties) => {
  amplitude.track(eventName, eventProperties);
};
