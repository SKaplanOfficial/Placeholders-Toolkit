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
exports.JavaScriptPlaceholder = exports.DefaultPlaceholders = void 0;
const vm = __importStar(require("vm"));
const timezone_1 = __importDefault(require("./info-placeholders/timezone"));
const location_1 = __importDefault(require("./info-placeholders/location"));
const todayWeather_1 = __importDefault(require("./info-placeholders/todayWeather"));
const weekWeather_1 = __importDefault(require("./info-placeholders/weekWeather"));
const persistent_variables_1 = require("./directives/persistent-variables");
const clipboardText_1 = __importDefault(require("./info-placeholders/clipboardText"));
const javascript_1 = __importDefault(require("./script-placeholders/javascript"));
exports.JavaScriptPlaceholder = javascript_1.default;
const ignore_1 = __importDefault(require("./directives/ignore"));
const cutoff_1 = __importDefault(require("./directives/cutoff"));
const applescript_1 = __importDefault(require("./script-placeholders/applescript"));
const jxa_1 = __importDefault(require("./script-placeholders/jxa"));
const shell_1 = __importDefault(require("./script-placeholders/shell"));
const textfiles_1 = __importStar(require("./directives/flow-control/textfiles"));
const images_1 = __importStar(require("./directives/flow-control/images"));
const videos_1 = __importStar(require("./directives/flow-control/videos"));
const audio_1 = __importStar(require("./directives/flow-control/audio"));
const pdf_1 = __importDefault(require("./directives/flow-control/pdf"));
const url_1 = __importDefault(require("./directives/url"));
const file_1 = __importDefault(require("./directives/file"));
const focusedElement_1 = __importDefault(require("./directives/focusedElement"));
const elementText_1 = __importDefault(require("./directives/elementText"));
const elementHTML_1 = __importDefault(require("./directives/elementHTML"));
const nearbyLocations_1 = __importDefault(require("./directives/nearbyLocations"));
const selectFile_1 = __importDefault(require("./directives/selectFile"));
const shortcut_1 = __importDefault(require("./directives/shortcut"));
const command_1 = __importDefault(require("./directives/command"));
const youtubeTranscript_1 = __importDefault(require("./directives/youtubeTranscript"));
const copy_1 = __importDefault(require("./directives/copy"));
const paste_1 = __importDefault(require("./directives/paste"));
const type_1 = __importDefault(require("./directives/type"));
const toast_1 = __importDefault(require("./directives/alerts/toast"));
const say_1 = __importDefault(require("./directives/alerts/say"));
const dialog_1 = __importDefault(require("./directives/alerts/dialog"));
const alert_1 = __importDefault(require("./directives/alerts/alert"));
const yearReminders_1 = __importDefault(require("./info-placeholders/calendar/yearReminders"));
const monthReminders_1 = __importDefault(require("./info-placeholders/calendar/monthReminders"));
const weekReminders_1 = __importDefault(require("./info-placeholders/calendar/weekReminders"));
const todayReminders_1 = __importDefault(require("./info-placeholders/calendar/todayReminders"));
const yearEvents_1 = __importDefault(require("./info-placeholders/calendar/yearEvents"));
const monthEvents_1 = __importDefault(require("./info-placeholders/calendar/monthEvents"));
const weekEvents_1 = __importDefault(require("./info-placeholders/calendar/weekEvents"));
const todayEvents_1 = __importDefault(require("./info-placeholders/calendar/todayEvents"));
const usedUUIDs_1 = __importDefault(require("./info-placeholders/usedUUIDs"));
const uuid_1 = __importDefault(require("./info-placeholders/uuid"));
const runningApplications_1 = __importDefault(require("./info-placeholders/runningApplications"));
const safariBookmarks_1 = __importDefault(require("./info-placeholders/safariBookmarks"));
const safariTopSites_1 = __importDefault(require("./info-placeholders/safariTopSites"));
const installedApps_1 = __importDefault(require("./info-placeholders/installedApps"));
const lastEmail_1 = __importDefault(require("./info-placeholders/lastEmail"));
const lastNote_1 = __importDefault(require("./info-placeholders/lastNote"));
const currentTrack_1 = __importDefault(require("./info-placeholders/currentTrack"));
const musicTracks_1 = __importDefault(require("./info-placeholders/musicTracks"));
const systemLanguage_1 = __importDefault(require("./info-placeholders/systemLanguage"));
const time_1 = __importDefault(require("./info-placeholders/time"));
const day_1 = __importDefault(require("./info-placeholders/day"));
const date_1 = __importDefault(require("./info-placeholders/date"));
const shortcuts_1 = __importDefault(require("./info-placeholders/shortcuts"));
const computerName_1 = __importDefault(require("./info-placeholders/computerName"));
const hostname_1 = __importDefault(require("./info-placeholders/hostname"));
const homedir_1 = __importDefault(require("./info-placeholders/homedir"));
const user_1 = __importDefault(require("./info-placeholders/user"));
const currentTabText_1 = __importDefault(require("./info-placeholders/currentTabText"));
const currentURL_1 = __importDefault(require("./info-placeholders/currentURL"));
const currentDirectory_1 = __importDefault(require("./info-placeholders/currentDirectory"));
const currentAppPath_1 = __importDefault(require("./info-placeholders/currentAppPath"));
const currentAppBundleID_1 = __importDefault(require("./info-placeholders/currentAppBundleID"));
const currentAppName_1 = __importDefault(require("./info-placeholders/currentAppName"));
const metadata_1 = __importDefault(require("./info-placeholders/metadata"));
const fileNames_1 = __importDefault(require("./info-placeholders/fileNames"));
const selectedFiles_1 = __importDefault(require("./info-placeholders/selectedFiles"));
const selectedText_1 = __importDefault(require("./info-placeholders/selectedText"));
const utils_1 = require("./utils");
/**
 * The default placeholders.
 */
javascript_1.default.apply = async (str) => {
    try {
        const script = str.match(/(?<=(js|JS))( target="(.*?)")?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[4];
        const target = str.match(/(?<=(js|JS))( target="(.*?)")?:(([^{]|{(?!{)|{{[\s\S]*?}})*?)}}/)?.[3];
        if (!script)
            return { result: "", js: "" };
        if (target) {
            // Run in active browser tab
            const res = await (0, utils_1.runJSInActiveTab)(script.replaceAll(/(\n|\r|\t|\\|")/g, "\\$1"), target);
            return { result: res, js: res };
        }
        // Run in sandbox
        const sandbox = Object.values(DefaultPlaceholders).reduce((acc, placeholder) => {
            acc[placeholder.name] = placeholder.fn;
            return acc;
        }, {});
        sandbox["log"] = async (str) => {
            console.log(str); // Make logging available to JS scripts
            return "";
        };
        const res = await vm.runInNewContext(script, sandbox, {
            timeout: 1000,
            displayErrors: true,
        });
        return { result: res, js: res };
    }
    catch (e) {
        return { result: "", js: "" };
    }
};
/**
 * Maps a list of placeholders to an object with the placeholder's full name as the key and the placeholder as the value.
 * @param placeholders The list of placeholders to map.
 * @returns The placeholder list as an object.
 */
const placeholdersObjectFromList = (placeholders) => {
    return Object.fromEntries(placeholders.map((placeholder) => {
        const nameParts = placeholder.name.split(":");
        let name = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
        for (let i = 1; i < nameParts.length; i++) {
            name += nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
        }
        const fullName = `${name}Placeholder`;
        return [fullName, placeholder];
    }));
};
const defaultPlaceholders = {
    GetPersistentVariablePlaceholder: persistent_variables_1.GetPersistentVariablePlaceholder,
    ResetPersistentVariablePlaceholder: persistent_variables_1.ResetPersistentVariablePlaceholder,
    DeletePersistentVariablePlaceholder: persistent_variables_1.DeletePersistentVariablePlaceholder,
    VarsPlaceholder: persistent_variables_1.VarsPlaceholder,
    IncrementPersistentVariablePlaceholder: persistent_variables_1.IncrementPersistentVariablePlaceholder,
    DecrementPersistentVariablePlaceholder: persistent_variables_1.DecrementPersistentVariablePlaceholder,
    ClipboardTextPlaceholder: clipboardText_1.default,
    SelectedTextPlaceholder: selectedText_1.default,
    SelectedFilesPlaceholder: selectedFiles_1.default,
    FileNamesPlaceholder: fileNames_1.default,
    FileMetadataPlaceholder: metadata_1.default,
    CurrentAppNamePlaceholder: currentAppName_1.default,
    CurrentAppBundleIDPlaceholder: currentAppBundleID_1.default,
    CurrentAppPathPlaceholder: currentAppPath_1.default,
    CurrentDirectoryPlaceholder: currentDirectory_1.default,
    CurrentURLPlaceholder: currentURL_1.default,
    CurrentTabTextPlaceholder: currentTabText_1.default,
    UserPlaceholder: user_1.default,
    HomeDirPlaceholder: homedir_1.default,
    HostnamePlaceholder: hostname_1.default,
    ComputerNamePlaceholder: computerName_1.default,
    ShortcutsPlaceholder: shortcuts_1.default,
    DatePlaceholder: date_1.default,
    DayPlaceholder: day_1.default,
    TimePlaceholder: time_1.default,
    TimezonePlaceholder: timezone_1.default,
    TodayEventsPlaceholder: todayEvents_1.default,
    WeekEventsPlaceholder: weekEvents_1.default,
    MonthEventsPlaceholder: monthEvents_1.default,
    YearEventsPlaceholder: yearEvents_1.default,
    TodayRemindersPlaceholder: todayReminders_1.default,
    WeekRemindersPlaceholder: weekReminders_1.default,
    MonthRemindersPlaceholder: monthReminders_1.default,
    YearRemindersPlaceholder: yearReminders_1.default,
    TodayWeatherPlaceholder: todayWeather_1.default,
    WeekWeatherPlaceholder: weekWeather_1.default,
    SystemLanguagePlaceholder: systemLanguage_1.default,
    MusicTracksPlaceholder: musicTracks_1.default,
    CurrentTrackPlaceholder: currentTrack_1.default,
    LastNotePlaceholder: lastNote_1.default,
    LastEmailPlaceholder: lastEmail_1.default,
    SafariTopSitesPlaceholder: safariTopSites_1.default,
    SafariBookmarksPlaceholder: safariBookmarks_1.default,
    InstalledApplicationsPlaceholder: installedApps_1.default,
    RunningApplicationsPlaceholder: runningApplications_1.default,
    UUIDPlaceholder: uuid_1.default,
    UsedUUIDsPlaceholder: usedUUIDs_1.default,
    LocationPlaceholder: location_1.default,
    SetPersistentVariablePlaceholder: persistent_variables_1.SetPersistentVariablePlaceholder,
    ...placeholdersObjectFromList(textfiles_1.TextFileDirectives),
    TextFileFlowDirective: textfiles_1.default,
    ...placeholdersObjectFromList(images_1.ImageDirectives),
    ImageFlowDirective: images_1.default,
    ...placeholdersObjectFromList(videos_1.VideoDirectives),
    VideoFlowDirective: videos_1.default,
    ...placeholdersObjectFromList(audio_1.AudioDirectives),
    AudioFlowDirective: audio_1.default,
    PDFFlowDirective: pdf_1.default,
    NearbyLocationsPlaceholder: nearbyLocations_1.default,
    FilePlaceholder: file_1.default,
    SelectFileDirective: selectFile_1.default,
    FocusedElementPlaceholder: focusedElement_1.default,
    ElementTextPlaceholder: elementText_1.default,
    ElementHTMLPlaceholder: elementHTML_1.default,
    URLPlaceholder: url_1.default,
    YouTubeTranscriptPlaceholder: youtubeTranscript_1.default,
    CopyDirective: copy_1.default,
    PasteDirective: paste_1.default,
    TypeDirective: type_1.default,
    AlertDirective: alert_1.default,
    DialogDirective: dialog_1.default,
    SayDirective: say_1.default,
    ToastDirective: toast_1.default,
    ShortcutPlaceholder: shortcut_1.default,
    CommandPlaceholder: command_1.default,
    AppleScriptPlaceholder: applescript_1.default,
    JXAPlaceholder: jxa_1.default,
    ShellScriptPlaceholder: shell_1.default,
    JavaScriptPlaceholder: javascript_1.default,
    CutoffDirective: cutoff_1.default,
    IgnoreDirective: ignore_1.default,
};
/**
 * The list of default placeholders. This is a map of each placeholder's full name to its placeholder object. For example, the placeholder with the name "clipboardText" would be accessible as DefaultPlaceholders.ClipboardTextPlaceholder. Some placeholders, mainly file-extension-specific flow directives, can only be accessed using their string index, e.g. DefaultPlaceholders["TextfileMdPlaceholder"].
 */
const DefaultPlaceholders = defaultPlaceholders;
exports.DefaultPlaceholders = DefaultPlaceholders;
