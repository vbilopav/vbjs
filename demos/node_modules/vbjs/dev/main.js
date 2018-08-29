define([
    "sys/app",
    "sys/models/model",
    "sys/view-manager/reveal",
    "extension-Element/find",
    "extension-Element/findAll",
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
    "sys/template/parser",
    "sys/view-manager/components"

], (_app, Model, {reveal}) => {

    _app.Model = Model;
    _app.import = m => new Promise(resolve => require(m, r => resolve(r)));
    _app.fetch = async (url, opts) => await(await fetch(url, opts)).json();
    _app.render = async (view, elementOrId, params) => 
        await reveal({view: view, elementOrId: elementOrId, params: params});
    require([_app.config.module], app => app(_app.config.elementId));

});
