define(["todo-module/components/todo-item"], Item => class {

    constructor() {
        this.item = new Item();
        this.value = "";
        this.model = new _app.Model();
    }

    render() {
        return [() => String.html`
            ${this.template.css.import("todo-module/todo.css", "todo-module/components/todo-item.css")}
            <div class="ToDo">
                <h1 class="ToDo-Header">VB SPA template To Do</h1>
                <div class="ToDo-Container">
                    <div class="ToDo-Content" id="content">
                        ${async () => this.template.forEach(
                            await(await fetch("../shared/todo.json")).json(), item => this.item.render({params: item})
                        )}
                    </div>
                    <input type="text" id="input" value="${this.value}" />
                    <div class="ToDo-Add" onclick="createNewToDoItem">+</div>
                </div>
            </div>`, 
            this
        ];
    }

    rendered({element}) {
        this.model.bind(element, this);
    }

    createNewToDoItem() {
        this.model.content.append(
            this.item.render({params: this.model.input.value}).toHTML()
        )
    }

});