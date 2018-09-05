# Getting started

## Minimal configuration

Minimal running configuration would just to add following script tag to your web page:

```html
<script data-view-module="document!view-template-id" src="https://cdn.rawgit.com/vbilopav/vbjs/master/src/vbjs/dist/<version>/bundle/vbjs.js"></script>
```

Where:

- Value of attribute `data-view-module` is separated (by exclamation mark), where first value `document` indicates that template inside current html document will be used as start view. And second value is, of course, if of template element itself. See following [example](https://github.com/vbilopav/vbjs/blob/master/demos/frameworks-document/index.html).

- Value of attribute `src` is reference to library script.

## Local installation

This library is hosted on [github](https://github.com/vbilopav/vbjs) and distributed via [npm](https://www.npmjs.com/package/vbjs).

Therefor, for installation from github simply download and clone source code from github, distribution directory ([dist](https://github.com/vbilopav/vbjs/tree/master/src/vbjs/dist)) is included.


For installation from npm, assuming that npm system has already been installed on system, simply run:
```
npm install -g vbjs
```

That will install library globally, which is fine, but we actually recommend local installation:
```
npm install --save-dev vbjs
```

Note that you have to have already npm initialized in directory and package.json created.


And after that, all you''l just have to include appropriate `script` tag into your start page, usually `index.html` or similar with following attributes:

- `src`: reference to `vbjs.js` file. This is usually file `vbjs.js` from distribution package that you downloaded from github or npm.
- `data-view-module`: reference to your application entry point module or template.

For example: `<script data-view-module="document!id" src="/libs/vbjs/dist/1.1.9/bundle/vbjs.js"></script>`


## Additional configuration attributes

- `data-dev` - Simple boolean flag value that can be accessed from global application object, just to flag is system in development state or not, default value is `true`.

- `data-version` - Simple string determines current scripts version. This value is automatically adds query string `v=<version-value>` to every script within system (even css if `data-css-files` attribute is used). Default value is none, no version query string is added. 

- `data-app-url` - Default application url. Every module path is relative to this url. Default is your web root at `/`.

- `data-app-module` - Module ID for application entry point. Default value is system module `sys/single-view-app` that initializes single view app (non single-page app) by using module view id from following attribute `data-view-module`. This value can only be JavaScript code file, it cannot be template since it is code entry point to application. Also, script loadsa this module will except it to be function which will be called automatically with only one parameter - container element id. This is useful if you want to have custom application entry point, rather then default one.

- `data-view-module` - Module View ID that will be rendered by deafult by `sys/single-view-app` on initialization, thus making this only sufficient attribute to start with

- `data-app-container-id` - Application container element ID. Passed as only function parameter for every custom entry point module. Not needed when using document template and default `sys/single-view-app`, scripts parent element will be used. Otherwise `app` is default value.

- `data-app-object-name` - Name of default application root object. Default is `_app`.

- `data-settings` - Custom application setting. Accepts only JavaScript object creation syntax. Default values is empty object `{}`

- `data-css-files` - List of css files that will be loaded on startup. This is optional behavior and it will be used by bundler build tool.


Additionally I recommend to add `type="module"` to script tag. This will ensure that library won't be loaded by older browsers like Internet Explorer or not-updated modern broswers.

Typical example would be:

```html
<script type="module" data-view-module="document!element-id" src="../node_modules/vbjs/dist/1.2.5/bundle/vbjs.js"></script>
```

## View types

There are few view types that can be used with `data-view-module` tag:

- **`document`** - Assumues that view is contained inside current document element. It has following syntax `document!<element-id>`, where `element-id` is actual id of element where view is located.

- **`template`** - Assumues that view is placed in it's own speparate HTML file. It has following syntax `template!<view-html-file>` where HTML file is name of HTML file with extension relative to current app URL (`data-app-url` attribute) 

- **Code modules (JavaScript files)** - Assumues that view is placed in it's own speparate JavaScript module file. Value is name of JavaScript file without JS extension. Module is assumed to be class or function that can be instantiated and that it have, at minimum one `render` function that returns string, promise that return string, html element, promise to return html elemenet or function that returns one of these. More details in documentation.

This is only specail syntax in this library.