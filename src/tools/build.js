const Builder = require("./builder");
const builder = new Builder("../vbjs/dev/");

builder.buildMin("../vbjs/dist/version/min/");

builder.buildBundle({
    bundleDir: "../vbjs/dist/version/bundle/", 
    entryPoint: "main", 
    pluginsPath: "require-plugins",
    indexModule: "vbjs",
    sysPath:"sys",
    useMin: true,
    skip: ["sys/models/pubsub", "sys/models/storage", "cors-template", "cors-text"]
});
