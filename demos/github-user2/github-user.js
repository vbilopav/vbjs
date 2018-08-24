define([], () => class {

    constructor() {
        this.username = "vbilopav"; // default value for the model element username
        this.model = new _vbjs.Model();
    }

    render() {
        return String.html`
            <div class="container-fluid">
                <h3>Github user data</h3>
                <input type="text" name="username">
                <button name="show" onclick="showClick">Show github user data</button>
            </div>`;
    }

    rendered({element}) {
        this.model.bind(element, this);
    }

    showClick() {
        window.location = "#/github-user-info/" + this.model.username.value;
    }

});
