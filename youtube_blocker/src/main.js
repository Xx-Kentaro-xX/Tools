// main.js
import { startTracking } from "./time_script.js";
import { TRACKED_URLS } from "./config.js";

window.addEventListener("load", () => {
  console.log("load1");
  const currentURL = location.href;

  const matched = TRACKED_URLS.some((targetURL) =>
    currentURL.startsWith(targetURL)
  );

  if (matched) {
    startTracking();
  } else {
    console.log("このページは時間制限対象ではありません");
  }
});
