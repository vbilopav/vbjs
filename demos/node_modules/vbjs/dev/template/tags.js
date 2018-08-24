define([], () => {

    return {
        parse: text => text.split(/<script>/).join("").split(/<\/script>/).join("")
    }
});
