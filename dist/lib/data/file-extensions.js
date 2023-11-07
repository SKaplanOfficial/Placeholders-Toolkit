"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadsheetFileExtensions = exports.audioFileExtensions = exports.videoFileExtensions = exports.imageFileExtensions = exports.textFileExtensions = void 0;
/**
 * Near-exhaustive list of file extensions for text files that can be read as plain text.
 */
exports.textFileExtensions = [
    "rtf",
    "1",
    "1in",
    "1m",
    "1x",
    "2",
    "3",
    "3in",
    "3m",
    "3qt",
    "3x",
    "4",
    "4th",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a51",
    "abap",
    "ada",
    "adb",
    "ads",
    "ampl",
    "ant",
    "apib",
    "apl",
    "applescript",
    "arc",
    "as",
    "asc",
    "asc",
    "asc",
    "ash",
    "asm",
    "asp",
    "awk",
    "axd",
    "b",
    "bas",
    "bash",
    "bat",
    "bats",
    "bf",
    "bib",
    "bro",
    "brs",
    "c",
    "c++",
    "cbl",
    "cc",
    "ccp",
    "cdf",
    "cfg",
    "cgi",
    "cl",
    "cl",
    "clg",
    "cls",
    "cmake",
    "cmd",
    "cob",
    "cobol",
    "coffee",
    "command",
    "cp",
    "cpp",
    "cpy",
    "cr",
    "cs",
    "css",
    "csv",
    "csx",
    "cxx",
    "d",
    "dart",
    "dcl",
    "di",
    "diff",
    "djs",
    "dockerfile",
    "doctest",
    "dot",
    "e",
    "ecl",
    "eclxml",
    "eex",
    "el",
    "elm",
    "emacs",
    "erb",
    "erl",
    "es",
    "es6",
    "escript",
    "ex",
    "exs",
    "f",
    "f03",
    "f08",
    "f77",
    "f90",
    "f95",
    "factor",
    "fcgi",
    "flux",
    "for",
    "for",
    "forth",
    "fpp",
    "fr",
    "fr",
    "frt",
    "fs",
    "fs",
    "fth",
    "fx",
    "g4",
    "glsl",
    "gml",
    "gml",
    "go",
    "grace",
    "gradle",
    "graphql",
    "groovy",
    "grt",
    "gs",
    "gsp",
    "gvy",
    "h",
    "h++",
    "haml",
    "hcl",
    "hh",
    "hlean",
    "hlsl",
    "hpp",
    "hrl",
    "hs",
    "hsc",
    "htm",
    "html",
    "hxx",
    "hy",
    "icl",
    "idr",
    "in",
    "inc",
    "ini",
    "ino",
    "io",
    "ipp",
    "ipynb",
    "java",
    "jinja",
    "jl",
    "js",
    "jsb",
    "jsm",
    "json",
    "jsp",
    "jss",
    "jsx",
    "kit",
    "kt",
    "ktm",
    "kts",
    "lean",
    "less",
    "lidr",
    "lisp",
    "ll",
    "lock",
    "lol",
    "lsl",
    "lslp",
    "lsp",
    "lua",
    "m",
    "m3u",
    "m3u8",
    "ma",
    "mak",
    "man",
    "markdown",
    "mathematica",
    "matlab",
    "md",
    "me",
    "mk",
    "mkd",
    "mkdn",
    "mkdown",
    "mkfile",
    "mm",
    "mod",
    "mt",
    "mustache",
    "nasm",
    "nb",
    "nb",
    "nbp",
    "ncl",
    "nginxconf",
    "no",
    "numpy",
    "opal",
    "opencl",
    "owl",
    "ox",
    "oxh",
    "oxo",
    "oz",
    "pas",
    "patch",
    "pde",
    "perl",
    "php",
    "phtml",
    "pl",
    "plist",
    "pls",
    "plx",
    "prefs",
    "pro",
    "prolog",
    "properties",
    "ps1",
    "psd1",
    "psm1",
    "pub",
    "pxi",
    "py",
    "pyd",
    "pyde",
    "pyt",
    "pyx",
    "qml",
    "r",
    "rake",
    "raml",
    "rb",
    "rd",
    "rdoc",
    "reb",
    "red",
    "reds",
    "rest",
    "rg",
    "rhtml",
    "rkt",
    "rktd",
    "rmd",
    "robot",
    "rq",
    "rs",
    "rst",
    "rsx",
    "ru",
    "ruby",
    "rust",
    "sas",
    "scala",
    "sci",
    "scm",
    "scpt",
    "scss",
    "sdef",
    "sh",
    "sparql",
    "sql",
    "st",
    "svg",
    "swift",
    "tcc",
    "tcl",
    "tcsh",
    "tex",
    "tmux",
    "toml",
    "tool",
    "tpp",
    "ts",
    "tsx",
    "ttl",
    "txt",
    "vb",
    "vhost",
    "vim",
    "vue",
    "w",
    "wl",
    "wlt",
    "xht",
    "xhtml",
    "xml",
    "xrl",
    "xsjs",
    "yaml",
    "yml",
    "yrl",
    "zsh",
    "rdf",
    "text",
    "tsv",
    "manifest",
    "sass",
    "ascii",
];
/**
 * File extensions that are considered images and are supported by Apple's Vision framework.
 */
exports.imageFileExtensions = [
    "bmp",
    "crw",
    "dng",
    "gif",
    "heic",
    "indd",
    "jpeg",
    "jpg",
    "pict",
    "png",
    "psd",
    "raw",
    "svg",
    "tif",
    "tiff",
    "xmp",
];
/**
 * File extensions that are considered to be videos and are supported by Apple's Core Media framework.
 */
exports.videoFileExtensions = [
    "avi",
    "flv",
    "m4v",
    "mkv",
    "mov",
    "mp4",
    "mpeg",
    "mpg",
    "webm",
    "wmv",
];
/**
 * File extensions that are considered audio files and are supported by Apple's AV Foundation framework.
 */
exports.audioFileExtensions = [
    "aac",
    "ac4",
    "adts",
    "aif",
    "aifc",
    "aiff",
    "au",
    "caf",
    "m4a",
    "mp3",
    "mp4",
    "sd2",
    "snd",
    "wav",
];
/**
 * Spreadsheet file extensions supported by the XLSX package.
 */
exports.spreadsheetFileExtensions = [
    "xls",
    "xlsx",
    "xlsm",
    "xlsb",
    "ods",
    "numbers",
];
