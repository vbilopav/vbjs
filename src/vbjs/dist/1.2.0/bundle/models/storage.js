define([],()=>{class e{constructor(){this._dict={},this._storage=localStorage}getItem(e){let t=this._dict[e];if(void 0===t){if(null===(t=this._storage.getItem(e)))return null;this._dict[e]=t}return t}setItem(e,t){this._storage.setItem(e,t),this._dict[e]=t}removeItem(e){this._storage.removeItem(e),delete this._dict[e]}}const t=[];var s;class i{constructor({storage:t=new e,namespace:i="",model:r=(()=>{throw"model is required!"})(),conversion:n={}}){if(this._storage=t,!s)throw new Exception("default namespace cannot be empty or null");this._ns=i,this._model=r,this._conversion=n,this._ns&&(this._ns=this._ns+".");for(let[e,t]of Object.entries(r))this.create(e,t)}static setNamespace(e){return e?e+=".":e="",s=e,i}create(e,s){let i=this._getNamespace(e);if(-1!==t.indexOf(i))throw new Exception(`Name "${i}" is already been defined!`);return t.push(i),Object.defineProperty(this,e,{get:()=>{const t=this._storage.getItem(i);if(null===t&&void 0!==s)return s;const r=this._conversion[e];return r?r(t):t},set:e=>{null===e?this._storage.removeItem(i):this._storage.setItem(i,e)}}),this}_getNamespace(e){return this._ns?s+this._ns+e:s+e}}return i});