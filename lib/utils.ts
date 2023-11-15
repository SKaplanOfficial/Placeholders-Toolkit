import { Extension, ExtensionCommand, JSONObject } from "./types";
import { environment, getFrontmostApplication } from "@raycast/api";
import * as fs from "fs";
import {
  Arc,
  Blisk,
  Brave,
  BraveBeta,
  BraveDev,
  BraveNightly,
  Browser,
  Chromium,
  Epic,
  GoogleChrome,
  GoogleChromeBeta,
  GoogleChromeCanary,
  GoogleChromeDev,
  Iron,
  Maxthon,
  MaxthonBeta,
  MicrosoftEdge,
  MicrosoftEdgeBeta,
  MicrosoftEdgeCanary,
  MicrosoftEdgeDev,
  OmniWeb,
  Opera,
  OperaBeta,
  OperaDeveloper,
  OperaGX,
  OperaNeon,
  Orion,
  Safari,
  SigmaOS,
  Vivaldi,
  Yandex,
  iCab,
} from "./browsers";
import { runAppleScript } from "@raycast/utils";

/**
 * The browsers from which the current URL can be obtained.
 */
export const SupportedBrowsers = [
  Arc,
  Safari,
  SigmaOS,
  iCab,
  Orion,
  OmniWeb,
  Chromium("Chromium"),
  Blisk,
  Brave,
  BraveBeta,
  BraveDev,
  BraveNightly,
  Epic,
  GoogleChrome,
  GoogleChromeBeta,
  GoogleChromeCanary,
  GoogleChromeDev,
  Iron,
  Maxthon,
  MaxthonBeta,
  MicrosoftEdge,
  MicrosoftEdgeBeta,
  MicrosoftEdgeCanary,
  MicrosoftEdgeDev,
  Opera,
  OperaBeta,
  OperaDeveloper,
  OperaGX,
  OperaNeon,
  Vivaldi,
  Yandex,
];

/**
 * Gets the active browser.
 * @returns A promise resolving to the active browser, or undefined if another kind of application is active.
 */
export const getActiveBrowser = async (): Promise<Browser | undefined> => {
  const app = (await getFrontmostApplication()).name || "";
  return SupportedBrowsers.find((browser) => browser.name === app);
};

/**
 * Executes the specified JavaScript in the active tab of the target browser.
 * @param script The JavaScript to execute.
 * @param browserName The name of the browser to execute the script in. If not specified, the active browser will be used.
 * @returns A promise resolving to the result of executing the JavaScript.
 */
export const runJSInActiveTab = async (
  script: string,
  browserName?: string
) => {
  let browser: Browser | undefined;
  if (browserName) {
    browser = SupportedBrowsers.find((browser) => browser.name === browserName);
  } else {
    browser = await getActiveBrowser();
  }

  if (browser) {
    return await browser.runJSInActiveTab(script);
  }
  return "";
};

/**
 * Gets the raw HTML of a URL.
 *
 * @param URL The URL to get the HTML of.
 * @returns The HTML as a string.
 */
export const getURLHTML = async (URL: string): Promise<string> => {
  const request = await fetch(URL);
  return await request.text();
};

/**
 * Gets the visible text of a URL.
 *
 * @param URL The URL to get the visible text of.
 * @returns A promise resolving to the visible text as a string.
 */
export const getTextOfWebpage = async (URL: string): Promise<string> => {
  const html = await getURLHTML(URL);
  const filteredString = html
    .replaceAll(/(<br ?\/?>|[\n\r]+)/g, "\n")
    .replaceAll(
      /(<script[\s\S\n\r]+?<\/script>|<style[\s\S\n\r]+?<\/style>|<nav[\s\S\n\r]+?<\/nav>|<link[\s\S\n\r]+?<\/link>|<form[\s\S\n\r]+?<\/form>|<button[\s\S\n\r]+?<\/button>|<!--[\s\S\n\r]+?-->|<select[\s\S\n\r]+?<\/select>|<[\s\n\r\S]+?>)/g,
      "\t"
    )
    .replaceAll(/(\t+)/g, "\n")
    .replaceAll(/([\t ]*[\n\r][\t ]*)+/g, "\r")
    .replaceAll(
      /(\([^A-Za-z0-9\n]*\)|(?<=[,.!?%*])[,.!?%*]*?\s*[,.!?%*])/g,
      " "
    )
    .replaceAll(/{{(.*?)}}/g, "$1");
  return filteredString.trim();
};

/**
 * Gets the JSON objects returned from a URL.
 *
 * @param URL The url to a .json document.
 * @returns The JSON as a {@link JSONObject}.
 */
export const getJSONResponse = async (URL: string): Promise<JSONObject> => {
  const raw = await getURLHTML(URL);
  return JSON.parse(raw);
};

/**
 * Gets the English transcript of a YouTube video specified by its ID.
 * @param videoId The ID of the YouTube video.
 * @returns A promise resolving to the transcript as a string, or "No transcript available." if there is no transcript.
 */
export const getYouTubeVideoTranscriptById = async (
  videoId: string
): Promise<string> => {
  const html = await getURLHTML(`https://www.youtube.com/watch?v=${videoId}`);
  const captionsJSON = JSON.parse(
    html
      .split(`"captions":`)?.[1]
      ?.split(`,"videoDetails"`)?.[0]
      ?.replace("\n", "")
  )["playerCaptionsTracklistRenderer"];

  if (!("captionTracks" in captionsJSON)) {
    return "No transcript available.";
  }

  const title = html.matchAll(/title":"((.| )*?),"lengthSeconds/g).next()
    .value?.[1];
  const captionTracks = captionsJSON["captionTracks"];
  const englishCaptionTrack = captionTracks.find(
    (track: JSONObject) => track["languageCode"] === "en"
  );
  if (!englishCaptionTrack) {
    return "No transcript available.";
  }

  const transcriptText = await getTextOfWebpage(englishCaptionTrack["baseUrl"]);
  return `Video Title: ${title}\n\nTranscript:\n${transcriptText}`;
};

/**
 * Gets the English transcript of a YouTube video specified by its URL.
 * @param videoURL The URL of the YouTube video.
 * @returns A promise resolving to the transcript as a string, or "No transcript available." if there is no transcript.
 */
export const getYouTubeVideoTranscriptByURL = async (
  videoURL: string
): Promise<string> => {
  const videoId = videoURL.split("v=")[1]?.split("&")[0];
  return getYouTubeVideoTranscriptById(videoId);
};

/**
 * Gets the ID of the first YouTube video matching the search text.
 * @param searchText The text to search for.
 * @returns The ID of the first matching video.
 */
export const getMatchingYouTubeVideoID = async (
  searchText: string
): Promise<string> => {
  const html = await getURLHTML(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      searchText
    )}`
  );
  const videoID = html.matchAll(/videoId\\x22:\\x22(.*?)\\x22,/g).next()
    .value?.[1];
  return videoID;
};

/**
 * Gets the weather forecast from open-meteo.com.
 *
 * @param days The number of days to get the forecast for (either 1 or 7)
 * @returns The forecast as a JSON object.
 */
export const getWeatherData = async (days: number): Promise<JSONObject> => {
  const jsonObj = await getJSONResponse("https://get.geojs.io/v1/ip/geo.json");
  const latitude = jsonObj["latitude"];
  const longitude = jsonObj["longitude"];
  const timezone = (jsonObj["timezone"] as string).replace("/", "%2F");
  return getJSONResponse(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,snowfall_sum,precipitation_hours&current_weather=true&windspeed_unit=ms&forecast_days=${days.toString()}&timezone=${timezone}`
  );
};

/**
 * Gets the list of extensions installed in Raycast.
 * @returns The list of extensions as an array of {@link Extension} objects.
 */
export const getExtensions = async (): Promise<Extension[]> => {
  return new Promise((resolve, reject) => {
    const extensionsDir = environment.assetsPath
      .split("/")
      .slice(0, -2)
      .join("/");
    fs.readdir(extensionsDir, (err, files) => {
      const extensions: Extension[] = [];
      if (err) {
        console.error(err);
        reject(err);
      }

      files
        .filter((file) => !file.startsWith("."))
        .forEach((file) => {
          const extensionPath = `${extensionsDir}/${file}`;
          const packagePath = `${extensionPath}/package.json`;
          if (fs.existsSync(packagePath)) {
            const extension: Extension = {
              title: "",
              name: "",
              path: extensionPath,
              author: "",
              description: "",
              commands: [],
            };

            const content = fs.readFileSync(packagePath).toString();
            const packageJSON = JSON.parse(content);

            if (packageJSON.title) {
              extension.title = packageJSON.title;
            }

            if (packageJSON.author) {
              extension.author = packageJSON.author;
            }

            if (packageJSON.description) {
              extension.description = packageJSON.description;
            }

            if (packageJSON.author) {
              extension.author = packageJSON.author;
            }

            if (packageJSON.commands) {
              packageJSON.commands.forEach(
                (entry: { [key: string]: string }) => {
                  const command: ExtensionCommand = {
                    title: "",
                    name: "",
                    description: "",
                    deeplink: "",
                  };

                  if (entry.title) {
                    command.title = entry.title;
                  }

                  if (entry.name) {
                    command.name = entry.name;
                  }

                  if (entry.description) {
                    command.description = entry.description;
                  }

                  if (packageJSON.name && packageJSON.author && entry.name) {
                    command.deeplink = `raycast://extensions/${packageJSON.author}/${packageJSON.name}/${entry.name}`;
                  }

                  extension.commands.push(command);
                }
              );
            }

            extensions.push(extension);
          }
        });
      resolve(extensions);
    });
  });
};
