define(
    ["sys/app"], (app) => 
        id => {
            const parseQueryString = input => 
                input.slice(input.indexOf('?') + 1)
                .match(/[\w\d%\-!.~'()\*]+=[\w\d%\-!.~'()\*]+/g)
                .map(s => s.split('=').map(decodeURIComponent))
                .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
            return app.render(
                app.config.view, 
                document.getElementById(id).html(""),
                document.location.search ? parseQueryString(document.location.search) : {}
            );
        }
);
