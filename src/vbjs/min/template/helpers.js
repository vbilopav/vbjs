define([],()=>({forEach:(e,t)=>(e instanceof Array?e:Object.entries(e||{})).map((e,i)=>t(...e instanceof Array?e:[e],i)).join(""),import:e=>require(e),css:{import:(...e)=>{document.head.appendChild(`<style type="text/css">\n                        ${e.map(e=>require(e.startsWith("text!")?e:"text!"+e)).join("")}\n                    </style>`.toHTML())}},if:(e,t,i)=>e?t:i}));