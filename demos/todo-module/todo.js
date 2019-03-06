define(["todo-module/todo-item"], Item => class {

    constructor() {
        this.item = new Item();
        this.value = "initial";
        this.model = new _app.Model();
    }

    render() {
        return [() => String.html`
            ${this.template.css.import("../shared/css/todo.css", "../shared/css/todo-item.css")}
            <div class="ToDo">
                <h1 class="ToDo-Header">VBJS To Do demo</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">
                        ${async () => this.template.forEach(
                            await _app.fetch("../shared/todo.json"), 
                            item => this.item.render({params: item})
                        )}
                    </div>
                    <input type="text" id="input" value="${this.value}" />
                    <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
                </div>
            </div>`, 
            this
        ];
    }

    createNewToDoItem() {
        this.model.content.append(
            this.item.render({params: this.model.input.value}).toHTML()
        )
    }

});