<h1 align="center">Spec.js</h1>
<p align="center">
  Testing Library for JavaScript/TypeScript using Specification Files
</p>
<br>

![](https://raw.githubusercontent.com/jameskolce/Spec.js/master/screenshots/carbon.png)

<br>

## Installation

```
npm install -D @jameskolce/spec.js
```

## Workflow

To use Spec.js you can create specification files ending with any of the following patterns: `*.spec.ts`, `*.spec.js`. They can be located anywhere in your project but it's recommended to put them next to the source files being specified.

For example, suppose you have a `src` directory with a `routes.js` file, you can create a `routes.spec.js` file alongside and start the testing process with the `specjs` command.

```
specjs src
```

## Writing Tests

Each test file must export a template literal. The general structure is as follows:

```ts
// feature.spec.ts file
export default `
  Specification Title

  Specification Body

  |- <assertion> <assertion description>
`
```

First line must will be taken as the specification title for this file, the next lines can be anything you want. In the text, any line starting with a turnstile (`|-`) will be taken as an assertion.

Assertions have the following structure:

```
|- <assertion> <assertion description>
```

Where `assertion` can be any JavaScript expression that evaluates to a boolean value. And `assertion description` can be any short string.

The following is an example of a specification file:

```js
// example.spec.ts file
import dependency from './dependency'

export default `
  [TS] Example of a Specification File

  Spec.js allows to test JavaScript programs using specification files.

  Every *.spec.ts|js file exports a single template literal that includes a general
  explanation of the file being specified. Each file represents a logical
  component of a bigger system. Each logical component is composed of several
  units of functionality that can be tested for certain properties.

  Each one of this units of functionality may have one or more
  assertions.

  |- ${dependency} The dependency has been loaded and the first assert has
  been evaluated.

  Multiple assertions can be made for each file:

  |- ${false} This assertion will fail.

  |- ${1+1 === 2} This assertion is true.

  The combination of | and - will form a Turnstile ligature (|-) using the appropriate
  font. Fira Code is recommended. A Turnstile symbol was used by Gottlob Frege
  at the start of a sentence being asserted as true.

  The intended usage is specification-first software. Where the programmer
  defines the high level structure of a program in terms of a specification,
  then progressively builds the parts conforming that specification until all
  the tests are passed. A desired side-effect is having a simple way to generate
  up-to-date documentation outside the code for API consumers.
`
```

Executing the `specjs <projectDir>` command will test those assertions and return the results.

## Testing Single Specification Files

If you want to test only a single specification file then instead of indicating a directory to the `specjs` command, you can indicate the path of the specification file you want to test.

```
specjs feature/myFunction.spec.js
```

![](https://raw.githubusercontent.com/jameskolce/Spec.js/master/screenshots/results.png)

## Usage with TypeScript

You can run TypeScript files using the `ts-node` package. First install it as a development dependency:

```
npm install -D ts-node
```

And then run the specjs command with it:

```
ts-node node_modules/@jameskolce/spec.js/dist/bin <projectDir>
```

## License

MIT License - James Kolce
