define([], () => {

    _app.customElements.define({tag: "todo-item", src: "todo-module-components/todo-item"});

    return class {

        constructor({options}) {
            options.context = this;
            options.css = ["todo-module-components/todo.css", "todo-module-components/todo-item.css"];
            options.watch();

            this.value = "initial";
            this.count = 0;
        }

        async render() {
            let index = 0;
            let result = String.html`
                <div class="ToDo">
                    <h1 class="ToDo-Header">VB SPA template To Do</h1>
                    <div class="ToDo-Container">
                        <div class="ToDo-Content" id="content">`;
            
            for(let item of await _app.fetch("../shared/todo.json")) {
                result += String.html`
                    <todo-item id="${'todo-item-' + index}" data-index="${index = index+1}">${item}</todo-item>
                `;
            }
            result += String.html`
                        </div>
                        <input type="text" id="input" value="${this.value}" />
                        <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
                    </div>
                </div>`;
            this.count = index;
            return result;
        }

        rendered() {
            // Only rendered components that have name or id attribute will ba available in children property
            console.log("I haz following components: ");
            console.log(this.children);
            console.log();
        }

        createNewToDoItem() {
            this.model.content.insertAdjacentHTML(
                "beforeend",
                `<todo-item data-index="${++this.count}">${this.model.input.value}</todo-item>`
            )
        }
    }

});