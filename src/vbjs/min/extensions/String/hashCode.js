define(["sys/models/test-proto"],t=>{t(String,["hashCode"]),String.prototype.hashCode=function(){let t=0;for(let e=0,o=this.length;e<o;e++){t=(t<<5)-t+this.charCodeAt(e),t&=t}return t}});