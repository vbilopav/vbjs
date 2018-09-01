define(["sys/spa/router", "sys/spa/view-manager"], (Router, Manager) => appElementId => {

    const 
        app = document.getElementById(appElementId);

    new Router({
        routes: {
            "/": {
                view: "github-user2/github-user"
            },
            "/github-user-info": {
                view: "github-user2/github-user-info",
                paramsMap: params => (params.length === 1 ? params[0] : false)
            }
        },
        error: event => console.log(event)
    })
    .useViewManager(new Manager(app))
    .start();

    app.html("").show();
});
