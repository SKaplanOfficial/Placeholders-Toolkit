import { Browser } from "./types";
export interface SafariBrowser extends Browser {
    topSites: () => Promise<string[]>;
    bookmarks: (count: number) => Promise<string[]>;
}
declare const Safari: SafariBrowser;
export default Safari;
