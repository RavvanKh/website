import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

let replayPlugin = null;

export const initAmplitude = () => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  amplitude.init(apiKey, {
    defaultTracking: true,
    serverZone: "US",     
    fetchRemoteConfig: true,
    autocapture: true,
    deviceId: window?.crypto?.randomUUID?.(),
  });

  replayPlugin = sessionReplayPlugin({ sampleRate: 1 });
  amplitude.add(replayPlugin);
};

export const logEvent = (eventName, eventProperties = {}) => {
  const replayId = replayPlugin?.getSessionReplayId?.();
  amplitude.track(eventName, {
    ...eventProperties,
    replay_id: replayId, 
  });
};
