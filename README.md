[![npm version](https://badge.fury.io/js/vbjs.svg)](https://badge.fury.io/js/vbjs)
[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://github.com/vbilopav/vbjs/blob/master/src/vbjs/LICENSE.md)

# vbjs app framework

Built for simplicity and speed. Minimal dependency, minimal, almost no configuration, no special framework-specific syntax to be learned, minimal api, minimal learning curve, high productivity. 

> **WARNING:** it's a beta version, so, documentation may have mistakes, if you face any problems feel free to create [issues](https://github.com/vbilopav/vbjs).

## Table of Contents

- [What is it?](#what-is-it)
- [Motivation](#motivation)
- [Installation](#installation)
- [Some examples](#some-examples)
- [Roadmap](#roadmap)
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


However, that doesn't mean that this library doesn't support more advanced stuff like *template files*, *modules*, *components*, *model binding*, *client url router*, *single page applications*, and more...

Contrary...

Anyway, current minified bundle size is at *27.2KB* (*8.3KB* gzipped).

## [Motivation](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f)

Honestly, world doesn't need yet another JavaScript framework.

This is (or it least it was) - a weekend, experimental and educational pet project. 

I started experimenting with and learning new JavaScript features. I was also bit curious how could I implement intelligently some of common JavaScript needs that I've been using for serious projects at that time. 

After while as development and experimentation continued it became something really fun that I enjoyed working and it showed that it can be very useful, so I decided to continue and press on. I tried really hard to keep it as simple and concise as possible and close to official JavaScript/HTML modern standards as possible.

## Installation

This library is hosted on [github](https://github.com/vbilopav/vbjs) and distributed via [npm](https://www.npmjs.com/package/vbjs).

For installation from github simply download and cloe source code from github, distribution directory is included.


For installation from npm, just run:
```
npm install -g vbjs
```

That will install library globally, so actually we're recommend:
```
npm install --save-dev vbjs
```

And after that, all you need to include `script` tag into your start page, usually `index.html` or similar with following attributes:

- `src`: reference to `vbjs.js` file. This is usually file `vbjs.js` from distribution package that comes in three separate dirs:
  - `dev` - unminified development source, suitable for development environment
  - `dist/min` - minified source, suitable for building bundles. Everything not included in bundle is lazy loaded.
  - `dist/<version>/bundle/` - minified and bundled version, suitable from production environment.

- `data-view-module`: reference to your application entry point module or template.

Note that you can also point `src` attribute reference to library on internet over CDN as shown in example above. However, that is raw github CDN which is not very fast (and not really supposed to use like that). Hopefully in future that will change.

There are few more attributes that can be set to your `script` element that help you configure further your application. However, those two should are sufficient for most common scenarios. Almost all of 14 [demos](https://github.com/vbilopav/vbjs/tree/master/demos) are using those two. For more info information on additional attributes please consult [documentation]() or even better - [source code](https://github.com/vbilopav/vbjs/blob/master/src/vbjs/dev/vbjs.js#L72)


## Some examples

```html
```

## Roadmap

## How to Contribute

## How to Make Pull Request

## License

