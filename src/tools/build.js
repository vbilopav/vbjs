const Builder = require("./builder");

const builder = new Builder("../vbjs/dev/");

builder.buildMin("../vbjs/min/");

builder.buildBundle({
    bundleDir: "../vbjs/bundle/", 
    entryPoint: "main", 
    pluginsPath: "require-plugins",
    indexModule: "index",
    sysPath:"sys",
    useMin: true
});
