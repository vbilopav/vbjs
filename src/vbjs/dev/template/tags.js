define(["sys/app"], app => {

    return {
        parse: text => {
            if (!app.settings.stripScriptTagsInTemplates) {
                return text;
            }
            if (text.indexOf("<s") === -1) {
                return text;
            }
            return text.split(/<script>/).join("").split(/<\/script>/).join("");
        }
    }
});