define(["sys/models/test-proto","sys/extensions/HTMLElement/css"],s=>{s(HTMLElement,["show"]),HTMLElement.prototype.show=function(s){return void 0===s||s?(this.css("display",""),this):this.hide()}});