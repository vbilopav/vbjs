define(
    ["sys/app", "sys/view-manager/reveal"], (app, reveal) => 
        id => {
            const parseQueryString = input => 
                input.slice(input.indexOf('?') + 1)
                .match(/[\w\d%\-!.~'()\*]+=[\w\d%\-!.~'()\*]+/g)
                .map(s => s.split('=').map(decodeURIComponent))
                .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
            return reveal(
                {
                    view: app.config.view, 
                    elementOrId: document.getElementById(id).html(""),
                    params: document.location.search ? parseQueryString(document.location.search) : {}
                });
        }
);
