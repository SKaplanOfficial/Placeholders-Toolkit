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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderType = exports.PlaceholderCategory = exports.PLCreator = exports.PLLoader = exports.PLApplicator = exports.Placeholders = exports.DefaultPlaceholders = void 0;
var defaultPlaceholders_1 = require("./defaultPlaceholders");
Object.defineProperty(exports, "DefaultPlaceholders", { enumerable: true, get: function () { return defaultPlaceholders_1.DefaultPlaceholders; } });
exports.Placeholders = __importStar(require("./placeholders"));
var apply_1 = require("./apply");
Object.defineProperty(exports, "PLApplicator", { enumerable: true, get: function () { return apply_1.PLApplicator; } });
var load_1 = require("./load");
Object.defineProperty(exports, "PLLoader", { enumerable: true, get: function () { return load_1.PLLoader; } });
var new_1 = require("./new");
Object.defineProperty(exports, "PLCreator", { enumerable: true, get: function () { return new_1.PLCreator; } });
var types_1 = require("./types");
Object.defineProperty(exports, "PlaceholderCategory", { enumerable: true, get: function () { return types_1.PlaceholderCategory; } });
Object.defineProperty(exports, "PlaceholderType", { enumerable: true, get: function () { return types_1.PlaceholderType; } });
