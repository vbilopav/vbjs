(function () {

    const
        defaults = {
            version: "",
            appUrl: "app",
            cssUrl: "css",
            libsUrl: "libs",
            appModule: "sys/single-view-app",
            appElementId: "app",
            appObjectName: "_app",
        }
        
    const
        scr = document.currentScript,
        dev = scr.getAttribute("data-dev") === null ? true : eval(scr.getAttribute("data-dev")),
        version = scr.getAttribute("data-version") === null ? defaults.version : scr.getAttribute("data-version"),
        appUrl = scr.getAttribute("data-app-url") === null ? defaults.appUrl : scr.getAttribute("data-app-url"),
        cssUrl = scr.getAttribute("data-css-url") === null ? defaults.cssUrl : scr.getAttribute("data-css-url"),
        libsUrl = scr.getAttribute("data-libs-url") === null ? defaults.libsUrl : scr.getAttribute("data-libs-url"),
        sysUrl = scr.getAttribute("src").replace("index.js", ""),
        appModule = scr.getAttribute("data-app-module") === null ? defaults.appModule : scr.getAttribute("data-app-module"),
        viewModule = scr.getAttribute("data-view-module"),
        appElementId = scr.getAttribute("data-app-container-id") || defaults.appElementId,
        appObjectName = scr.getAttribute("data-app-object-name") || defaults.appObjectName,
        settings = eval("(" + scr.getAttribute("data-settings") + ")") || {usePreloadedTemplates: false, stripScriptTagsInTemplates: true},
        cssFilesattrValue = scr.getAttribute("data-css-files");

    window[appObjectName] = {
        dev: dev,
        version: version,
        appUrl: appUrl,
        cssUrl: cssUrl,
        libsUrl: libsUrl,
        sysUrl: sysUrl,
        settings: settings,
        config: {
            module: appModule,
            view: viewModule,
            elementId: appElementId,
            name: appObjectName
        }
    };

    const 
        relative = function(from, to) {
            from = (from[0] === '/' || from[0] === '.' ? from : '/' + from);
            to = (to[0] === '/' || to[0] === '.' ? to : '/' + to);
            const
                lowerFrom = from.toLowerCase(),
                lowerTo = to.toLowerCase(),
                toParts = to.split('/'),
                lowerFromParts = lowerFrom.split('/'),
                lowerToParts = lowerTo.split('/');
                length = Math.min(lowerFromParts.length, lowerToParts.length),
                samePartsLength = length;
            for (var i = 0; i < length; i++) {
                if (lowerFromParts[i] !== lowerToParts[i]) {
                    samePartsLength = i;
                    break;
                }
            }
            if (samePartsLength == 0) {
                return to;
            }
            var outputParts = [];
            for (var i = samePartsLength; i < lowerFromParts.length; i++) {
                outputParts.push('..');
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));      
            return outputParts.join('/');
        };

    const 
        sysPath = relative(appUrl, sysUrl),
        libsPath = relative(appUrl, libsUrl);
    
    window.require = {baseUrl: window[appObjectName].appUrl};
    if (window[appObjectName].version) {
        window.require.urlArgs = "v=" + window[appObjectName].version;
    }

    const
        cssFiles = cssFilesattrValue !== null ? eval("[" + cssFilesattrValue + "]") : [];
        
    if (cssFiles.length) {
        for (let i=0, l=cssFiles.length; i<l; i++) {
            let script = document.createElement("link");
            script.rel  = 'stylesheet';
            script.type = 'text/css';
            script.href = cssUrl + "/" + cssFiles[i] + (version ? "?" + require.urlArgs : "");
            script.media = 'all';
            document.head.appendChild(script);
        }
    }

    const 
        loadLoader = (src, onload) => {
            let script = document.createElement("script");
            script.async = true;
            script.src = src;
            script.setAttribute("data-main", sysPath + "/main.js")
            document.body.appendChild(script);
            script.onload = onload;
            script.onerror = onload;
        },
        configure = () => {
            window.requirejs.config({
                __appObjName: appObjectName,
                paths: {
                    libs: libsPath,
                    text: ["https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min", "libs/text"],
                    sys: sysPath,
                    "template": sysPath + "/require-plugins/template",
                    "composite": sysPath + "/require-plugins/composite",
                    "cors-text": sysPath + "/require-plugins/cors-text",
                    "cors-template": sysPath + "/require-plugins/cors-template",
                    "extension-Element": sysPath + "/extensions/HTMLElement",
                    "extension-String": sysPath + "/extensions/String",
                    "extension": sysPath + "/require-plugins/extension"
                }
            });
        }

    loadLoader("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js", () => {
        if (window.requirejs) {
            configure();
            return;
        }
        loadLoader(libsUrl + "/require.js", configure)
    });

})();