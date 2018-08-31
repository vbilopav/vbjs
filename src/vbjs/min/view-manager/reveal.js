define(["sys/view-manager/utils","sys/app","sys/view-manager/components"],(e,t,{getEntry:n,getTags:a})=>{const s=(e,t,a)=>{if(!t.includes(e.nodeName))return;const s=n(e.nodeName);if(!s)return;found=!0;const r={},i=s.wrap.createElement();for(let t=0,n=e.attributes.length;t<n;t++){let n=e.attributes[t];r[n.name.toCamelCase()]=n.value,i.setAttribute(n.name,n.value)}if(r.html=e.html(),e.parentElement.insertBefore(i,e),e.remove(),a){r.___extra=Object.assign(r.___extra||{},{parent:a});let e=r.name||r.id;e&&((a=a.template||a).children=a.children||{},a.children[e.toCamelCase()]=r)}return new MutationObserver(e=>{for(let t of e){if(!t.attributeName)continue;const e=t.attributeName.toCamelCase(),n=t.target.getAttribute(t.attributeName);r.template&&(!r.template[e]||r.template[e](n)),r.__instance&&(r.__instance[e]=n)}}).observe(i,{attributes:!0,childList:!1,subtree:!1}),{view:s.src,elementOrId:i,params:r}},r=(e,t,n)=>{let a=t.components;if(!a||!a.length)return;const r=[];e.forEachChild(e=>{let t=s(e,a,n);t&&r.push(t)});const o=new MutationObserver(e=>{for(let t of e)if(t.addedNodes&&t.addedNodes.length)for(let e of t.addedNodes){let t=s(e,a,n);o.takeRecords(),t&&i(t)}}),l={attributes:!1,childList:!0,subtree:!0};return r.length?Promise.all(r.map(e=>i(e))).then(t=>{o.observe(e,l)}):o.observe(e,l),o},i=({id:n="",view:s=(()=>{throw s})(),params:i={},uri:o="",elementOrId:l=(()=>{throw l})()})=>new Promise(c=>{let m,p;if("string"==typeof s?(m=s,p=[s]):"object"==typeof s&&(m=s.name,p=s.inject?[m].concat(s.inject):[m]),!m||!p)throw new Error("View definition incorrect!");require(p,(s,...p)=>{const d=o.hashCode(),f=e.getViewType(s,m),u="string"==typeof l?"span".createElement(l):l,h={type:f,uriHash:d,x:0,y:0,id:n};n&&(u.dataset.id=n);const _=()=>{const n=n=>{"function"==typeof n||n instanceof Array?(n=t.parse(...n)).then(t=>{"string"==typeof t?u.html(t):u.html("").append(t),r(u,h.instance._options,h.instance),e.moduleRendered(h.instance,{params:i,element:u})}):("string"==typeof n||n instanceof HTMLElement)&&("string"==typeof n?u.html(n):u.html("").append(n),r(u,h.instance._options,h.instance),e.moduleRendered(h.instance,{params:i,element:u}))};if(f===e.types.class){let e=h.instance.render({params:i,element:u});return("function"==typeof e||e instanceof Array)&&(e="function"==typeof e?t.parse(e):t.parse(...e)),e instanceof Promise?e.then(e=>(n(e),c({data:h,element:u}))):(n(e),c({data:h,element:u}))}return c({data:h,element:u})};if(f===e.types.string)return h.element=u.html(s),_();if(f===e.types.template){h.instance=s,i.___extra=Object.assign(i.___extra||{},{components:null,watch:(...e)=>{e&&e.length||(e=a()),i.template.components=e.map(e=>e.toUpperCase())}});const t=s(i,{injected:p});return"string"==typeof t?(u.html(t),r(u,i.template,i),e.templateRendered(i,u)):t instanceof HTMLElement?(u.html("").append(t),r(u,i.template,i),e.templateRendered(i,u)):t instanceof Promise&&t.then(t=>{"string"==typeof t?u.html(t):u.html("").append(t),r(u,i.template,i),e.templateRendered(i,u)}),_()}if(f===e.types.class){const e={disableCaching:!1,callRenderOnlyOnce:!1,css:[],components:null,watch:(...t)=>{t&&t.length||(t=a()),e.components=t.map(e=>e.toUpperCase())}};if(h.instance=new s({id:n,element:u,options:e},...p),h.instance._options=e,i.__instance=h.instance,i.___extra){for(let[e,t]of Object.entries(i.___extra))h.instance[e]=t;delete i.___extra}if(!e.css||!e.css.length)return _();require(e.css.map(e=>e.startsWith("text!")?e:"text!"+e),(...e)=>(document.head.appendChild(`<style type="text/css">\n                                    ${e.join("")}\n                                </style>`.toHTML()),_()))}})});return{reveal:i,revealComponents:r}});