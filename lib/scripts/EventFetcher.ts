import { execScript } from "./utils";

const eventsScript = `use framework "EventKit"

property ca : current application

on run (argv)
	set eventType to item 1 of argv
	set duration to (item 2 of argv) as number
	set eventStore to ca's EKEventStore's alloc()'s init()
	eventStore's reset()
	
	set isSonoma to current application's NSProcessInfo's processInfo's isOperatingSystemAtLeastVersion:{majorVersion:14, minorVersion:0, patchVersion:0}
	if isSonoma then
		if eventType is "calendar" then
			eventStore's requestFullAccessToEventsWithCompletion:(missing value)
		else
			eventStore's requestFullAccessToRemindersWithCompletion:(missing value)
		end if
	else
		if eventType is "calendar" then
			eventStore's requestAccessToEntityType:(get ca's EKEntityMaskEvent) completion:(missing value)
		else
			eventStore's requestAccessToEntityType:(get ca's EKEntityMaskReminder) completion:(missing value)
		end if
	end if
	delay 0.1
	
	set calendar to ca's NSCalendar's currentCalendar()
	set dateComponents to ca's NSDateComponents's alloc()'s init()
	if duration is 0 then
		dateComponents's setDay:1
	else if duration is 1 then
		dateComponents's setDay:7
	else if duration is 2 then
		dateComponents's setMonth:1
	else if duration is 3 then
		dateComponents's setYear:1
	end if
	
	set startDate to ca's NSDate's |date|()
	set endDate to calendar's dateByAddingComponents:dateComponents toDate:startDate options:(ca's NSCalendarMatchStrictly)
	
	if eventType is "calendar" then
		set thePredicate to eventStore's predicateForEventsWithStartDate:startDate endDate:endDate calendars:(missing value)
		set upcomingEvents to eventStore's eventsMatchingPredicate:thePredicate
		if upcomingEvents is (missing value) then return ""
		set theEventsData to {title, startDate, endDate} of upcomingEvents
	else if eventType is "reminder" then
		set thePredicate to eventStore's predicateForIncompleteRemindersWithDueDateStarting:startDate ending:endDate calendars:(missing value)
		set upcomingEvents to eventStore's remindersMatchingPredicate:thePredicate
		if upcomingEvents is (missing value) then return ""
		set theEventsData to {title, dueDate} of upcomingEvents
	end if
	
	set theEvents to {}
	repeat with index from 1 to (count of upcomingEvents)
		set eventTitle to (item index of item 1 of theEventsData) as text
		
		if eventType is "calendar" then
			set eventStartDate to item index of item 2 of theEventsData
			set eventEndDate to item index of item 3 of theEventsData
			
			set startDateFormatter to ca's NSDateFormatter's alloc()'s init()
			(startDateFormatter's setDateFormat:"MMMM dd, YYYY 'at' HH:mm a")
			set eventStartString to (startDateFormatter's stringFromDate:eventStartDate)
			
			set endDateFormatter to ca's NSDateFormatter's alloc()'s init()
			(endDateFormatter's setDateFormat:"HH:mm a")
			set eventEndString to (endDateFormatter's stringFromDate:eventEndDate)
			
			set eventInfo to eventTitle & " on " & eventStartString & " until " & eventEndString
		else if eventType is "reminder" then
			set eventDueDate to item index of item 2 of theEventsData
			set dueDateFormatter to ca's NSDateFormatter's alloc()'s init()
			(dueDateFormatter's setDateFormat:"MMMM dd, YYYY 'at' HH:mm a")
			set eventDueString to (dueDateFormatter's stringFromDate:eventDueDate)
			set eventInfo to eventTitle & " on " & eventDueString
		end if
		
		copy eventInfo to end of theEvents
	end repeat
	
	return theEvents
end run`

/**
 * Wrapper around event fetching functions.
 */
const EventFetcher = {
  /**
   * Fetches upcoming events from the user's calendar or reminders.
   * @param eventType The type of event to fetch, either "calendar" or "reminder".
   * @param duration The duration of the event to fetch, either 0 (today), 1 (this week), 2 (this month), or 3 (this year).
   * @returns A comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the specified duration.
   */
  getUpcomingEvents: async (eventType: "calendar" | "reminder", duration: number): Promise<string> => {
    return await (execScript(eventsScript, [eventType, duration], "AppleScript").data);
  },

  /**
   * Fetches upcoming calendar events scheduled over the next 24 hours.
   * @returns The list of calendar events.
   */
  getTodayCalendarEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("calendar", 0);
  },

  /**
   * Fetches upcoming calendar events scheduled over the next 7 days.
   * @returns The list of calendar events.
   */
  getWeekCalendarEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("calendar", 1);
  },

  /**
   * Fetches upcoming calendar events scheduled over the next 30 days.
   * @returns The list of calendar events.
   */
  getMonthCalendarEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("calendar", 2);
  },

  /**
   * Fetches upcoming calendar events scheduled over the next 365 days.
   * @returns The list of calendar events.
   */
  getYearCalendarEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("calendar", 3);
  },

  /**
   * Fetches upcoming reminder events scheduled over the next 24 hours.
   * @returns The list of reminder events.
   */
  getTodayReminderEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("reminder", 0);
  },

  /**
   * Fetches upcoming reminder events scheduled over the next 7 days.
   * @returns The list of reminder events.
   */
  getWeekReminderEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("reminder", 1);
  },

  /**
   * Fetches upcoming reminder events scheduled over the next 30 days.
   * @returns The list of reminder events.
   */
  getMonthReminderEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("reminder", 2);
  },

  /**
   * Fetches upcoming reminder events scheduled over the next 365 days.
   * @returns The list of reminder events.
   */
  getYearReminderEvents: async (): Promise<string> => {
    return await EventFetcher.getUpcomingEvents("reminder", 3);
  },
}

export default EventFetcher;