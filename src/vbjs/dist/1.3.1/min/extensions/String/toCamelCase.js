define(["sys/models/test-proto"],e=>{e(String,["toCamelCase"]),String.prototype.toCamelCase=function(){return this.replace(/-([a-z,0-9])/g,e=>e[1].toUpperCase())}});