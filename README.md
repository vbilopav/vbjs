[![npm version](https://badge.fury.io/js/vbjs.svg)](https://badge.fury.io/js/vbjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/vbjs/blob/master/src/vbjs/LICENSE.md)

# vbjs app framework

Built for simplicity and speed. Minimal dependency, minimal, almost no configuration, no special framework-specific syntax to be learned, minimal api, minimal learning curve, high productivity. 

> **WARNING:** it's a beta version, so, documentation may have mistakes, if you face any problems feel free to create [issues](https://github.com/vbilopav/vbjs).

## Table of Contents

- [What is it?](#what-is-it)
- [Motivation](#motivation)
- [How it works?](#how-it-works)
- [Installation](#installation)
- [Simple usage example](#usage)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [How to Contribute](#how-to-contribute)
- [How to Make Pull Request](#how-to-make-pull-request)
- [License](#license)

## What is it?

It's a JavaScript framework built for simplicity, speed, productivity and with minimal configuration.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My remote data</title>
  </head>
  <body>

    <div>
        <template id="data">
            <ul>
              ${async () => this.template.forEach(await(await fetch("/endpont/")).json(), value => 
                `<li>
                    ${value}
                </li>`
              )}
            </div>
          </template>
    </div>

    <script 
        data-view-module="document!data" src="https://cdn.rawgit.com/vbilopav/vbjs/master/src/vbjs/dist/1.1.9/bundle/vbjs.js">
    </script>

  </body>
</html>

```
