define(["sys/models/test-proto","extension-String/toCamelCase"],s=>{s(HTMLElement,["css","_styles"]),HTMLElement.prototype.css=function(s,t){if(!this._styles){this._styles={};const s=window.getComputedStyle(this);for(let t in s)if(s.hasOwnProperty(t)){if(!isNaN(t))continue;this._styles[t]=s[t]}}if(void 0!==t)return this._styles[s]=t,this.style[s]=t,this;const e=this._styles[s];return void 0===e?this._styles[s.toCamelCase()]:e}});