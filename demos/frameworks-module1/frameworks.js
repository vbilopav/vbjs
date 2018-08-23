define([], () => class {

    async render() {
        let result = String.html`
            <div class="container-fluid">
                <p class="text-center">
                    <h2>JavaScript application frameworks</h2>
                </p>
            `;
        
        for(let [name, item] of Object.entries(await(await fetch("../shared/frameworks.json")).json())) {
            result += String.html`
                <div class="panel panel-default">
                    <div class="panel-heading">${name}</div>
                    <ul class="list-group">
                `;
            
            for(let [key, value] of Object.entries(item)) {
                result += String.html`
                    <li class="list-group-item">
                        <strong>${key}: </strong>${value}
                    </li>
                `;
            }

            result += String.html`
                    </ul>
                </div>
                `;
        }
        
        return result;
    }

})