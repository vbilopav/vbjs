define([],()=>{const r={};return class{constructor(e){if(e.sub||e.pub)throw new Error("pubsub already assigned to object!");e.sub=((t,o)=>{const s=e=>{let t=r[e];t||(t=r[e]=[]),r[e].push(o)};if(t instanceof Array)for(let r of t)s(r);else s(t);return e}),e.pub=((t,...o)=>{const s=t=>{const s=r[t];if(!s)return e;setTimeout(()=>s.forEach(r=>r.apply(e,o)),0)};if(t instanceof Array)for(let r of t)s(r);else s(t);return e})}}});