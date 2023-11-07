import { runAppleScript } from "@raycast/utils";

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
