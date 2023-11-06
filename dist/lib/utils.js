"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensions = exports.getWeatherData = exports.getMatchingYouTubeVideoID = exports.getYouTubeVideoTranscriptByURL = exports.getYouTubeVideoTranscriptById = exports.getJSONResponse = exports.getTextOfWebpage = exports.getURLHTML = exports.runJSInActiveTab = exports.getActiveBrowser = exports.SupportedBrowsers = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const api_1 = require("@raycast/api");
const fs = __importStar(require("fs"));
const browsers_1 = require("./browsers");
/**
 * The browsers from which the current URL can be obtained.
 */
exports.SupportedBrowsers = [
    browsers_1.Arc,
    browsers_1.Safari,
    browsers_1.SigmaOS,
    browsers_1.iCab,
    browsers_1.Orion,
    browsers_1.OmniWeb,
    (0, browsers_1.Chromium)("Chromium"),
    browsers_1.Blisk,
    browsers_1.Brave,
    browsers_1.BraveBeta,
    browsers_1.BraveDev,
    browsers_1.BraveNightly,
    browsers_1.Epic,
    browsers_1.GoogleChrome,
    browsers_1.GoogleChromeBeta,
    browsers_1.GoogleChromeCanary,
    browsers_1.GoogleChromeDev,
    browsers_1.Iron,
    browsers_1.Maxthon,
    browsers_1.MaxthonBeta,
    browsers_1.MicrosoftEdge,
    browsers_1.MicrosoftEdgeBeta,
    browsers_1.MicrosoftEdgeCanary,
    browsers_1.MicrosoftEdgeDev,
    browsers_1.Opera,
    browsers_1.OperaBeta,
    browsers_1.OperaDeveloper,
    browsers_1.OperaGX,
    browsers_1.OperaNeon,
    browsers_1.Vivaldi,
    browsers_1.Yandex,
];
/**
 * Gets the active browser.
 * @returns A promise resolving to the active browser, or undefined if another kind of application is active.
 */
const getActiveBrowser = async () => {
    const app = (await (0, api_1.getFrontmostApplication)()).name || "";
    return exports.SupportedBrowsers.find((browser) => browser.name === app);
};
exports.getActiveBrowser = getActiveBrowser;
/**
 * Executes the specified JavaScript in the active tab of the target browser.
 * @param script The JavaScript to execute.
 * @param browserName The name of the browser to execute the script in. If not specified, the active browser will be used.
 * @returns A promise resolving to the result of executing the JavaScript.
 */
const runJSInActiveTab = async (script, browserName) => {
    let browser;
    if (browserName) {
        browser = exports.SupportedBrowsers.find((browser) => browser.name === browserName);
    }
    else {
        browser = await (0, exports.getActiveBrowser)();
    }
    if (browser) {
        return await browser.runJSInActiveTab(script);
    }
    return "";
};
exports.runJSInActiveTab = runJSInActiveTab;
/**
 * Gets the raw HTML of a URL.
 *
 * @param URL The URL to get the HTML of.
 * @returns The HTML as a string.
 */
const getURLHTML = async (URL) => {
    const request = await (0, node_fetch_1.default)(URL);
    return await request.text();
};
exports.getURLHTML = getURLHTML;
/**
 * Gets the visible text of a URL.
 *
 * @param URL The URL to get the visible text of.
 * @returns A promise resolving to the visible text as a string.
 */
const getTextOfWebpage = async (URL) => {
    const html = await (0, exports.getURLHTML)(URL);
    const filteredString = html
        .replaceAll(/(<br ?\/?>|[\n\r]+)/g, "\n")
        .replaceAll(/(<script[\s\S\n\r]+?<\/script>|<style[\s\S\n\r]+?<\/style>|<nav[\s\S\n\r]+?<\/nav>|<link[\s\S\n\r]+?<\/link>|<form[\s\S\n\r]+?<\/form>|<button[\s\S\n\r]+?<\/button>|<!--[\s\S\n\r]+?-->|<select[\s\S\n\r]+?<\/select>|<[\s\n\r\S]+?>)/g, "\t")
        .replaceAll(/(\t+)/g, "\n")
        .replaceAll(/([\t ]*[\n\r][\t ]*)+/g, "\r")
        .replaceAll(/(\([^A-Za-z0-9\n]*\)|(?<=[,.!?%*])[,.!?%*]*?\s*[,.!?%*])/g, " ")
        .replaceAll(/{{(.*?)}}/g, "$1");
    return filteredString.trim();
};
exports.getTextOfWebpage = getTextOfWebpage;
/**
 * Gets the JSON objects returned from a URL.
 *
 * @param URL The url to a .json document.
 * @returns The JSON as a {@link JSONObject}.
 */
const getJSONResponse = async (URL) => {
    const raw = await (0, exports.getURLHTML)(URL);
    return JSON.parse(raw);
};
exports.getJSONResponse = getJSONResponse;
/**
 * Gets the English transcript of a YouTube video specified by its ID.
 * @param videoId The ID of the YouTube video.
 * @returns A promise resolving to the transcript as a string, or "No transcript available." if there is no transcript.
 */
const getYouTubeVideoTranscriptById = async (videoId) => {
    const html = await (0, exports.getURLHTML)(`https://www.youtube.com/watch?v=${videoId}`);
    const captionsJSON = JSON.parse(html.split(`"captions":`)?.[1]?.split(`,"videoDetails"`)?.[0]?.replace("\n", ""))["playerCaptionsTracklistRenderer"];
    if (!("captionTracks" in captionsJSON)) {
        return "No transcript available.";
    }
    const title = html.matchAll(/title":"((.| )*?),"lengthSeconds/g).next().value?.[1];
    const captionTracks = captionsJSON["captionTracks"];
    const englishCaptionTrack = captionTracks.find((track) => track["languageCode"] === "en");
    if (!englishCaptionTrack) {
        return "No transcript available.";
    }
    const transcriptText = await (0, exports.getTextOfWebpage)(englishCaptionTrack["baseUrl"]);
    return `Video Title: ${title}\n\nTranscript:\n${transcriptText}`;
};
exports.getYouTubeVideoTranscriptById = getYouTubeVideoTranscriptById;
/**
 * Gets the English transcript of a YouTube video specified by its URL.
 * @param videoURL The URL of the YouTube video.
 * @returns A promise resolving to the transcript as a string, or "No transcript available." if there is no transcript.
 */
const getYouTubeVideoTranscriptByURL = async (videoURL) => {
    const videoId = videoURL.split("v=")[1]?.split("&")[0];
    return (0, exports.getYouTubeVideoTranscriptById)(videoId);
};
exports.getYouTubeVideoTranscriptByURL = getYouTubeVideoTranscriptByURL;
/**
 * Gets the ID of the first YouTube video matching the search text.
 * @param searchText The text to search for.
 * @returns The ID of the first matching video.
 */
const getMatchingYouTubeVideoID = async (searchText) => {
    const html = await (0, exports.getURLHTML)(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchText)}`);
    const videoID = html.matchAll(/videoId\\x22:\\x22(.*?)\\x22,/g).next().value?.[1];
    return videoID;
};
exports.getMatchingYouTubeVideoID = getMatchingYouTubeVideoID;
/**
 * Gets the weather forecast from open-meteo.com.
 *
 * @param days The number of days to get the forecast for (either 1 or 7)
 * @returns The forecast as a JSON object.
 */
const getWeatherData = async (days) => {
    const jsonObj = await (0, exports.getJSONResponse)("https://get.geojs.io/v1/ip/geo.json");
    const latitude = jsonObj["latitude"];
    const longitude = jsonObj["longitude"];
    const timezone = jsonObj["timezone"].replace("/", "%2F");
    return (0, exports.getJSONResponse)(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,snowfall_sum,precipitation_hours&current_weather=true&windspeed_unit=ms&forecast_days=${days.toString()}&timezone=${timezone}`);
};
exports.getWeatherData = getWeatherData;
/**
 * Gets the list of extensions installed in Raycast.
 * @returns The list of extensions as an array of {@link Extension} objects.
 */
const getExtensions = async () => {
    return new Promise((resolve, reject) => {
        const extensionsDir = api_1.environment.assetsPath.split("/").slice(0, -2).join("/");
        fs.readdir(extensionsDir, (err, files) => {
            const extensions = [];
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
                    const extension = {
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
                        packageJSON.commands.forEach((entry) => {
                            const command = {
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
                        });
                    }
                    extensions.push(extension);
                }
            });
            resolve(extensions);
        });
    });
};
exports.getExtensions = getExtensions;
