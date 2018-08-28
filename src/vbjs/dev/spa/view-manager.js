define([

    "sys/view-manager/utils", 
    "sys/view-manager/reveal",
    "sys/app"

], (
    utils, 
    {reveal, revealComponents}, 
    app
) => class {

    constructor(
        container=(()=>{throw container})()
    ) {
        this._container = container;
        this._views = {} //id,uri,type,instance
        this._current;
    }

    leave(viewId) {
        if (viewId === undefined) {
            return this;
        }
        let view = this._views[viewId];
        if (!view) {
            return this;
        }
        view.x = window.pageXOffset;
        view.y = window.pageYOffset;
        return this;
    }

    async reveal({id="", view=(()=>{throw view})(), params={}, uri=""}) {
        params = await utils.prepareParams(params);
        await new Promise((resolve, reject) => {
            let found = this._views[id],
                uriHash = uri.hashCode(),
                elementId = utils.getId(uriHash);

            if (this._current) {
                this._current.hide();
            }

            if (found) {

                if (found.type === utils.types.string) {
                    this._current = found.element.show();
                    utils.showView(found, found.element);
                    return resolve(found.element.id);
                }

                let element = this._container.find("#" + elementId);

                if (found.type === utils.types.template) {
                    if (!element.length) {
                        element = "span".createElement(elementId).appendTo(this._container);
                    }
                    if (found.uriHash !== uriHash) {
                        let result = found.instance(params);
                        if (typeof result === "string") {
                            
                            element.html(result);
                            utils.templateRendered(params, element);
                            revealComponents(element, params.template, params);

                        } else if (result instanceof HTMLElement) {
                            
                            element.html("").append(result);
                            utils.templateRendered(params, element);
                            revealComponents(element, params.template);

                        } else if (result instanceof Promise) {
                            result.then(r => {
                                if (typeof r === "string") {
                                    element.html(r);
                                } else {
                                    element.html("").append(r);
                                }

                                utils.templateRendered(params, element);
                                revealComponents(element, params.template, params);

                            });
                        }
                    }
                    this._current = element.show();
                    utils.showView(found, element);
                    return resolve(element.id);
                }

                if (!element.length) {
                    element = this._container.find("[data-id='" + id + "']");
                    if (element.length) {
                        element.id = elementId;
                    }
                }
                if (!element.length) {
                    element = "span".createElement(elementId).appendTo(this._container);
                }

                if (found.type === utils.types.class) {
                    let showFunc = () => {
                        this._current = element.show();
                        utils.showView(found, element);
                        found.uriHash = uriHash;
                    }
                    if ((found.uriHash !== uriHash || found.instance._options.disableCaching)) {
                        let newContent;

                        if (found.instance.change) {
                            newContent = found.instance.change({params: params, element: element});
                        } else if (!found.instance._options.callRenderOnlyOnce) {
                            newContent = found.instance.render({params: params, element: element});
                        }

                        let updateFunc = c => {
                            if (typeof c === "function" || c instanceof Array) {
                                c = app.parse(...c);
                                c.then(s => {
                                    if (typeof s === "string") {
                                        element.html(s).show();
                                    } else {
                                        element.html("").append(s).show();
                                    }

                                    utils.moduleRendered(found.instance, {params: params, element: element}, false);
                                    revealComponents(element, data.instance._options);

                                    showFunc();
                                })
                            } else if (typeof c === "string" || c instanceof HTMLElement) {
                                if (typeof c === "string") {
                                    element.html(c).show();
                                } else {
                                    element.html("").append(c).show();
                                }
                                
                                utils.moduleRendered(found.instance, {params: params, element: element}, false);
                                revealComponents(element, data.instance._options);

                                showFunc();
                            }
                        }

                        if (typeof newContent === "function") {
                            newContent = app.parse(newContent);
                        }
                        if (newContent instanceof Array) {
                            newContent = app.parse(...newContent);
                        }

                        if (newContent instanceof Promise) {
                            return newContent.then(s => {
                                updateFunc(s);
                                return resolve(element.id);
                            });
                        } else {
                            updateFunc(newContent);
                            return resolve(element.id);
                        }
                    } else {
                        showFunc();
                        return resolve(element.id);
                    }
                }
                return reject("unknown type");
            }

            reveal({id, view, params, uri, elementOrId: elementId}).then(result => {
                this._views[id] = result.data;
                this._container.append(result.element);
                this._current = result.element;
                utils.showView(result.data, result.element);
                return resolve(result.element.id);
            })

        });
    }
 });
