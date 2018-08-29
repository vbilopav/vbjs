define([], () => {

    return function() {
        return {
            forEach: (obj, template) => (obj instanceof Array ? obj : Object.entries(obj || {})).map(
                (item, index) => template(...(item instanceof Array ? item : [item]), index)
            ).join(""),
    
            import: name => require(name),
    
            css: {
                import: (...names) => {
                    require(names.map(item => item.startsWith("text!") ? item : "text!" + item), (...results) => {
                        document.head.appendChild(
                            `<style type="text/css">
                                ${results.join("")}
                            </style>`.toHTML()
                        )
                    });
                }
            },
    
            if: (condition, templateTrue, templateFalse) => (condition ? templateTrue : templateFalse),
        }
    }

});
