define(["sys/view-manager/components"],({getTags:e})=>{const t={template:1,class:2,string:3};return{getId:e=>"_view-"+e,types:t,getViewType:(e,n)=>{let o=typeof e;if("function"===o)return(e=>-1!==e.indexOf("template!")||-1!==e.indexOf("document!"))(n)?t.template:t.class;if("string"===o)return t.string;throw new Error("unknown view type "+e)},showView:e=>{window.scrollTo(e.x,e.y)},templateRendered:(e,t)=>{void 0===e.template.context&&(e.template.context=e),(e.template.context||e.template.model)&&(e.template.model=new _app.Model(e.template.model).bind(t,e.template.context)),!e.template.rendered||e.template.rendered(t)},moduleRendered:(e,t,n=!0)=>{void 0===e._options.context&&(e._options.context=e),e._options.model instanceof _app.Model==0&&(e._options.context||e._options.model)&&(e.model=new _app.Model(e._options.model).bind(t.element,e._options.context)),n?!e.rendered||e.rendered({params:t.params,element:t.element}):e.changed?e.changed({params:t.params,element:t.element}):e.rendered&&e.rendered({params:t.params,element:t.element})}}});