"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderCategory = exports.PlaceholderType = void 0;
/**
 * High-level placeholder types.
 */
var PlaceholderType;
(function (PlaceholderType) {
    /**
     * A placeholder that quickly evaluates to a consistently formatted value.
     */
    PlaceholderType[PlaceholderType["Informational"] = 0] = "Informational";
    /**
     * A placeholder that completes a brief action, then evaluates to a short or empty value.
     */
    PlaceholderType[PlaceholderType["StaticDirective"] = 1] = "StaticDirective";
    /**
     * A placeholder that requires user input or a long-running action to evaluate.
     */
    PlaceholderType[PlaceholderType["InteractiveDirective"] = 2] = "InteractiveDirective";
    /**
     * A placeholder that executes a script and evaluates to an arbitrary value.
     */
    PlaceholderType[PlaceholderType["Script"] = 3] = "Script";
    /**
     * A user-defined placeholder.
     */
    PlaceholderType[PlaceholderType["Custom"] = 4] = "Custom";
})(PlaceholderType || (exports.PlaceholderType = PlaceholderType = {}));
/**
 * Mid-level categories of placeholders.
 */
var PlaceholderCategory;
(function (PlaceholderCategory) {
    PlaceholderCategory[PlaceholderCategory["Memory"] = 0] = "Memory";
    PlaceholderCategory[PlaceholderCategory["Calendar"] = 1] = "Calendar";
    PlaceholderCategory[PlaceholderCategory["Weather"] = 2] = "Weather";
    PlaceholderCategory[PlaceholderCategory["Location"] = 3] = "Location";
    PlaceholderCategory[PlaceholderCategory["Device"] = 4] = "Device";
    PlaceholderCategory[PlaceholderCategory["Alert"] = 5] = "Alert";
    PlaceholderCategory[PlaceholderCategory["Internet"] = 6] = "Internet";
    PlaceholderCategory[PlaceholderCategory["Files"] = 7] = "Files";
    PlaceholderCategory[PlaceholderCategory["Meta"] = 8] = "Meta";
    PlaceholderCategory[PlaceholderCategory["Logic"] = 9] = "Logic";
    PlaceholderCategory[PlaceholderCategory["Applications"] = 10] = "Applications";
    PlaceholderCategory[PlaceholderCategory["API"] = 11] = "API";
    PlaceholderCategory[PlaceholderCategory["Other"] = 12] = "Other";
    PlaceholderCategory[PlaceholderCategory["Custom"] = 13] = "Custom";
})(PlaceholderCategory || (exports.PlaceholderCategory = PlaceholderCategory = {}));
