(function () {

    const
        defaults = {
            version: "",
            appUrl: "app",
            cssUrl: "css",
            libsUrl: "libs",
            sysPath: "vbjs",
            appModule: "sys/single-view-app",
            appElementId: "app",
            appObjectName: "_vbjs",
        }
        
    const
        scr = document.currentScript,
        dev = scr.getAttribute("data-dev") === null ? true : eval(scr.getAttribute("data-dev")),
        version = scr.getAttribute("data-version") === null ? defaults.version : scr.getAttribute("data-version"),
        appUrl = scr.getAttribute("data-app-url") === null ? defaults.appUrl : scr.getAttribute("data-app-url"),
        cssUrl = scr.getAttribute("data-css-url") === null ? defaults.cssUrl : scr.getAttribute("data-css-url"),
        libsUrl = scr.getAttribute("data-libs-url") === null ? defaults.libsUrl : scr.getAttribute("data-libs-url"),
        sysPath = scr.getAttribute("data-sys-url") === null ? defaults.sysPath : scr.getAttribute("data-sys-url"),
        appModule = scr.getAttribute("data-app-module") === null ? defaults.appModule : scr.getAttribute("data-app-module"),
        viewModule = scr.getAttribute("data-view-module"),
        appElementId = scr.getAttribute("data-app-container-id") || defaults.appElementId,
        appObjectName = scr.getAttribute("data-app-object-name") || defaults.appObjectName,
        settings = eval("(" + scr.getAttribute("data-settings") + ")") || {usePreloadedTemplates: false},
        sysUrl = "../" + sysPath;

    window[appObjectName] = {
        dev: dev, 
        version: version, 
        appUrl: appUrl, 
        cssUrl: cssUrl, 
        libsUrl: libsUrl, 
        sysPath: sysPath, 
        settings: settings,
        config: {
            module: appModule,
            view: viewModule,
            elementId: appElementId
        }
    };
    
    window.require = {baseUrl: window[appObjectName].appUrl};
    if (window[appObjectName].version) {
        window.require.urlArgs = "v=" + window[appObjectName].version;
    }

    const
        attrValue = scr.getAttribute("data-css-files"),
        cssFiles = attrValue !== null ? eval("[" + attrValue + "]") : [];
        
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
            script.setAttribute("data-main", sysUrl + "/main.js")
            document.body.appendChild(script);
            script.onload = onload;
            script.onerror = onload;
        },
        configure = () => {
            window.requirejs.config({
                __appObjName: appObjectName,
                paths: {
                    libs: libsUrl ? "../" + libsUrl : "../libs",
                    text: ["https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min", "libs/text"],
                    sys: sysUrl,
                    "template": sysUrl + "/require-plugins/template",
                    "composite": sysUrl + "/require-plugins/composite",
                    "cors-text": sysUrl + "/require-plugins/cors-text",
                    "cors-template": sysUrl + "/require-plugins/cors-template",
                    "extension-Element": sysUrl + "/extensions/HTMLElement",
                    "extension-String": sysUrl + "/extensions/String",
                    "extension": sysUrl + "/require-plugins/extension"
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