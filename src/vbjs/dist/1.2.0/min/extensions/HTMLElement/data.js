define(["sys/models/test-proto"],t=>{t(HTMLElement,["data","_data"]),HTMLElement.prototype.data=function(t,a){return this._data||(this._data=Object.assign({},this.dataset)),void 0!==a?(this._data[t]=a,this):this._data[t]}});