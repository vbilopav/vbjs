define([
    "sys/models/model",
    "extension-Element/find",
    "extension-Element/forEachChild",
    "extension-Element/show",
    "extension-Element/hide",
    "extension-Element/appendTo",
    "extension-Element/on",
    "extension-Element/html",
    "extension-String/hashCode",
    "extension-String/html",
    "extension-String/toHTML",
    "extension!Window/on",
    "extension-Element/addClass",
    "extension-Element/removeClass",
    "sys/template/parser"
], Model => {

    let app = window[requirejs.s.contexts._.config.__appObjName];
    app.Model = Model;
    app.import = m => new Promise(resolve => require(m, r => resolve(r)));

    require([app.config.module], app => app(app.config.elementId));

});
