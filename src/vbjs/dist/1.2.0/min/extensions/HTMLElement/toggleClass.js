define(["sys/models/test-proto"],s=>{s(HTMLElement,["toggleClass"]),HTMLElement.prototype.toggleClass=function(s,t){return void 0!==t?(t?this.addClass(s):this.removeClass(s),this):(this.hasClass(s)?this.removeClass(s):this.addClass(s),this)}});