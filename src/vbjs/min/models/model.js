define([],()=>(class{constructor({model:t,oncreate:e=(()=>{})}={}){this._model=t,this._oncreate=e||(()=>{}),this._instance=void 0,this._names=[],this._oncreate=e}bind(t,e){return this._instance=e||Object.assign({},this),this._model?t.forEachChild(t=>this._forEachProgrammatic(t)):t.forEachChild(t=>this._forEachDeclarative(t)),this}each(t){for(let e of this._names)t(this[e],e)}_forEachDeclarative(t){this._assignProps(t.name||t.id,t)}_forEachProgrammatic(t){const e=this._model;for(let s in e){if(!e.hasOwnProperty(s))continue;const i=e[s];"string"==typeof i?i!==t.name&&i!==t.id||this._assignProps(s,t):i(t)&&this._assignProps(s,t)}}_assignEvents(t){const e=t.attributes;for(let s=0,i=e.length;s<i;s++){const i=e[s],n=i.name;if(!n.startsWith("on"))continue;const a=this._instance[i.value.toCamelCase()];if("function"!=typeof a)continue;t.removeAttribute(n);const o=this._instance;t.on(n.replace("on","").toLowerCase(),function(){a.call(o)})}}_assignValue(t,e,s){"SELECT"===t||"INPUT"===t?"INPUT"===t&&"checkbox"===e.type?e.checked=s:e.value=s:(e.html(s),"A"===t&&(e.href=s))}_getValue(t,e){return"SELECT"===t?e.options[e.selectedIndex]:e}_assignProps(t,e){if(this._assignEvents(e),!t)return!1;-1!==t.indexOf("-")&&(t=t.toCamelCase());const s=e.nodeName,i=this;Object.defineProperty(this,t,{get:()=>i._getValue(s,e),set:t=>i._assignValue(s,e,t)}),this._names.push(t),this._oncreate(e);const n=this._instance[t];return void 0===n||(this._assignValue(s,e,n),!0)}}));