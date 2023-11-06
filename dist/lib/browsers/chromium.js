"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxthonBeta = exports.Maxthon = exports.Iron = exports.Blisk = exports.GoogleChromeDev = exports.GoogleChromeCanary = exports.GoogleChromeBeta = exports.BraveNightly = exports.BraveDev = exports.BraveBeta = exports.MicrosoftEdgeDev = exports.MicrosoftEdgeCanary = exports.MicrosoftEdgeBeta = exports.OperaDeveloper = exports.OperaBeta = exports.Epic = exports.OperaNeon = exports.OperaGX = exports.Yandex = exports.Opera = exports.Vivaldi = exports.GoogleChrome = exports.Brave = exports.MicrosoftEdge = void 0;
const utils_1 = require("@raycast/utils");
const Chromium = (name = "Chromium") => {
    const runJSInActiveTab = async (script) => {
        return await (0, utils_1.runAppleScript)(`tell application "${name}"
      set theTab to active tab of window 1
      tell theTab
        return execute javascript "try {
                  ${script}
                } catch {
                  '';
                }"
      end tell
    end tell`);
    };
    return {
        name,
        version: async () => {
            return await (0, utils_1.runAppleScript)(`tell application "${name}" to return version`);
        },
        bundleID: async () => {
            return await (0, utils_1.runAppleScript)(`tell application "${name}" to return id`);
        },
        bundlePath: async () => {
            return await (0, utils_1.runAppleScript)(`tell application "${name}" to return POSIX path of (path to it)`);
        },
        currentURL: async () => {
            return (0, utils_1.runAppleScript)(`try
        tell application "${name}"
          set tabIndex to active tab index of window 1
          return URL of tab tabIndex of window 1
        end tell
      end try`);
        },
        currentTabText: async () => {
            return await runJSInActiveTab(`document.body.innerText`);
        },
        runJSInActiveTab,
    };
};
const MicrosoftEdge = Chromium("Microsoft Edge");
exports.MicrosoftEdge = MicrosoftEdge;
const Brave = Chromium("Brave Browser");
exports.Brave = Brave;
const GoogleChrome = Chromium("Google Chrome");
exports.GoogleChrome = GoogleChrome;
const Vivaldi = Chromium("Vivaldi");
exports.Vivaldi = Vivaldi;
const Opera = Chromium("Opera");
exports.Opera = Opera;
const Yandex = Chromium("Yandex");
exports.Yandex = Yandex;
const OperaGX = Chromium("Opera GX");
exports.OperaGX = OperaGX;
const OperaNeon = Chromium("Opera Neon");
exports.OperaNeon = OperaNeon;
const Epic = Chromium("Epic");
exports.Epic = Epic;
const OperaBeta = Chromium("Opera Beta");
exports.OperaBeta = OperaBeta;
const OperaDeveloper = Chromium("Opera Developer");
exports.OperaDeveloper = OperaDeveloper;
const MicrosoftEdgeBeta = Chromium("Microsoft Edge Beta");
exports.MicrosoftEdgeBeta = MicrosoftEdgeBeta;
const MicrosoftEdgeCanary = Chromium("Microsoft Edge Canary");
exports.MicrosoftEdgeCanary = MicrosoftEdgeCanary;
const MicrosoftEdgeDev = Chromium("Microsoft Edge Dev");
exports.MicrosoftEdgeDev = MicrosoftEdgeDev;
const BraveBeta = Chromium("Brave Browser Beta");
exports.BraveBeta = BraveBeta;
const BraveDev = Chromium("Brave Browser Dev");
exports.BraveDev = BraveDev;
const BraveNightly = Chromium("Brave Browser Nightly");
exports.BraveNightly = BraveNightly;
const GoogleChromeBeta = Chromium("Google Chrome Beta");
exports.GoogleChromeBeta = GoogleChromeBeta;
const GoogleChromeCanary = Chromium("Google Chrome Canary");
exports.GoogleChromeCanary = GoogleChromeCanary;
const GoogleChromeDev = Chromium("Google Chrome Dev");
exports.GoogleChromeDev = GoogleChromeDev;
const Blisk = Chromium("Blisk");
exports.Blisk = Blisk;
const Iron = Chromium("Iron");
exports.Iron = Iron;
const Maxthon = Chromium("Maxthon");
exports.Maxthon = Maxthon;
const MaxthonBeta = Chromium("Maxthon Beta");
exports.MaxthonBeta = MaxthonBeta;
exports.default = Chromium;
