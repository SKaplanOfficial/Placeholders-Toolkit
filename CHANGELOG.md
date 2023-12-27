# Placeholders Toolkit Changelog

## [0.1.3] - 2023-12-26

- Re-added the `{{selectedFileContents}}` (or just `{{contents}}`) placeholder.
- Deprecated `PLApplicator.checkForPlaceholders()` in favor of `PLChecker.checkForPlaceholders()`.
- Added `PLChecker.checkForPlaceholdersInRange()` and `PLChecker.getPlaceholderRanges()`.
- Added optional `offsets` parameter to `{{clipboardText}}`, allowing users to specify one or more previous clipboard items to return.
- Fixed bug where `{{fileNames}}` would only return the last file name.

## [0.1.2] - 2023-11-11

- Removed debug console logs.

## [0.1.1] - 2023-11-10

- Added syntax examples for each placeholder.
- Added support for passing functions instead of strings when using JavaScript placeholders, e.g. `{{js:dialog(() => askAI("What is the capital of Canada?"))}}.
- Added `{{chooseFile}}`, `{{chooseFolder}}`, and `{{chooseApplication}}` placeholders.
- Added `{{write to="[path]":...}}` placeholder.
- General documentation improvements.

## [0.1.0] - 2023-11-07

- First generally stable release.
