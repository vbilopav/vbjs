define(["sys/view-manager/utils","sys/app","sys/view-manager/components"],(e,t,{getEntry:n,getTags:a})=>{const r=(e,t,a)=>{if(!t.includes(e.nodeName))return;const r=n(e.nodeName);if(!r)return;found=!0;const s={},i=r.wrap.createElement();for(let t=0,n=e.attributes.length;t<n;t++){let n=e.attributes[t];s[n.name.toCamelCase()]=n.value,i.setAttribute(n.name,n.value)}if(s.html=e.html(),e.parentElement.insertBefore(i,e),e.remove(),a){s.___extra=Object.assign(s.___extra||{},{parent:a});let e=s.name||s.id;e&&((a=a.template||a).children=a.children||{},a.children[e.toCamelCase()]=s)}return new MutationObserver(e=>{for(let t of e){if(!t.attributeName)continue;const e=t.attributeName.toCamelCase(),n=t.target.getAttribute(t.attributeName);s.template&&(!s.template[e]||s.template[e](n)),s.__parent&&(s.__parent[e]=n)}}).observe(i,{attributes:!0,childList:!1,subtree:!1}),{view:r.src,elementOrId:i,params:s}},s=(e,t,n)=>{let a=t.components;if(!a||!a.length)return;const s=[];e.forEachChild(e=>{let t=r(e,a,n);t&&s.push(t)});const o=new MutationObserver(e=>{for(let t of e)if(t.addedNodes&&t.addedNodes.length)for(let e of t.addedNodes){let t=r(e,a,n);o.takeRecords(),t&&i(t)}}),l={attributes:!1,childList:!0,subtree:!0};return s.length?Promise.all(s.map(e=>i(e))).then(t=>{o.observe(e,l)}):o.observe(e,l),o},i=({id:n="",view:r=(()=>{throw r})(),params:i={},uri:o="",elementOrId:l=(()=>{throw l})()})=>new Promise(p=>{let m,c;if("string"==typeof r?(m=r,c=[r]):"object"==typeof r&&(m=r.name,c=r.inject?[m].concat(r.inject):[m]),!m||!c)throw new Error("View definition incorrect!");require(c,(r,...c)=>{const d=o.hashCode(),f=e.getViewType(r,m),h="string"==typeof l?"span".createElement(l):l,u={type:f,uriHash:d,x:0,y:0,id:n};n&&(h.dataset.id=n);const _=()=>{const n=n=>{"function"==typeof n||n instanceof Array?(n=t.parse(...n)).then(e=>{"string"==typeof e?h.html(e):h.html("").appendChild(e)}):("string"==typeof n||n instanceof HTMLElement)&&("string"==typeof n?h.html(n):h.html("").appendChild(n)),s(h,u.instance._options,u.instance),e.moduleRendered(u.instance,{params:i,element:h})};if(f===e.types.class){let e=u.instance.render({params:i,element:h});return("function"==typeof e||e instanceof Array)&&(e="function"==typeof e?t.parse(e):t.parse(...e)),e instanceof Promise?e.then(e=>(n(e),p({data:u,element:h}))):(n(e),p({data:u,element:h}))}return p({data:u,element:h})};if(f===e.types.string)return u.element=h.html(r),_();if(f===e.types.template){u.instance=r,i.___extra=Object.assign(i.___extra||{},{components:null,watch:(...e)=>{e&&e.length||(e=a()),i.template.components=e.map(e=>e.toUpperCase())}});const t=r(i,{injected:c});return"string"==typeof t?(h.html(t),s(h,i.template,i),e.templateRendered(i,h)):t instanceof HTMLElement?(h.html("").appendChild(t),s(h,i.template,i),e.templateRendered(i,h)):t instanceof Promise&&t.then(t=>{"string"==typeof t?h.html(t):h.html("").appendChild(t),s(h,i.template,i),e.templateRendered(i,h)}),_()}if(f===e.types.class){const e={disableCaching:!1,callRenderOnlyOnce:!1,css:[],components:null,watch:(...t)=>{t&&t.length||(t=a()),e.components=t.map(e=>e.toUpperCase())}};if(u.instance=new r({id:n,element:h,options:e},...c),u.instance._options=e,i.__parent=u.instance,i.___extra){for(let[e,t]of Object.entries(i.___extra))u.instance[e]=t;delete i.___extra}if(!e.css||!e.css.length)return _();require(e.css.map(e=>e.startsWith("text!")?e:"text!"+e),(...e)=>(document.head.appendChild(`<style type="text/css">\n                                    ${e.join("")}\n                                </style>`.toHTML()),_()))}})});return{reveal:i,revealComponents:s}});