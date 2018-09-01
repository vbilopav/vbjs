(function () {

    const configure = () => {}

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
                return to.endsWith("/") ? to.substring(0, to.length-1) : to;
            }
            var outputParts = [];
            for (var i = samePartsLength; i < lowerFromParts.length; i++) {
                outputParts.push('..');
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join('/');
        };

    const
        defaults = {
            version: "",
            appUrl: "/",
            cssUrl: "css",
            libsUrl: null,
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
        sysUrl = scr.getAttribute("src").replace("vbjs.js", ""),
        appModule = scr.getAttribute("data-app-module") === null ? defaults.appModule : scr.getAttribute("data-app-module"),
        viewModule = scr.getAttribute("data-view-module"),
        appElementId = scr.getAttribute("data-app-container-id") || defaults.appElementId,
        appObjectName = scr.getAttribute("data-app-object-name") || defaults.appObjectName,
        settings = eval("(" + scr.getAttribute("data-settings") + ")") || {usePreloadedTemplates: false, stripScriptTagsInTemplates: true},
        cssFilesattrValue = scr.getAttribute("data-css-files");

    let 
        libsUrl = scr.getAttribute("data-libs-url") === null ? defaults.libsUrl : scr.getAttribute("data-libs-url");

    window[appObjectName] = {
        dev: dev,
        version: version,
        appUrl: appUrl,
        cssUrl: cssUrl,
        sysUrl: sysUrl,
        settings: settings,
        config: {
            module: appModule,
            view: viewModule,
            elementId: appElementId,
            name: appObjectName
        }
    };

    if (!libsUrl) {
        libsUrl = sysUrl.substring(0, sysUrl.indexOf("vbjs"));
    }
    window[appObjectName].libsUrl = libsUrl;

    const 
        sysPath = relative(appUrl, sysUrl),
        libsPath = relative(appUrl, libsUrl);

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

    window.require = {
        baseUrl: window[appObjectName].appUrl,
        __appObjName: appObjectName,
        paths: {
            libs: libsPath,
            sys: sysPath,
            "text": sysPath + "/require-plugins/text",
            "template": sysPath + "/require-plugins/template",
            "document": sysPath + "/require-plugins/document",
            "composite": sysPath + "/require-plugins/composite",
            "cors-text": sysPath + "/require-plugins/cors-text",
            "cors-template": sysPath + "/require-plugins/cors-template",
            "extension": sysPath + "/require-plugins/extension"
        }
    }

    const 
        loadLoader = (src, onload) => {
            let script = document.createElement("script");
            script.async = true;
            script.src = src;
            script.setAttribute("data-main", "sys/main")
            document.body.appendChild(script);
            script.onload = onload;
            script.onerror = onload;
        };

    loadLoader("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js", () => {
        if (window.requirejs) {
            configure();
            return;
        }
        loadLoader(libsUrl + "requirejs/require.js", configure)
    });

})();

