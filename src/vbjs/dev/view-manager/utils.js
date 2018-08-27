define([], () => {

    const 
        isTemplate = name => name.indexOf("template!") !== -1,
        prefix = "_view",
        getId = uriHash => prefix + uriHash,
        types = {template: 1, class: 2, string: 3},
        getViewType = (view, name) => {
            let t = typeof view;
            if (t === "function") {
                if (isTemplate(name)) {
                    return types.template;
                }
                return types.class;
            }
            if (t === "string") {
                return types.string;
            }
            throw new Error("unknown view type " + view);
        },
        showView = item => {
            window.scrollTo(item.x, item.y);
        },
        templateRendered = (params, element) => {
            if (params.template.context || params.template.model) {
                params.template.model = new _app.Model(params.template.model).bind(element, params.template.context);
            }
            !params.template.rendered || params.template.rendered(element);
        };
        moduleRendered = (instance, args, skipChange=true) => {
            if (instance.model instanceof _app.Model === false && (instance.context || instance.model)) {
                instance.model = new _app.Model(instance.model).bind(args.element, instance.context);
            }
            if (skipChange)  {
                !instance.rendered || instance.rendered({params: args.params, element: args.element});
            } else {
                if (instance.changed) {
                    instance.changed({params: args.params, element: args.element});
                } else if (instance.rendered) {
                    instance.rendered({params: args.params, element: args.element});
                }
            }
        }

    return {

        getId: getId,
        types: types,
        getViewType: getViewType,
        showView: showView,
        templateRendered: templateRendered,
        moduleRendered: moduleRendered,

        prepareParams: async params => {
            if (params instanceof Promise) {
                return await params
            }
            if (typeof params !== "object") {
                params = {
                    value: params
                }
            }
            return params
        }

    }

 });
