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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.Yandex = exports.Vivaldi = exports.OperaNeon = exports.OperaGX = exports.OperaDeveloper = exports.OperaBeta = exports.Opera = exports.MicrosoftEdgeDev = exports.MicrosoftEdgeCanary = exports.MicrosoftEdgeBeta = exports.MicrosoftEdge = exports.MaxthonBeta = exports.Maxthon = exports.Iron = exports.GoogleChromeDev = exports.GoogleChromeCanary = exports.GoogleChromeBeta = exports.GoogleChrome = exports.Epic = exports.BraveNightly = exports.BraveDev = exports.BraveBeta = exports.Brave = exports.Blisk = exports.Chromium = exports.OmniWeb = exports.Orion = exports.iCab = exports.SigmaOS = exports.Safari = exports.Arc = void 0;
var arc_1 = require("./arc");
Object.defineProperty(exports, "Arc", { enumerable: true, get: function () { return __importDefault(arc_1).default; } });
var safari_1 = require("./safari");
Object.defineProperty(exports, "Safari", { enumerable: true, get: function () { return __importDefault(safari_1).default; } });
var sigmaos_1 = require("./sigmaos");
Object.defineProperty(exports, "SigmaOS", { enumerable: true, get: function () { return __importDefault(sigmaos_1).default; } });
var icab_1 = require("./icab");
Object.defineProperty(exports, "iCab", { enumerable: true, get: function () { return __importDefault(icab_1).default; } });
var orion_1 = require("./orion");
Object.defineProperty(exports, "Orion", { enumerable: true, get: function () { return __importDefault(orion_1).default; } });
var omniweb_1 = require("./omniweb");
Object.defineProperty(exports, "OmniWeb", { enumerable: true, get: function () { return __importDefault(omniweb_1).default; } });
var chromium_1 = require("./chromium");
Object.defineProperty(exports, "Chromium", { enumerable: true, get: function () { return __importDefault(chromium_1).default; } });
Object.defineProperty(exports, "Blisk", { enumerable: true, get: function () { return chromium_1.Blisk; } });
Object.defineProperty(exports, "Brave", { enumerable: true, get: function () { return chromium_1.Brave; } });
Object.defineProperty(exports, "BraveBeta", { enumerable: true, get: function () { return chromium_1.BraveBeta; } });
Object.defineProperty(exports, "BraveDev", { enumerable: true, get: function () { return chromium_1.BraveDev; } });
Object.defineProperty(exports, "BraveNightly", { enumerable: true, get: function () { return chromium_1.BraveNightly; } });
Object.defineProperty(exports, "Epic", { enumerable: true, get: function () { return chromium_1.Epic; } });
Object.defineProperty(exports, "GoogleChrome", { enumerable: true, get: function () { return chromium_1.GoogleChrome; } });
Object.defineProperty(exports, "GoogleChromeBeta", { enumerable: true, get: function () { return chromium_1.GoogleChromeBeta; } });
Object.defineProperty(exports, "GoogleChromeCanary", { enumerable: true, get: function () { return chromium_1.GoogleChromeCanary; } });
Object.defineProperty(exports, "GoogleChromeDev", { enumerable: true, get: function () { return chromium_1.GoogleChromeDev; } });
Object.defineProperty(exports, "Iron", { enumerable: true, get: function () { return chromium_1.Iron; } });
Object.defineProperty(exports, "Maxthon", { enumerable: true, get: function () { return chromium_1.Maxthon; } });
Object.defineProperty(exports, "MaxthonBeta", { enumerable: true, get: function () { return chromium_1.MaxthonBeta; } });
Object.defineProperty(exports, "MicrosoftEdge", { enumerable: true, get: function () { return chromium_1.MicrosoftEdge; } });
Object.defineProperty(exports, "MicrosoftEdgeBeta", { enumerable: true, get: function () { return chromium_1.MicrosoftEdgeBeta; } });
Object.defineProperty(exports, "MicrosoftEdgeCanary", { enumerable: true, get: function () { return chromium_1.MicrosoftEdgeCanary; } });
Object.defineProperty(exports, "MicrosoftEdgeDev", { enumerable: true, get: function () { return chromium_1.MicrosoftEdgeDev; } });
Object.defineProperty(exports, "Opera", { enumerable: true, get: function () { return chromium_1.Opera; } });
Object.defineProperty(exports, "OperaBeta", { enumerable: true, get: function () { return chromium_1.OperaBeta; } });
Object.defineProperty(exports, "OperaDeveloper", { enumerable: true, get: function () { return chromium_1.OperaDeveloper; } });
Object.defineProperty(exports, "OperaGX", { enumerable: true, get: function () { return chromium_1.OperaGX; } });
Object.defineProperty(exports, "OperaNeon", { enumerable: true, get: function () { return chromium_1.OperaNeon; } });
Object.defineProperty(exports, "Vivaldi", { enumerable: true, get: function () { return chromium_1.Vivaldi; } });
Object.defineProperty(exports, "Yandex", { enumerable: true, get: function () { return chromium_1.Yandex; } });
exports.utils = __importStar(require("./utils"));
