!function(){const defaults={version:"",appUrl:"app",cssUrl:"css",libsUrl:"libs",appModule:"sys/single-view-app",appElementId:"app",appObjectName:"_vbjs"},scr=document.currentScript,dev=null===scr.getAttribute("data-dev")||eval(scr.getAttribute("data-dev")),version=null===scr.getAttribute("data-version")?defaults.version:scr.getAttribute("data-version"),appUrl=null===scr.getAttribute("data-app-url")?defaults.appUrl:scr.getAttribute("data-app-url"),cssUrl=null===scr.getAttribute("data-css-url")?defaults.cssUrl:scr.getAttribute("data-css-url"),libsUrl=null===scr.getAttribute("data-libs-url")?defaults.libsUrl:scr.getAttribute("data-libs-url"),sysUrl=scr.getAttribute("src").replace("index.js",""),appModule=null===scr.getAttribute("data-app-module")?defaults.appModule:scr.getAttribute("data-app-module"),viewModule=scr.getAttribute("data-view-module"),appElementId=scr.getAttribute("data-app-container-id")||defaults.appElementId,appObjectName=scr.getAttribute("data-app-object-name")||defaults.appObjectName,settings=eval("("+scr.getAttribute("data-settings")+")")||{usePreloadedTemplates:!1},cssFilesattrValue=scr.getAttribute("data-css-files");window[appObjectName]={dev:dev,version:version,appUrl:appUrl,cssUrl:cssUrl,libsUrl:libsUrl,sysUrl:sysUrl,settings:settings,config:{module:appModule,view:viewModule,elementId:appElementId}};const relative=function(e,t){e="/"===e[0]||"."===e[0]?e:"/"+e,t="/"===t[0]||"."===t[0]?t:"/"+t;const s=e.toLowerCase(),r=t.toLowerCase(),a=t.split("/"),l=s.split("/"),i=r.split("/");length=Math.min(l.length,i.length),samePartsLength=length;for(var n=0;n<length;n++)if(l[n]!==i[n]){samePartsLength=n;break}if(0==samePartsLength)return t;var p=[];for(n=samePartsLength;n<l.length;n++)p.push("..");return(p=p.concat(a.slice(samePartsLength))).join("/")},sysPath=relative(appUrl,sysUrl),libsPath=relative(appUrl,libsUrl);window.require={baseUrl:window[appObjectName].appUrl},window[appObjectName].version&&(window.require.urlArgs="v="+window[appObjectName].version);const cssFiles=null!==cssFilesattrValue?eval("["+cssFilesattrValue+"]"):[];if(cssFiles.length)for(let e=0,t=cssFiles.length;e<t;e++){let t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=cssUrl+"/"+cssFiles[e]+(version?"?"+require.urlArgs:""),t.media="all",document.head.appendChild(t)}const loadLoader=(e,t)=>{let s=document.createElement("script");s.async=!0,s.src=e,s.setAttribute("data-main",sysPath+"/main.js"),document.body.appendChild(s),s.onload=t,s.onerror=t},configure=()=>{window.requirejs.config({__appObjName:appObjectName,paths:{libs:libsPath,text:["https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min","libs/text"],sys:sysPath,template:sysPath+"/require-plugins/template",composite:sysPath+"/require-plugins/composite","cors-text":sysPath+"/require-plugins/cors-text","cors-template":sysPath+"/require-plugins/cors-template","extension-Element":sysPath+"/extensions/HTMLElement","extension-String":sysPath+"/extensions/String",extension:sysPath+"/require-plugins/extension"}})};loadLoader("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js",()=>{window.requirejs?configure():loadLoader(libsUrl+"/require.js",configure)})}();