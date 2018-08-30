define([], () => class {

    constructor({options}) {
        options.context = this;
    }

    render({params}) {
        let {dataIndex, html}=params;
        return String.html`
            <div class="ToDoItem" id="item">
                <p class="ToDoItem-Text">${dataIndex + ". " + html}</p>
                <div class="ToDoItem-Delete" onclick="deleteClick">-</div>
            </div>`
    }

    deleteClick() {
        this.parent.count--;
        this.model.item.remove();
    }

    set id(value) {
        console.log("id atrribute set to " + value);
    } 

    set dataIndex(value) {
        console.log("data-index atrribute set to " + value);
    } 
})