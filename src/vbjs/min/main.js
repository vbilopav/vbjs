define(["sys/app","sys/models/model","extension-Element/find","extension-Element/forEachChild","extension-Element/show","extension-Element/hide","extension-Element/appendTo","extension-Element/on","extension-Element/html","extension-String/hashCode","extension-String/html","extension-String/toHTML","extension!Window/on","extension-Element/addClass","extension-Element/removeClass","sys/template/parser"],(e,n)=>{e.Model=n,e.import=(e=>new Promise(n=>require(e,e=>n(e)))),e.fetch=(async(e,n)=>await(await fetch(e,n)).json()),require([e.config.module],n=>n(e.config.elementId))});