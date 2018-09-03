define(
    ["sys/app"], app => 
        id => {
            const parseQueryString = input => 
                input.slice(input.indexOf('?') + 1)
                .match(/[\w\d%\-!.~'()\*]+=[\w\d%\-!.~'()\*]+/g)
                .map(s => s.split('=').map(decodeURIComponent))
                .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
            app.queryString = document.location.search ? parseQueryString(document.location.search) : {};
            let element;
            if (app.config.view.startsWith("document!") && (!id || id==="app")) {
                let getElement = () => {
                    id = app.config.view.replace("document!", "");
                    return (document.getElementById(id) || document.getElementsByName(id)).parentElement;
                }
                if (!id) {
                    element = getElement();
                } else {
                    element = document.getElementById(id);
                    if (!element) {
                        id = app.config.view.replace("document!", "");
                        element = getElement();
                    }
                }
                
            } else {
                element = document.getElementById(id).html("");
            }
            return app.render(
                app.config.view, 
                element,
                Object.assign({}, app.queryString)
            );
        }
);
