define(["module"],()=>({version:"1.0.0",load(e,o,t){fetch(o.toUrl(e),{mode:"cors"}).then(e=>e.text()).then(e=>t(e))}}));