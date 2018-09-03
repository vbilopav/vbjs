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

No new tags or attributes or syntax.

 No huge configuration files. 
 
 Nothing new to learn. 
 
 Very simple and familiar API.

No configuration, 

No transpilation, 

No preparsing, 

No pre-pars-trans-compilation, no special syntax, no magic strings or keywords whatsoever and no long and cryptic configuration files.


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

That will install library globally, which is fine, but we actually recommend local installation:
```
npm install --save-dev vbjs
```

Not that you have already npm initialized in directory and package.json created.

And after that, all you need to include `script` tag into your start page, usually `index.html` or similar with following attributes:

- `src`: reference to `vbjs.js` file. This is usually file `vbjs.js` from distribution package that comes in three separate dirs:
  - `dev` - unminified development source, suitable for development environment
  - `dist/min` - minified source, suitable for building bundles. Everything not included in bundle is lazy loaded.
  - `dist/<version>/bundle/` - minified and bundled version, suitable from production environment.

- `data-view-module`: reference to your application entry point module or template.

For example: `<script data-view-module="document!id" src="/libs/vbjs/dist/1.1.9/bundle/vbjs.js"></script>`

Note that you can also point `src` attribute reference to library on internet over CDN as shown in previous example above. However, that is raw github CDN which is not very fast (and not really supposed to use like that). Hopefully in future that will change.

There are few more attributes that can be set to your `script` element that help you configure further your application. However, those two should are sufficient for most common scenarios. Almost all of 14 [demos](https://github.com/vbilopav/vbjs/tree/master/demos) are using those two. For more info information on additional attributes please consult [documentation](tbd) or even better directly [source code](https://github.com/vbilopav/vbjs/blob/master/src/vbjs/dev/vbjs.js#L72).


## Some examples

There is already ultra simple generic example in opening chapter [what is it?](#what-is-it).

There is also entire [demo folder](https://github.com/vbilopav/vbjs/tree/master/demos) with (at this point) 14 comprehensive examples and demo applications that you can safely browse and experiment with.

Note that one of those 14 demos is under [spa-demo](https://github.com/vbilopav/vbjs/tree/master/demos/spa-demo) dir is little bit bigger single-page-application with around 40 different views or pages implemented and each of those page is example fir itself, so if counting that single-page-application itself that would be 1+40+14=55 examples in total. Plus this one introductory example. That is 52.


## Roadmap

You can track progress for first stable release at [this milestone](https://github.com/vbilopav/vbjs/issues/1)


## How to Contribute

This is open source project, everybody is welcome to contribute. Let's make something simple and powerful together.

However, is you like what I'm doing and you find it useful, you can support me by buying me beer or pizza. Pateron and paypal accounts coming soon.

## License

Copyright (c) Vedran Bilopavlović.  
This source code is licensed under the [MIT license](https://github.com/vbilopav/vbjs/blob/master/src/vbjs/LICENSE.md).

