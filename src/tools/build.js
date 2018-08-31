const Builder = require("./builder");
const builder = new Builder("../vbjs/dev/");

builder.buildMin("../vbjs/min/");

builder.buildBundle({
    bundleDir: "../vbjs/bundle/", 
    entryPoint: "main", 
    pluginsPath: "require-plugins",
    indexModule: "vbjs",
    sysPath:"sys",
    useMin: true,
    skip: ["sys/models/pubsub", "sys/models/storage", "cors-template", "cors-text"]
});
