import { runAppleScript } from "@raycast/utils";
import { spawn } from "child_process";
import * as util from "util";

/**
 * Executes an OSA script using the `osascript` command.
 * @param script The script to execute (either a path to a file or the script itself)
 * @param args The arguments to pass to the script
 * @param language The language of the script, defaults to AppleScript
 * @returns A promise that resolves to the output of the script.
 */
export const execScript = (
  script: string,
  args: (string | boolean | number)[],
  language = "AppleScript",
  stderrCallback?: (data: string) => void
): { data: Promise<string>; sendMessage: (msg: string) => void } => {
  let data = "";
  let sendMessage: (msg: string) => void = (msg: string) => {
    msg;
  };
  const proc = spawn("osascript", [
    ...(script.startsWith("/") ? [] : ["-e"]),
    script,
    "-l",
    language,
    ...args.map((x) => x.toString()),
  ]);

  proc.stdout?.on("data", (chunk) => {
    data += chunk.toString();
  });

  proc.stderr?.on("data", (chunk) => {
    if (stderrCallback) {
      stderrCallback(chunk.toString());
    }
  });

  proc.stdin.on("error", (err) => {
    console.error(`Error writing to stdin: ${err}`);
  });

  sendMessage = async (message: string) => {
    if (message?.length > 0) {
      proc.stdin.cork();
      proc.stdin.write(`${message}\r\n`);
      proc.stdin.pipe(proc.stdin, { end: false });
      process.nextTick(() => proc.stdin.uncork());
    }
  };

  const waitForFinish = async () => {
    while (
      proc.stdout?.readable &&
      proc.stderr?.readable &&
      proc.stdin?.writable
    ) {
      await util.promisify(setTimeout)(100);
    }
    return data.trim();
  };

  return { data: waitForFinish(), sendMessage: sendMessage };
};

/**
 * Gets the name of the currently playing track or stream of Music.app.
 *
 * @returns A promise resolving to the track/stream name as a string.
 */
export const getCurrentTrack = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Music"
      set trackName to current stream title
      if trackName is missing value then
        set trackName to name of current track
      end if
      return trackName
    end tell
  end try`);
};

/**
 * Gets the list of track names in Music.app.
 *
 * @returns A promise resolving to the list of track names as a string.
 */
export const getTrackNames = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Music"
      get name of tracks
    end tell
  end try`);
};

/**
 * Gets the plaintext of the most recently edited note.
 *
 * @returns A promise resolving to the note's plaintext as a string.
 */
export const getLastNote = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Notes"
      get plaintext of note 1
    end tell
  end try`);
};

/**
 * Gets a list of currently installed applications.
 *
 * @returns A promise resolving to the list of apps as a string.
 */
export const getInstalledApplications = async (): Promise<string> => {
  return runAppleScript(`use framework "Foundation"

    property ca : current application
    property theResult : ""
    property query : missing value
    
    try
      set result to ""
      ca's NSNotificationCenter's defaultCenter's addObserver:me selector:"queryDidFinish:" |name|:"NSMetadataQueryDidFinishGatheringNotification" object:(missing value)
      set predicate to ca's NSPredicate's predicateWithFormat:"kMDItemContentType == 'com.apple.application-bundle'"
      set query to ca's NSMetadataQuery's alloc()'s init()
      query's setPredicate:predicate
      query's setSearchScopes:["/Applications", "/Users/"]
      query's startQuery()
      
      repeat while theResult is ""
        delay 0.1
      end repeat
      
      return text 1 thru ((length of theResult) - 2) of theResult
    end try
    
    on queryDidFinish:theNotification
      global result
      set queryResults to theNotification's object()'s results()
      set internalResult to ""
      repeat with object in queryResults
        set itemName to (object's valueForAttribute:("kMDItemFSName")) as text
        set appName to (text 1 thru ((length of itemName) - 4) of itemName)
        if appName does not contain "." and appName does not contain "_" and appName does not end with "Agent" and appName does not end with "Assistant" then
          set internalResult to internalResult & appName & ", "
        end if
      end repeat
      set theResult to internalResult
    end queryDidFinish:`);
};

/**
 * Gets the subject, sender, and content of the most recently received email in Mail.app.
 *
 * @returns A promise resolving to the email as a string.
 */
export const getLastEmail = async (): Promise<string> => {
  return runAppleScript(`try
    tell application "Mail"
      set latestMessage to ""
      set theMailboxes to mailboxes of accounts whose name does not contain "Deleted" and name does not contain "Archive" and name does not contain "Sent"
      
      set newestDate to missing value
      set newestMessage to missing value
      repeat with theAccount in theMailboxes
        repeat with theMailbox in theAccount
          if (count of (messages of theMailbox)) > 0 then
            set theMessage to message 1 of theMailbox
            set messageDate to theMessage's date received
            if newestDate is missing value or messageDate > newestDate then
              set newestDate to messageDate
              set newestMessage to theMessage
            end if
          end if
        end repeat
      end repeat
      
      set messageSubject to newestMessage's subject
      set messageSender to newestMessage's sender
      set messageContent to newestMessage's content
      return "Subject: " & messageSubject & "\\nFrom: " & messageSender & "\\nContent: " & messageContent
    end tell
  end try`);
};

/**
 * Gets the computer's name.
 *
 * @returns A promise resolving to the computer name as a string.
 */
export const getComputerName = async () => {
  return await runAppleScript(`use scripting additions
  return computer name of ((system info) as record)`);
};

/**
 * Gets the current Finder directory.
 * @returns A promise resolving to the path of the current directory as a string.
 */
export const getCurrentDirectory = async () => {
  return await runAppleScript(`tell application "Finder"
    return POSIX path of (insertion location as alias)
  end tell`);
};

/**
 * Gets the application that owns the menubar.
 * @param includePaths Whether to include the path of the application.
 * @returns A promise resolving to the name of the application as a string, or an object containing the name and path if includePaths is true.
 */
export const getMenubarOwningApplication = async (
  includePaths?: boolean
): Promise<string | { name: string; path: string }> => {
  const app = await runAppleScript(`use framework "Foundation"
  use scripting additions
  set workspace to current application's NSWorkspace's sharedWorkspace()
  set runningApps to workspace's runningApplications()
  
  set targetApp to missing value
  repeat with theApp in runningApps
    if theApp's ownsMenuBar() then
      set targetApp to theApp
      exit repeat
    end if
  end repeat
  
  if targetApp is missing value then
    return ""
  else
    ${
      includePaths
        ? `return {targetApp's localizedName() as text, targetApp's bundleURL()'s fileSystemRepresentation() as text}`
        : `return targetApp's localizedName() as text`
    }
  end if`);

  if (includePaths) {
    const data = app.split(", ");
    return { name: data[0], path: data[1] };
  }
  return app;
};

/**
 * Searches for nearby locations matching the provided query.
 * @param query The query to search for.
 * @returns A promise that resolves to a new-line-separated list of addresses.
 */
export const searchNearbyLocations = async (query: string) => {
  return runAppleScript(`set jxa to "(() => {
        ObjC.import('MapKit');
      
        const searchRequest = $.MKLocalSearchRequest.alloc.init;
        searchRequest.naturalLanguageQuery = '${query}';
      
        const search = $.MKLocalSearch.alloc.initWithRequest(searchRequest);
        let addresses = [];
        search.startWithCompletionHandler((response, error) => {
          if (error.localizedDescription) {
            console.error(error.localizedDescription.js);
          } else {
            const numItems = response.mapItems.count > 10 ? 10 : response.mapItems.count;
            for (let i = 0; i < numItems; i++) {
              const item = response.mapItems.objectAtIndex(i);
              const placemark = item.placemark;
              addresses.push(\`\${item.name.js}, \${placemark.subThoroughfare.js} \${placemark.thoroughfare.js}, \${placemark.locality.js}, \${placemark.administrativeArea.js}\`);
            }
          }
        });
      
        const startDate = $.NSDate.date;
        while (startDate.timeIntervalSinceNow > -2) {
          runLoop = $.NSRunLoop.currentRunLoop;
          today = $.NSDate.dateWithTimeIntervalSinceNow(0.1);
          runLoop.runUntilDate(today);
        }

        return addresses.join(\`
        \`);
      })();"
      
      return run script jxa in "JavaScript"`);
};

/**
 * Adds a file to the current Finder selection.
 * @param filePath The path of the file to add to the selection.
 * @returns A promise that resolves to void when the AppleScript has finished running.
 */
export const addFileToSelection = async (filePath: string) => {
  await runAppleScript(`tell application "Finder"
        set theSelection to selection as alias list
        set targetPath to POSIX file "${filePath}"
        copy targetPath to end of theSelection
        select theSelection
    end tell`);
};

export const getSelectedFiles = async (): Promise<{
  paths: string[];
  csv: string;
}> => {
  const data = await runAppleScript(`tell application "Finder"
      set oldDelimiters to AppleScript's text item delimiters
      set AppleScript's text item delimiters to "::"
      set theSelection to selection
      if theSelection is {} then
        return
      else if (theSelection count) is equal to 1 then
        return the POSIX path of (theSelection as alias)
      else
        set thePaths to {}
        repeat with i from 1 to (theSelection count)
          copy (POSIX path of (item i of theSelection as alias)) to end of thePaths
        end repeat
        set thePathsString to thePaths as text
        set AppleScript's text item delimiters to oldDelimiters
        return thePathsString
      end if
    end tell`);
  const paths = data.split("::").map((path) => path.trim());
  const csv = paths.join(",");
  return { paths, csv };
};

/**
 * Gets the names of all currently running non-background applications.
 * @returns A promise that resolves to a comma-separated list of application names.
 */
export const getRunningApplications = async (): Promise<string> => {
  return runAppleScript(`tell application "System Events"
            return displayed name of every application process whose background only is false
        end tell`);
};

/**
 * Gets the name of the system's language.
 * @returns A promise that resolves to the name of the system language as a string.
 */
export const getSystemLanguage = async (): Promise<string> => {
  return runAppleScript(`use framework "Foundation"
        set locale to current application's NSLocale's autoupdatingCurrentLocale()
        set langCode to locale's languageCode()
        return locale's localizedStringForLanguageCode:langCode`);
};
