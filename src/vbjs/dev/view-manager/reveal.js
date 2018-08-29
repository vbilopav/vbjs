define([

    "sys/view-manager/utils", 
    "sys/app",
    "sys/template/helpers",
    "sys/view-manager/components",

], (
    utils,
    app,
    helpers,
    {getEntry},
    
) => {

    const 
        parseComponentByElement = (e, components, owner) => {
            if (!components.includes(e.nodeName)) {
                return;
            }
            const 
                entry = getEntry(e.nodeName);
            if (!entry) {
                return;
            }
            found = true;
            const 
                params = {},
                wrapper = entry.wrap.createElement();
            for(let i = 0, l = e.attributes.length; i<l; i++) {
                let attr = e.attributes[i];
                params[attr.name.toCamelCase()] = attr.value;
            }
            params["html"] = e.html();
            e.parentElement.insertBefore(wrapper, e);
            e.remove();
            if (owner) {
                params.___owner = owner;
                let name = params.name || params.id;
                if (name) {
                    owner = owner.template || owner;
                    owner.children = owner.children || {};
                    owner.children[name.toCamelCase()] = params;
                }
            }
            return {view: entry.src, elementOrId: wrapper, params: params}
        },
        revealComponents = (element, instance, owner) => {
            let components = instance.components;
            if (!components || !components.length) {
                return;
            }
            const
                revealAll = [];
            element.forEachChild(e => {
                let parsed = parseComponentByElement(e, components, owner);
                if (parsed) {
                    revealAll.push(parsed);
                }
            });
            const 
                observer = new MutationObserver(mutations => {
                    for (let mutation of mutations) { 
                        if (!mutation.addedNodes || !mutation.addedNodes.length) {
                            continue;
                        }
                        for (let e of mutation.addedNodes) {
                            let parsed = parseComponentByElement(e, components, owner);
                            if (parsed) { 
                                reveal(parsed);
                            }
                        }
                    }
                });
            const config = {attributes: false, childList: true, subtree: true};
            if (revealAll.length) {
                Promise.all(revealAll.map(arg => reveal(arg))).then(r => {
                    observer.observe(element, config);
                });
            } else  {
                observer.observe(element, config);
            }
            return observer;
        },
        reveal = ({
            id="", 
            view=(()=>{throw view})(), 
            params={}, 
            uri="", 
            elementOrId=(()=>{throw elementOrId})()
        }) => new Promise(resolve => {
        
            let 
                viewName, modules;
            if (typeof view === "string") {
                viewName = view;
                modules = [view]
            } else if (typeof view === "object") {
                viewName = view.name;
                if (view.inject) {
                    modules = [viewName].concat(view.inject)
                } else {
                    modules = [viewName];
                }
            }
            if (!viewName || !modules) {
                throw new Error("View definition incorrect!");
            }
            
            require(modules, (view, ...injected) => {
                let uriHash = uri.hashCode();
                let type = utils.getViewType(view, viewName),
                    element = (typeof elementOrId === "string" ? "span".createElement(elementOrId) : elementOrId),
                    data = {type: type, uriHash: uriHash, x: 0, y: 0, id: id};
                if (id) {
                    element.dataset.id = id;
                }
                
                if (type === utils.types.string) {
        
                    data.element = element.html(view);
        
                } else if (type === utils.types.template) {
        
                    data.instance = view;
                    let result = view(params, {injected: injected});
        
                    if (typeof result === "string") {
        
                        element.html(result);
                        
                        revealComponents(element, params.template, params);
                        utils.templateRendered(params, element);
        
                    } else if (result instanceof HTMLElement) {
        
                        element.html("").append(result);
                        
                        revealComponents(element, params.template, params);
                        utils.templateRendered(params, element);

                    } else if (result instanceof Promise) {
        
                        result.then(r => {
                            
                            if (typeof r === "string") {
                                element.html(r);
                            } else {
                                element.html("").append(r);
                            }
                            
                            revealComponents(element, params.template, params);
                            utils.templateRendered(params, element);
        
                        });
                    }
                    
                } else if (type === utils.types.class) {
                    let options = {
                        disableCaching: false,
                        callRenderOnlyOnce: false,
                        css: []
                    };
                    utils.prepareInstance(options);
                    data.instance = new view({id: id, element: element, options: options}, ...injected);
                    data.instance._options = options;
                    
                    if (params.___owner) {
                        data.instance.parent = params.___owner; 
                        delete params.___owner;
                    }
                    
                    if (options.css && options.css.length) {
                        helpers().css.import(...options.css)
                    }
                }
        
                let contentFunc = c => {
                    if (typeof c === "function" || c instanceof Array) {
                        c = app.parse(...c);
                        c.then(s => {
                            if (typeof s === "string") {
                                element.html(s);
                            } else {
                                element.html("").append(s);
                            }
                            
                            revealComponents(element, data.instance._options, data.instance);
                            utils.moduleRendered(data.instance, {params: params, element: element});

                        })
                    } else if (typeof c === "string" || c instanceof HTMLElement) {
                        if (typeof c === "string") {
                            element.html(c);
                        } else {
                            element.html("").append(c);
                        }
                        
                        revealComponents(element, data.instance._options, data.instance);
                        utils.moduleRendered(data.instance, {params: params, element: element});

                    }
                }
        
                if (type === utils.types.class) {
                    let content = data.instance.render({params: params, element: element});
                    if (typeof content === "function" || content instanceof Array) {
                        if (typeof content === "function") {
                            content = app.parse(content);
                        } else {
                            content = app.parse(...content);
                        }
                    }
                    if (content instanceof Promise) {
                        return content.then(s => {
                            contentFunc(s);
                            return resolve({data, element});
                        });
                    } else {
                        contentFunc(content);
                        return resolve({data, element});
                    }
                } else {
                    return resolve({data, element});
                }
        
            });
        
        });

    return {
        reveal: reveal,
        revealComponents: revealComponents
    }
});



