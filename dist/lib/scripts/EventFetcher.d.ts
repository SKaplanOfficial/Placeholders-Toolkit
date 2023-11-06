/**
 * Wrapper around event fetching functions.
 */
declare const EventFetcher: {
    /**
     * Fetches upcoming events from the user's calendar or reminders.
     * @param eventType The type of event to fetch, either "calendar" or "reminder".
     * @param duration The duration of the event to fetch, either 0 (today), 1 (this week), 2 (this month), or 3 (this year).
     * @returns A comma-separated list of the name, start time, and end time of all calendar events that are scheduled over the specified duration.
     */
    getUpcomingEvents: (eventType: "calendar" | "reminder", duration: number) => Promise<string>;
    /**
     * Fetches upcoming calendar events scheduled over the next 24 hours.
     * @returns The list of calendar events.
     */
    getTodayCalendarEvents: () => Promise<string>;
    /**
     * Fetches upcoming calendar events scheduled over the next 7 days.
     * @returns The list of calendar events.
     */
    getWeekCalendarEvents: () => Promise<string>;
    /**
     * Fetches upcoming calendar events scheduled over the next 30 days.
     * @returns The list of calendar events.
     */
    getMonthCalendarEvents: () => Promise<string>;
    /**
     * Fetches upcoming calendar events scheduled over the next 365 days.
     * @returns The list of calendar events.
     */
    getYearCalendarEvents: () => Promise<string>;
    /**
     * Fetches upcoming reminder events scheduled over the next 24 hours.
     * @returns The list of reminder events.
     */
    getTodayReminderEvents: () => Promise<string>;
    /**
     * Fetches upcoming reminder events scheduled over the next 7 days.
     * @returns The list of reminder events.
     */
    getWeekReminderEvents: () => Promise<string>;
    /**
     * Fetches upcoming reminder events scheduled over the next 30 days.
     * @returns The list of reminder events.
     */
    getMonthReminderEvents: () => Promise<string>;
    /**
     * Fetches upcoming reminder events scheduled over the next 365 days.
     * @returns The list of reminder events.
     */
    getYearReminderEvents: () => Promise<string>;
};
export default EventFetcher;
