import TimezonePlaceholder from "./info-placeholders/timezone";
import LocationPlaceholder from "./info-placeholders/location";
import TodayWeatherPlaceholder from "./info-placeholders/todayWeather";
import WeekWeatherPlaceholder from "./info-placeholders/weekWeather";
import {
  GetPersistentVariablePlaceholder,
  SetPersistentVariablePlaceholder,
  ResetPersistentVariablePlaceholder,
  DeletePersistentVariablePlaceholder,
  VarsPlaceholder,
  IncrementPersistentVariablePlaceholder,
  DecrementPersistentVariablePlaceholder,
} from "./directives/persistent-variables";
import ClipboardTextPlaceholder from "./info-placeholders/clipboardText";
import { JavaScriptPlaceholder } from "./defaultPlaceholders";
import IgnoreDirective from "./directives/ignore";
import CutoffDirective from "./directives/cutoff";
import AppleScriptPlaceholder from "./script-placeholders/applescript";
import JXAPlaceholder from "./script-placeholders/jxa";
import ShellScriptPlaceholder from "./script-placeholders/shell";
import TextFileFlowDirective, {
  TextFileDirectives,
} from "./directives/flow-control/textfiles";
import ImageFlowDirective, {
  ImageDirectives,
} from "./directives/flow-control/images";
import VideoFlowDirective, {
  VideoDirectives,
} from "./directives/flow-control/videos";
import AudioFlowDirective, {
  AudioDirectives,
} from "./directives/flow-control/audio";
import PDFFlowDirective from "./directives/flow-control/pdf";
import URLPlaceholder from "./directives/url";
import FilePlaceholder from "./directives/file";
import FocusedElementPlaceholder from "./directives/focusedElement";
import ElementTextPlaceholder from "./directives/elementText";
import ElementHTMLPlaceholder from "./directives/elementHTML";
import NearbyLocationsPlaceholder from "./directives/nearbyLocations";
import SelectFileDirective from "./directives/selectFile";
import ShortcutPlaceholder from "./directives/shortcut";
import CommandPlaceholder from "./directives/command";
import YouTubeTranscriptPlaceholder from "./directives/youtubeTranscript";
import ChooseFileDirective from "./directives/chooseFile";
import ChooseFolderDirective from "./directives/chooseFolder";
import ChooseApplicationDirective from "./directives/chooseApplication";
import CopyDirective from "./directives/copy";
import PasteDirective from "./directives/paste";
import TypeDirective from "./directives/type";
import WriteFileDirective from "./directives/write";
import ToastDirective from "./directives/alerts/toast";
import SayDirective from "./directives/alerts/say";
import DialogDirective from "./directives/alerts/dialog";
import AlertDirective from "./directives/alerts/alert";
import YearRemindersPlaceholder from "./info-placeholders/calendar/yearReminders";
import MonthRemindersPlaceholder from "./info-placeholders/calendar/monthReminders";
import WeekRemindersPlaceholder from "./info-placeholders/calendar/weekReminders";
import TodayRemindersPlaceholder from "./info-placeholders/calendar/todayReminders";
import YearEventsPlaceholder from "./info-placeholders/calendar/yearEvents";
import MonthEventsPlaceholder from "./info-placeholders/calendar/monthEvents";
import WeekEventsPlaceholder from "./info-placeholders/calendar/weekEvents";
import TodayEventsPlaceholder from "./info-placeholders/calendar/todayEvents";
import UsedUUIDsPlaceholder from "./info-placeholders/usedUUIDs";
import UUIDPlaceholder from "./info-placeholders/uuid";
import RunningApplicationsPlaceholder from "./info-placeholders/runningApplications";
import SafariBookmarksPlaceholder from "./info-placeholders/safariBookmarks";
import SafariTopSitesPlaceholder from "./info-placeholders/safariTopSites";
import InstalledApplicationsPlaceholder from "./info-placeholders/installedApps";
import LastEmailPlaceholder from "./info-placeholders/lastEmail";
import LastNotePlaceholder from "./info-placeholders/lastNote";
import CurrentTrackPlaceholder from "./info-placeholders/currentTrack";
import MusicTracksPlaceholder from "./info-placeholders/musicTracks";
import SystemLanguagePlaceholder from "./info-placeholders/systemLanguage";
import TimePlaceholder from "./info-placeholders/time";
import DayPlaceholder from "./info-placeholders/day";
import DatePlaceholder from "./info-placeholders/date";
import ShortcutsPlaceholder from "./info-placeholders/shortcuts";
import ComputerNamePlaceholder from "./info-placeholders/computerName";
import HostnamePlaceholder from "./info-placeholders/hostname";
import HomeDirPlaceholder from "./info-placeholders/homedir";
import UserPlaceholder from "./info-placeholders/user";
import CurrentTabTextPlaceholder from "./info-placeholders/currentTabText";
import CurrentURLPlaceholder from "./info-placeholders/currentURL";
import CurrentDirectoryPlaceholder from "./info-placeholders/currentDirectory";
import CurrentAppPathPlaceholder from "./info-placeholders/currentAppPath";
import CurrentAppBundleIDPlaceholder from "./info-placeholders/currentAppBundleID";
import CurrentAppNamePlaceholder from "./info-placeholders/currentAppName";
import FileMetadataPlaceholder from "./info-placeholders/metadata";
import FileNamesPlaceholder from "./info-placeholders/fileNames";
import SelectedFilesPlaceholder from "./info-placeholders/selectedFiles";
import SelectedTextPlaceholder from "./info-placeholders/selectedText";
import SelectedFileContentsPlaceholder from "./info-placeholders/selectedFileContents";

export {
  GetPersistentVariablePlaceholder,
  ResetPersistentVariablePlaceholder,
  DeletePersistentVariablePlaceholder,
  VarsPlaceholder,
  IncrementPersistentVariablePlaceholder,
  DecrementPersistentVariablePlaceholder,
  ClipboardTextPlaceholder,
  SelectedTextPlaceholder,
  SelectedFilesPlaceholder,
  SelectedFileContentsPlaceholder,
  FileNamesPlaceholder,
  FileMetadataPlaceholder,
  CurrentAppNamePlaceholder,
  CurrentAppBundleIDPlaceholder,
  CurrentAppPathPlaceholder,
  CurrentDirectoryPlaceholder,
  CurrentURLPlaceholder,
  CurrentTabTextPlaceholder,
  UserPlaceholder,
  HomeDirPlaceholder,
  HostnamePlaceholder,
  ComputerNamePlaceholder,
  ShortcutsPlaceholder,
  DatePlaceholder,
  DayPlaceholder,
  TimePlaceholder,
  TimezonePlaceholder,
  TodayEventsPlaceholder,
  WeekEventsPlaceholder,
  MonthEventsPlaceholder,
  YearEventsPlaceholder,
  TodayRemindersPlaceholder,
  WeekRemindersPlaceholder,
  MonthRemindersPlaceholder,
  YearRemindersPlaceholder,
  TodayWeatherPlaceholder,
  WeekWeatherPlaceholder,
  SystemLanguagePlaceholder,
  MusicTracksPlaceholder,
  CurrentTrackPlaceholder,
  LastNotePlaceholder,
  LastEmailPlaceholder,
  SafariTopSitesPlaceholder,
  SafariBookmarksPlaceholder,
  InstalledApplicationsPlaceholder,
  RunningApplicationsPlaceholder,
  UUIDPlaceholder,
  UsedUUIDsPlaceholder,
  LocationPlaceholder,
  SetPersistentVariablePlaceholder,
  TextFileDirectives,
  TextFileFlowDirective,
  ImageDirectives,
  ImageFlowDirective,
  VideoDirectives,
  VideoFlowDirective,
  AudioDirectives,
  AudioFlowDirective,
  PDFFlowDirective,
  NearbyLocationsPlaceholder,
  FilePlaceholder,
  SelectFileDirective,
  ChooseFileDirective,
  ChooseFolderDirective,
  ChooseApplicationDirective,
  FocusedElementPlaceholder,
  ElementTextPlaceholder,
  ElementHTMLPlaceholder,
  URLPlaceholder,
  YouTubeTranscriptPlaceholder,
  CopyDirective,
  PasteDirective,
  TypeDirective,
  WriteFileDirective,
  AlertDirective,
  DialogDirective,
  SayDirective,
  ToastDirective,
  ShortcutPlaceholder,
  CommandPlaceholder,
  AppleScriptPlaceholder,
  JXAPlaceholder,
  ShellScriptPlaceholder,
  JavaScriptPlaceholder,
  CutoffDirective,
  IgnoreDirective,
};
