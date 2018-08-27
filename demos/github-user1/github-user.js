define([], () => class {

    constructor() {
        this.username = "vbilopav"; // default value for the model element username
        this.context = this; // when context object is available, model will be automatically binded and assigned to instance
    }

    render() {
        return String.html`
            <div class="container-fluid">
                <h3>Github user data</h3>
                <input type="text" name="username">
                <button name="show" onclick="showClick">Show github user data</button>
            </div>`;
    }

    showClick() {
        window.location = "#/github-user-info/" + this.model.username.value;
    }

});
