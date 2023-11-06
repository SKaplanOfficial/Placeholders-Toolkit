"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrackNames = exports.getCurrentTrack = exports.getLastNote = exports.getLastEmail = exports.searchNearbyLocations = exports.getSystemLanguage = exports.getRunningApplications = exports.getSelectedFiles = exports.addFileToSelection = exports.getMenubarOwningApplication = exports.getCurrentDirectory = exports.getComputerName = exports.getInstalledApplications = exports.EventFetcher = exports.execScript = void 0;
var utils_1 = require("./utils");
Object.defineProperty(exports, "execScript", { enumerable: true, get: function () { return utils_1.execScript; } });
var EventFetcher_1 = require("./EventFetcher");
Object.defineProperty(exports, "EventFetcher", { enumerable: true, get: function () { return __importDefault(EventFetcher_1).default; } });
var system_1 = require("./system");
Object.defineProperty(exports, "getInstalledApplications", { enumerable: true, get: function () { return system_1.getInstalledApplications; } });
Object.defineProperty(exports, "getComputerName", { enumerable: true, get: function () { return system_1.getComputerName; } });
Object.defineProperty(exports, "getCurrentDirectory", { enumerable: true, get: function () { return system_1.getCurrentDirectory; } });
Object.defineProperty(exports, "getMenubarOwningApplication", { enumerable: true, get: function () { return system_1.getMenubarOwningApplication; } });
Object.defineProperty(exports, "addFileToSelection", { enumerable: true, get: function () { return system_1.addFileToSelection; } });
Object.defineProperty(exports, "getSelectedFiles", { enumerable: true, get: function () { return system_1.getSelectedFiles; } });
Object.defineProperty(exports, "getRunningApplications", { enumerable: true, get: function () { return system_1.getRunningApplications; } });
Object.defineProperty(exports, "getSystemLanguage", { enumerable: true, get: function () { return system_1.getSystemLanguage; } });
Object.defineProperty(exports, "searchNearbyLocations", { enumerable: true, get: function () { return system_1.searchNearbyLocations; } });
var mail_1 = require("./applications/mail");
Object.defineProperty(exports, "getLastEmail", { enumerable: true, get: function () { return mail_1.getLastEmail; } });
var notes_1 = require("./applications/notes");
Object.defineProperty(exports, "getLastNote", { enumerable: true, get: function () { return notes_1.getLastNote; } });
var music_1 = require("./applications/music");
Object.defineProperty(exports, "getCurrentTrack", { enumerable: true, get: function () { return music_1.getCurrentTrack; } });
Object.defineProperty(exports, "getTrackNames", { enumerable: true, get: function () { return music_1.getTrackNames; } });