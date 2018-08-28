define(["sys/app"], app => {

    app._components = [];

    const 
        register = ({tag, src, wrap="span"}) => {
            let idx = tag.indexOf("-");
            if (idx === -1 || idx === 0 || idx === tag.length-1) {
                throw new Error("Invalid tag name. Tags names should include at least one dash, not on start or end of tag name.") 
            }
            app._components[tag.toUpperCase()] = {
                src: src,
                wrap: wrap
            }
            return app;
        },
        getTags = () => Object.keys(_app._components)
   
    app.component = register;

    return {
        getTags: getTags
    }

 });
