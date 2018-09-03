[![npm version](https://badge.fury.io/js/vbjs.svg)](https://badge.fury.io/js/vbjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/vbjs/blob/master/src/vbjs/LICENSE.md)

# vbjs app framework

Built for simplicity and speed. Minimal dependency, minimal, almost no configuration, no special framework-specific syntax to be learned, minimal api, minimal learning curve, high productivity. 

> **WARNING:** it's a beta version, so, documentation may have mistakes, if you face any problems feel free to create [issues](https://github.com/vbilopav/vbjs).

## Table of Contents

- [What is it?](#what-is-it)
- [Motivation](#motivation)
- [Installation](#installation)
- [Simple usage example](#usage)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [How to Contribute](#how-to-contribute)
- [How to Make Pull Request](#how-to-make-pull-request)
- [License](#license)

## What is it?

It's a JavaScript application framework built for simplicity, speed, productivity and with minimal configuration.

Want to display simple data from your back-end endpoint on your page?

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
              ${async () => this.template.forEach(await(await fetch("/endpoint/")).json(), value => `
                <li>
                    ${value}
                </li>
              `)}
            </div>
          </template>
    </div>

    <script 
        data-view-module="document!data"
        src="https://cdn.rawgit.com/vbilopav/vbjs/master/src/vbjs/dist/1.1.9/bundle/vbjs.js">
    </script>

  </body>
</html>

```

... and that is it, only **one file** with **one dependency**.

No configuration, no transpilation, no preparsing, no pre-pars-trans-compilation, no special syntax, magic strings or keywords whatsoever and no long and cryptic configuration files.


However, that doesn't mean that this library doesn't support more advanced stuff like *template files*, *modules*, *components* and *model binding*.

Contrary...

## [Motivation](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f)

Honestly, world doesn't need yet another JavaScript framework.

This is (or it least it was) - a weekend, experimental and educational pet project. 

I started experimenting with and learning new JavaScript features. I was also bit curious how could I implement intelligently some of common JavaScript needs that I've been using for serious projects at that time. 

After while as development and experimentation continued it became something really fun that I enjoyed working and it showed that it can be very useful, so I decided to continue and press on. 
