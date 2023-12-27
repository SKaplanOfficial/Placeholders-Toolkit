# Placeholders Toolkit

A placeholders system for supplying dynamic content to Raycast extensions.

## Overview

This package provides the core functionality for the placeholders system seen in Raycast extensions such as [PromptLab](https://www.raycast.com/HelloImSteven/promptlab) and [Pins](https://www.raycast.com/HelloImSteven/pins). The Placeholders Toolkit helps you create, manage, and apply complex placeholders, compose them into more powerful structures, and ultimately use them to give your users a more dynamic experience.

The Placeholders Toolkit supports a wide array of built-in placeholders, including placeholders for getting the current date and time, the current user, the list of upcoming calendar events, custom scripts, and more. You can also create your own placeholders, either programmatically or by specifying them in JSON. Users of your extensions can then use these placeholders to input dynamic content into your extension's commands and input fields. For example, you could create a journal extension that allows users to insert various placeholders to give context to their entries; or you could add support for convenient placeholders to a GitHub/GitLab-esque "Create Issue" command—for example, allowing users to type `{{osVersion}}` to insert their macOS version on-the-fly.

To get started, follow the brief tutorial below, then check out the [API Reference](https://skaplanofficial.github.io/Placeholders-Toolkit/).

## Installation

```bash
npm install placeholders-toolkit
```

[View on npm](https://www.npmjs.com/package/placeholders-toolkit)

### Usage

#### Basic Usage

```ts
import { PLApplicator } from "placeholders-toolkit";

const myFunc = async () => {
  const initialText = "Hello, my name is {{user}}.";
  const substitutedText = await PLApplicator.bulkApply(initialText);
  console.log(substitutedText); // Hello, my name is steven.
}
```

#### Applying Placeholders

The {@link PLApplicator.bulkApply} method is the main method for applying placeholders. It takes a string and returns a promise that resolves to the string with all placeholders applied. Placeholders are applied in order of precedence, with faster placeholders being applied first, in general. Script placeholders, such as `{{js:...}}`, are applied last.

When using {@link PLApplicator.bulkApply}, you can provide a context object that will be passed to all placeholders. This allows you to pass information between placeholders, e.g.:

```ts
const p1 = PLCreator.newPlaceholder("test", { apply_fn: async (str, context) => {
  return { result: "", __my_data: "Hello" }; // Stores some data for the next placeholder to use.
} });

const p2 = PLCreator.newPlaceholder("test2", { apply_fn: async (str, context) => {
  const data = context?.__my_data as string; // Retrieves the data from the previous placeholder.
  return { result: data?.length ? `${data}, world!`: "Goodbye!" };
} });

PLApplicator.bulkApply("{{test}}{{test2}}", { customPlaceholders: [p1, p2] }).then((result) => {
  console.log(result); // Hello, world!
});
```

In the example above, notice how we pass `[p1, p2]` as the third argument to {@link PLApplicator.bulkApply}. This specifies a list of custom placeholders that {@link PLApplicator.bulkApply} will consider in addition to the default placeholders. If you don't want to use any custom placeholders, you can omit this argument. If you want to use only custom placeholders, you can overwrite the default placeholders by passing an empty array as the fourth argument.

{@link PLApplicator} has several methods in addition to {@link PLApplicator.bulkApply} that allow you to apply placeholders in different ways. For example, {@link PLApplicator.applyToString} applies placeholders sequentially without using a managed context object (though you can still implement one yourself if you want).

#### Creating Custom Placeholders

##### Single-Value Placeholders

You can create your own placeholders either programmatically or by specifying them in JSON. All of the following are valid, equivalent ways to create a placeholder:

```ts
const myPlaceholder = PLCreator.newPlaceholder("myPlaceholder", { replace_with: "Testing 1 2 3..." });

const myPlaceholder2 = PLCreator.buildPlaceholdersFromValueDict({ myPlaceholder2: "Testing 1 2 3..." })[0];

const myPlaceholder3 = PLLoader.loadPlaceholderFromJSONString(JSON.stringify({
  name: "myPlaceholder3",
  value: "Testing 1 2 3...",
}));

const myPlaceholder4: Placeholder = {
  name: "myPlaceholder4",
  regex: /{{myPlaceholder4}}/g,
  apply: async (str: string, context?: { [key: string]: unknown }) => {
    return { result: "Testing 1 2 3...", myPlaceholder4: "Testing 1 2 3..." };
  },
  constant: true,
  fn: async (content: string) => (await myPlaceholder4.apply(`{{myPlaceholder4}}`)).result,
  description: "",
  example: "",
  hintRepresentation: `{{myPlaceholder4}}`,
  fullRepresentation: `myPlaceholder4 (Custom)`,
  type: PlaceholderType.Informational,
  categories: [],
};
```

Since this placeholder always maps to a single value, we call it a `single-value placeholder`. To create several single-value placeholders at once, you can use the {@link PLCreator.buildPlaceholdersFromValueDict} method:

```ts
const singleValuePlaceholders = PLCreator.buildPlaceholdersFromValueDict({
  p1: "Testing",
  p2: "1",
  p3: "2",
  p4: "3",
  p5: "...",
});
```

Note that, when using {@link PLApplicator.bulkApply}, you can use existing placeholders when specifying the values for `single-value placeholders`, e.g.:

```ts
const singleValuePlaceholders = PLCreator.buildPlaceholdersFromValueDict({
  p6: "Hello, my name is {{user}}.",
  p7: "Today is {{day}}.",
});

PLApplicator.bulkApply("{{p6}} {{p7}}", { customPlaceholders: singleValuePlaceholders }).then((result) => {
  console.log(result); // Hello, my name is steven. Today is Monday.
});
```

As far as the placeholders system is concerned, `p6` and `p7` are just like any other `single-value placeholders`. However, when {@link PLApplicator.bulkApply} is called, the substitutions for `user` and `day` are applied after the substitutions for `p6` and `p7`, so each placeholder is present in the string at the time it is applied.

##### Dynamic-Value Placeholders

To create a `dynamic-value placeholder`, a placeholder that maps to a function that returns a value, you can use the {@link PLCreator.buildPlaceholdersFromFnDict} method:

```ts
const dynamicValuePlaceholders = PLCreator.buildPlaceholdersFromFnDict({
  p8: async (str, context) => ({ result: str.includes("{{p9}}") ? "Hello. " : "Goodbye. " }),
  p9: async (str, context) => ({ result: "It is currently {{time}}." }),
});

PLApplicator.bulkApply("{{p8}} {{p9}}", { customPlaceholders: dynamicValuePlaceholders }).then((result) => {
  console.log(result); // Hello.  It is currently 13:00:56 PM.
});
```

Alternatively, you can create `dynamic-value placeholders` using {@link PLCreator.newPlaceholder} by specifying the `apply_fn` option:

```ts
const dynamicPlaceholder = PLCreator.newPlaceholder("dynamicPlaceholder", {
  apply_fn: async (str: string, context?: { [key: string]: unknown } | undefined) => {
    const res = str.length > 10 ? "long" : "short";
    return {
      result: res,
      dynamicPlaceholder: res,
    };
  }
});
```

##### Load Placeholders from Files

Suppose you have a JSON file `custom_placeholders.json` containing the following placeholder:

```json
{
  "{{summarize( sentences=(\\d+))?:(([^{]|{(?!{)|{{[\\s\\S]*?}})*?)}}": {
    "name": "summarize",
    "description": "Summarizes text using macOS' native summarization tool. Accepts sentence count as an optional parameter.",
    "value": "{{as:set numSentences to \"$2\" \n if length of numSentences is 0 then set numSentences to 2 \n set numSentences to (numSentences as number) \n summarize \"$3\" in numSentences}}",
    "example": "{{summarize sentences=1:There's a snake in my boot!}}",
    "hintRepresentation": "{{summarize:...}}"
  }
}
```

You could then load the placeholder from the file using {@link PLLoader.loadPlaceholdersFromJSONFile}:

```ts
// Make sure to adjust the path to the file as necessary
const customPlaceholders = await PLLoader.loadPlaceholdersFromFile("/Users/exampleUser/Downloads/custom_placeholders.json");

const text = "{{summarize sentences=1:Say hello to the Store. A home for Extensions published by our community of Developers using our API. Find extensions to the tools you use in your day-to-day.}}";

const result = await PLApplicator.bulkApply(text, { customPlaceholders: customPlaceholders });
console.log(result); // A home for Extensions published by our community of Developers using our API.
```

Note how we used `$2` to refer to the second capture group in the regex. Using this syntax, you can refer to any capture group in the regex, thus allowing you to create placeholders that accept parameters even when using the JSON format.

#### Advanced Usage

The placeholders system is designed to be flexible and extensible. You can use custom application functions to create placeholders that do anything you want, based on any criteria you want. For example, you could create a placeholder that transforms text to uppercase:

```ts
const uppercaseTransform = PLCreator.newPlaceholder("upper", { regex: /{{upper:[\s\S]*}}/g, apply_fn: async (str, context) => {
  const match = str.match(/{{upper:([\s\S]*)}}/);
  const res = match?.[1]?.toUpperCase() ?? "";
  return { result: res };
} });

PLApplicator.bulkApply("Hello, {{upper:world}}", { customPlaceholders: [uppercaseTransform] }).then((result) => {
  console.log(result); // Hello, WORLD
});
```

You could also create a placeholder that outputs a Markdown table:

```ts
const markdownTablePlaceholder = PLCreator.newPlaceholder("mdtable", { regex: /{{mdtable:(([\s\S]*?(,[\s\S]*?)*?)\|)*?([\s\S]*?(,[\s\S]*?)*?)}}/g, apply_fn: async (str, context) => {
  const match = str.match(/{{mdtable:(([\s\S]*?(,[\s\S]*?)*?)\|)*?([\s\S]*?(,[\s\S]*?)*?)}}/);
  const rows = match?.[4]?.split("|");
  const tableLines = rows?.map((row, index) => {
    const cols = row?.split(",");
    if (index == 1) {
      return `| ${cols.map(() => "---").join(" | ")} |\n| ${cols.join(" | ")} |`;
    } else {
      return `| ${cols.join(" | ")} |`;
    }
  });
  return { result: tableLines?.join("\n") || "" };
} });

PLApplicator.bulkApply("{{mdtable:A,B,C,D|E,F,G,H|I,J,K,L|M,N,O,P|Q,R,S,T|U,V,W,X|Y,Z,,}}", { customPlaceholders: [markdownTablePlaceholder] }).then((result) => {
  console.log(result);
  /*
  | A | B | C | D |
  | --- | --- | --- | --- |
  | E | F | G | H |
  | I | J | K | L |
  | M | N | O | P |
  | Q | R | S | T |
  | U | V | W | X |
  | Y | Z |  |  |
  */
});
```

##### Regex Construction

You can specify regexes to match placeholders in a few different ways. You can specify a `RegExp` or a regex string directly, or you can use the methods of {@link PLMatcher} to construct a regex programmatically. For example, the following will all match the same URL placeholder:

```ts
const m1 = /{{url( raw=(true|false))?:https?:\/\/[a-zA-Z0-9.\-#=?]+?}}/g;
const m2 = new RegExp(`{{url( raw=(true|false))?:https?:\\/\\/[a-zA-Z0-9.\\-#=?]+?}}`, "g")
const m3 = PLMatcher.Braced(`url( raw=(true|false))?:(${PLMatcher.HTTPURL().source})`);
const m4 = PLMatcher.Container("url", [PLMatcher.RawParameter("raw", PLMatcher.Bool(), { optional: true })], PLMatcher.HTTPURL());
```

However, if we print out the source of each of these regexes, we see that there are some significant differences:

```ts
m1: /{{url( raw=(true|false))?:https?:\/\/[a-zA-Z0-9.\-#=?]+?}}/g

m2: /{{url( raw=(true|false))?:https?:\/\/[a-zA-Z0-9.\-#=?]+?}}/g

m3: /{{(url( raw=(true|false))?:((?:(?:(?:https?):)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9][a-z0-9_-]{0,62})?[a-z0-9]\.)+(?:[a-z]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?))}}/g

m4: /{{url(\s*?(raw=(true|false))?):((?:(?:(?:https?):)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9][a-z0-9_-]{0,62})?[a-z0-9]\.)+(?:[a-z]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?)}}/g
```

Although these regexes match *mostly* the same strings, the latter two aim to match the URL standard (i.e. RFC 3986) more closely. You might not need the extra precision for your use case, so it's up to you to decide which style to use.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
