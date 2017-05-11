# enquirer [![NPM version](https://img.shields.io/npm/v/enquirer.svg?style=flat)](https://www.npmjs.com/package/enquirer) [![NPM monthly downloads](https://img.shields.io/npm/dm/enquirer.svg?style=flat)](https://npmjs.org/package/enquirer) [![NPM total downloads](https://img.shields.io/npm/dt/enquirer.svg?style=flat)](https://npmjs.org/package/enquirer) [![Linux Build Status](https://img.shields.io/travis/enquirer/enquirer.svg?style=flat&label=Travis)](https://travis-ci.org/enquirer/enquirer)

> Intuitive, plugin-based prompt system for node.js. Much faster and lighter alternative to Inquirer, with all the same prompt types and more, but without the bloat.

## Table of Contents

- [Usage](#usage)
- [Prompt types](#prompt-types)
  * [Publishing prompt types](#publishing-prompt-types)
- [Plugins](#plugins)
  * [Publishing plugins](#publishing-plugins)
- [Why another prompt module?](#why-another-prompt-module)
- [About](#about)
  * [Related projects](#related-projects)
  * [Contributing](#contributing)
  * [Running tests](#running-tests)
  * [Author](#author)
  * [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Usage

### [Enquirer](index.js#L21)

Create an instance of `Enquirer` with the given `options`.

**Params**

* `options` **{Object}**

**Example**

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();
```

### [.register](index.js#L82)

Register a new prompt `type` with the given `fn`.

**Params**

* `type` **{String}**: The name of the prompt type
* `fn` **{Function}**: Prompt function that inherits from [prompt-base](https://github.com/enquirer/prompt-base).
* `returns` **{Object}**: Returns the Enquirer instance for chaining.

**Example**

```js
enquirer.register('confirm', require('enquirer-prompt-confirm'));
```

### [.use](index.js#L101)

Invoke a plugin `fn`

**Params**

* `fn` **{Function}**: Function that takes an instance of `Enquirer`
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
enquirer.use(require('some-enquirer-plugin'));
```

### [.question](index.js#L139)

Create question `name` with the given `message` and `options`. Uses [enquirer-question](https://github.com/enquirer/enquirer-question), visit that library for additional details.

**Params**

* `name` **{String|Object}**: Name or options object
* `message` **{String|Object}**: Message or options object
* `options` **{Object}**
* `returns` **{Object}**: Returns the created question object

**Events**

* `emits`: `question`

**Example**

```js
enquirer.question('color', 'What is your favorite color?');
enquirer.question('color', 'What is your favorite color?', {
  default: 'blue'
});
enquirer.question('color', {
  message: 'What is your favorite color?',
  default: 'blue'
});
enquirer.question({
  name: 'color',
  message: 'What is your favorite color?',
  default: 'blue'
});
enquirer.question({
  name: 'color',
  type: 'input', // "input" is the default prompt type and doesn't need to be specified
  message: 'What is your favorite color?',
  default: 'blue'
});
```

### [.ask](index.js#L214)

Initialize a prompt session for one or more questions.

* `returns` **{Array|Object}** `questions`: One or more question objects or names of registered questions.

**Events**

* `emits`: `ask` With the array of `questions` to be asked

**Example**

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.question('first', 'First name?');
enquirer.question('last', 'Last name?');

enquirer.ask('first')
  .then(function(answers) {
    console.log(answers)
  });

// errors
enquirer.ask('first')
  .then(function(answers) {
    console.log(answers)
  })
  .catch(function(err) {
    console.log(err)
  });
```

### [.prompt](index.js#L248)

Initialize a prompt session for a single question. Used by the [ask](#ask) method.

**Params**

* `name` **{String}**

**Events**

* `emits`: `prompt` with the `default` value, `key`, `question` object, and `answers` object
* `emits`: `answer` with the `answer` value, `key`, `question` object, and `answers` object

**Example**

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.question('first', 'First name?');
enquirer.prompt('first')
  .then(function(answers) {
    console.log(answers)
  });
```

### [.separator](index.js#L293)

Create a new `Separator` to use in a choices array.

### [.Separator](index.js#L316)

Create a new `Separator` to use in a choices array.

## Prompt types

**What is a prompt "type"?**

Prompt types determine the type of question - or prompt - to initiate. Currently, the only prompt type that ships with enquirer is `input`.

These following additional prompt types are available as plugins:

* [prompt-autocompletion](https://www.npmjs.com/package/prompt-autocompletion): Prompt that autocompletes as you type. Can be used standalone or with a prompt system… [more](https://github.com/enquirer/prompt-autocompletion) | [homepage](https://github.com/enquirer/prompt-autocompletion "Prompt that autocompletes as you type. Can be used standalone or with a prompt system like [enquirer]")
* [prompt-checkbox](https://www.npmjs.com/package/prompt-checkbox): Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-checkbox "Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-confirm](https://www.npmjs.com/package/prompt-confirm): Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-confirm "Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-editor](https://www.npmjs.com/package/prompt-editor): Editor prompt. Opens your text editor and waits for you to save your input during… [more](https://github.com/enquirer/prompt-editor) | [homepage](https://github.com/enquirer/prompt-editor "Editor prompt. Opens your text editor and waits for you to save your input during a prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-expand](https://www.npmjs.com/package/prompt-expand): Expand prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-expand) | [homepage](https://github.com/enquirer/prompt-expand "Expand prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-input](https://www.npmjs.com/package/prompt-input): This package name is not currently in use, but was formerly occupied by a popular… [more](https://github.com/npm/security-holder#readme) | [homepage](https://github.com/npm/security-holder#readme "This package name is not currently in use, but was formerly occupied by a popular package. To avoid malicious use, npm is hanging on to the package name, but loosely, and we'll probably give it to you if you want it.")
* [prompt-list](https://www.npmjs.com/package/prompt-list): List-style prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-list) | [homepage](https://github.com/enquirer/prompt-list "List-style prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-password](https://www.npmjs.com/package/prompt-password): Password prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-password) | [homepage](https://github.com/enquirer/prompt-password "Password prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-question](https://www.npmjs.com/package/prompt-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/prompt-question "Question object, used by Enquirer and prompt plugins.")
* [prompt-radio](https://www.npmjs.com/package/prompt-radio): Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled… [more](https://github.com/enquirer/prompt-radio) | [homepage](https://github.com/enquirer/prompt-radio "Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled whilst all others are disabled. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-rawlist](https://www.npmjs.com/package/prompt-rawlist): Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-rawlist) | [homepage](https://github.com/enquirer/prompt-rawlist "Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")

Or you can use [enquirer-prompts](https://github.com/enquirer/enquirer-prompts), if you want a bundle with all of the listed prompt types.

### Publishing prompt types

Prompt modules are named using the convention `prompt-*`.

TBC

## Plugins

TODO

### Publishing plugins

Plugin modules are named using the convention `enquirer-*`.

TBC

## Why another prompt module?

We use prompts extensively in our projects, and we wanted to improve the user experience and reduce dependencies associated with other libraries we tried, like Inquirer.

Our main goals were:

* reduce initial load time
* make prompt-types easier to add
* make code footprint smaller

**Initial load time**

Enquirer takes **~11ms** to load. This is about the same amount of time that it takes [chalk](https://github.com/chalk/chalk) to load.

By comparison, Inquirer takes **~120ms** to load. This is about how long it takes babel, or other massive libraries that you would never include in production code.

Regardless of whether or not a prompt is every actually used, your own application will be 120ms slower from having Inquirer in its dependency tree. This is caused by its own massive dependency tree, code redundancy, monolithic and slow [reactive interface](https://github.com/SBoudrias/Inquirer.js#reactive-interface) (which makes little sense for this use case anyway), poor API design (Inquirer actually executes code, even if you never call the library!), and so on.

120ms might not seem like a lot, but there is a critical threshold where performance of an application begins to feel laggy, and having inquirer in your dependency tree cuts into that threshold significantly, leaving less room for everything else.

**Make prompts easier to add**

Inquirer uses a [reactive interface](https://github.com/SBoudrias/Inquirer.js#reactive-interface) for flow control. Aside from being overkill and not offering and real code advantages, to work with the code you need to be familiar with microsoft's RX first. This makes it a pain to add new prompt types (e.g. you probably won't).

Regarding the specific "merits" of RX alone, we think it's overkill, makes the application slow, bloated, hard to maintain, hard to contribute to, and difficult to extend. Events are sufficient.

**Code footprint**

By moving prompt types into separate libraries, we're able to keep the core library small and fast. Moreover, implementors and authors can create their own prompt types without having to require enquirer itself (unlike inquirer). This also makes the individual prompt libraries easier to maintain.

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on May 05, 2017._