import JavaScriptPlaceholder from "./script-placeholders/javascript";
import { Placeholder } from "./types";
/**
 * The list of default placeholders. This is a map of each placeholder's full name to its placeholder object. For example, the placeholder with the name "clipboardText" would be accessible as DefaultPlaceholders.ClipboardTextPlaceholder. Some placeholders, mainly file-extension-specific flow directives, can only be accessed using their string index, e.g. DefaultPlaceholders["TextfileMdPlaceholder"].
 */
declare const DefaultPlaceholders: {
    AudioFlowDirective: Placeholder;
    PDFFlowDirective: Placeholder;
    NearbyLocationsPlaceholder: Placeholder;
    FilePlaceholder: Placeholder;
    SelectFileDirective: Placeholder;
    FocusedElementPlaceholder: Placeholder;
    ElementTextPlaceholder: Placeholder;
    ElementHTMLPlaceholder: Placeholder;
    URLPlaceholder: Placeholder;
    YouTubeTranscriptPlaceholder: Placeholder;
    CopyDirective: Placeholder;
    PasteDirective: Placeholder;
    TypeDirective: Placeholder;
    AlertDirective: Placeholder;
    DialogDirective: Placeholder;
    SayDirective: Placeholder;
    ToastDirective: Placeholder;
    ShortcutPlaceholder: Placeholder;
    CommandPlaceholder: Placeholder;
    AppleScriptPlaceholder: Placeholder;
    JXAPlaceholder: Placeholder;
    ShellScriptPlaceholder: Placeholder;
    JavaScriptPlaceholder: Placeholder;
    CutoffDirective: Placeholder;
    IgnoreDirective: Placeholder;
    VideoFlowDirective: Placeholder;
    ImageFlowDirective: Placeholder;
    TextFileFlowDirective: Placeholder;
    GetPersistentVariablePlaceholder: Placeholder;
    ResetPersistentVariablePlaceholder: Placeholder;
    DeletePersistentVariablePlaceholder: Placeholder;
    VarsPlaceholder: Placeholder;
    IncrementPersistentVariablePlaceholder: Placeholder;
    DecrementPersistentVariablePlaceholder: Placeholder;
    ClipboardTextPlaceholder: Placeholder;
    SelectedTextPlaceholder: Placeholder;
    SelectedFilesPlaceholder: Placeholder;
    FileNamesPlaceholder: Placeholder;
    FileContentsPlaceholder: Placeholder;
    FileMetadataPlaceholder: Placeholder;
    CurrentAppNamePlaceholder: Placeholder;
    CurrentAppBundleIDPlaceholder: Placeholder;
    CurrentAppPathPlaceholder: Placeholder;
    CurrentDirectoryPlaceholder: Placeholder;
    CurrentURLPlaceholder: Placeholder;
    CurrentTabTextPlaceholder: Placeholder;
    UserPlaceholder: Placeholder;
    HomeDirPlaceholder: Placeholder;
    HostnamePlaceholder: Placeholder;
    ComputerNamePlaceholder: Placeholder;
    ShortcutsPlaceholder: Placeholder;
    DatePlaceholder: Placeholder;
    DayPlaceholder: Placeholder;
    TimePlaceholder: Placeholder;
    TimezonePlaceholder: Placeholder;
    TodayEventsPlaceholder: Placeholder;
    WeekEventsPlaceholder: Placeholder;
    MonthEventsPlaceholder: Placeholder;
    YearEventsPlaceholder: Placeholder;
    TodayRemindersPlaceholder: Placeholder;
    WeekRemindersPlaceholder: Placeholder;
    MonthRemindersPlaceholder: Placeholder;
    YearRemindersPlaceholder: Placeholder;
    TodayWeatherPlaceholder: Placeholder;
    WeekWeatherPlaceholder: Placeholder;
    SystemLanguagePlaceholder: Placeholder;
    MusicTracksPlaceholder: Placeholder;
    CurrentTrackPlaceholder: Placeholder;
    LastNotePlaceholder: Placeholder;
    LastEmailPlaceholder: Placeholder;
    SafariTopSitesPlaceholder: Placeholder;
    SafariBookmarksPlaceholder: Placeholder;
    InstalledApplicationsPlaceholder: Placeholder;
    RunningApplicationsPlaceholder: Placeholder;
    UUIDPlaceholder: Placeholder;
    UsedUUIDsPlaceholder: Placeholder;
    LocationPlaceholder: Placeholder;
    SetPersistentVariablePlaceholder: Placeholder;
} & {
    [key: string]: Placeholder;
};
export { DefaultPlaceholders, JavaScriptPlaceholder };
