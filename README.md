# Placeholders Toolkit

A placeholders system for supplying dynamic content to Raycast extensions.

## Installation

```bash
npm install placeholders-toolkit
```

### Usage

```js
import { bulkApply, Placeholder } from "placeholders-toolkit";

const customPlaceholders: Placeholder[] = [
  // Add your custom placeholders here
];

const myFunc = async () => {
  const initialText = "Hello, my name is {{user}}.";
  const substitutedText = await bulkApply(initialText, undefined, customPlaceholders);
  console.log(substitutedText);
}
```
