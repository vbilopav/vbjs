define(
    ["sys/view-manager/reveal"], reveal => 
        id => 
            reveal(
                {
                    view: window[requirejs.s.contexts._.config.__appObjName].config.view, 
                    elementOrId: document.getElementById(id).html("")
                })
);
