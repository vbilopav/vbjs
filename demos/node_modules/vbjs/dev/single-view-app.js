define(
    ["sys/app", "sys/view-manager/reveal"], (app, reveal) => 
        id => 
            reveal(
                {
                    view: app.config.view, 
                    elementOrId: document.getElementById(id).html("")
                })
);
