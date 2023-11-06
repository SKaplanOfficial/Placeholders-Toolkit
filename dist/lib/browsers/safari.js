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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@raycast/utils");
const os = __importStar(require("os"));
const name = "Safari";
const version = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Safari" to return version`);
};
const bundleID = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Safari" to return id`);
};
const bundlePath = async () => {
    return await (0, utils_1.runAppleScript)(`tell application "Safari" to return POSIX path of (path to it)`);
};
const currentURL = async () => {
    return await (0, utils_1.runAppleScript)(`try
    tell application "Safari"
        return URL of document 1
    end tell
  end try`);
};
const currentTabText = async () => {
    return await (0, utils_1.runAppleScript)(`try
    tell application "Safari" to return text of current tab of window 1
  end try`);
};
const runJSInActiveTab = async (script) => {
    return await (0, utils_1.runAppleScript)(`tell application "Safari"
    set theTab to current tab of window 1
    tell theTab
      return do JavaScript "try {
        ${script}
      } catch {
        '';
      }"
    end tell
  end tell`);
};
const topSites = async () => {
    return (await (0, utils_1.runAppleScript)(`use framework "Foundation"
  property ca : current application
  
  on plist for thePath
    set plistData to ca's NSData's dataWithContentsOfFile:thePath
    set plist to ca's NSPropertyListSerialization's propertyListWithData:plistData options:(ca's NSPropertyListImmutable) format:(missing value) |error|:(missing value)
  end plist
  
  set topSitesPlist to plist for "${os.homedir()}/Library/Safari/TopSites.plist"
  
  set siteSummaries to {}
  set sites to TopSites of topSitesPlist as list
  repeat with site in sites
    set siteTitle to TopSiteTitle of site
    set siteURL to TopSiteURLString of site
    copy siteTitle & ": " & siteURL to end of siteSummaries
  end repeat
  return siteSummaries`)).split(", ");
};
const bookmarks = async (count = 100) => {
    return (await (0, utils_1.runAppleScript)(`use framework "Foundation"

  on plist for thePath
    set plistData to current application's NSData's dataWithContentsOfFile:thePath
    set plist to current application's NSPropertyListSerialization's propertyListWithData:plistData options:(current application's NSPropertyListImmutable) format:(missing value) |error|:(missing value)
  end plist
  
  set bookmarksPlist to (plist for "/Users/steven/Library/Safari/Bookmarks.plist") as record
  
  on getChildBookmarks(node)
    set internalBookmarks to {}
    if WebBookmarkType of node is "WebBookmarkTypeLeaf" then
      set maxLength to 50
      set theURL to URLString of node as text
      if length of theURL < maxLength then
        set maxLength to length of theURL
      end if
      copy text 1 thru maxLength of theURL to end of internalBookmarks
    else if WebBookmarkType of node is "WebBookmarkTypeProxy" then
      -- Ignore
    else
      try
        repeat with theChild in Children of node
          set internalBookmarks to internalBookmarks & my getChildBookmarks(theChild)
        end repeat
      on error err
        log err
      end try
    end if
    return internalBookmarks
  end getChildBookmarks
  
  set bookmarks to {}
  repeat with theChild in Children of bookmarksPlist
    if WebBookmarkType of theChild is "WebBookmarkTypeLeaf" then
      set maxLength to 50
      set theURL to URLString of theChild as text
      if length of theURL < maxLength then
        set maxLength to length of theURL
      end if
      copy text 1 thru maxLength of theURL to end of bookmarks
    else
      set bookmarks to bookmarks & getChildBookmarks(theChild)
    end if
  end repeat
  
  set maxBookmarks to ${count}
  if (count of bookmarks) < maxBookmarks then
    set maxBookmarks to count of bookmarks
  end if

  set finalBookmarks to {}
  repeat maxBookmarks times
    copy some item of bookmarks to end of finalBookmarks
  end repeat
  return finalBookmarks`)).split(", ");
};
const Safari = {
    name,
    version,
    bundleID,
    bundlePath,
    currentURL,
    currentTabText,
    runJSInActiveTab,
    topSites,
    bookmarks,
};
exports.default = Safari;
