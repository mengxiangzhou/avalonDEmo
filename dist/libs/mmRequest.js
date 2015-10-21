define(["avalon","./mmPromise"],function(avalon){function IE(){if(window.VBArray){var e=document.documentMode;return e?e:window.XMLHttpRequest?7:6}return 0}function parseJS(e){var t=eval;if(e=e.trim())if(1===e.indexOf("use strict")){var r=document.createElement("script");r.text=e,head.appendChild(r).parentNode.removeChild(r)}else t(e)}function parseXML(e,t,r){try{var a=document.documentMode;window.DOMParser&&(!a||a>8)?(r=new DOMParser,t=r.parseFromString(e,"text/xml")):(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e))}catch(n){t=void 0}return t&&t.documentElement&&!t.getElementsByTagName("parsererror").length||avalon.error("Invalid XML: "+e),t}function ajaxExtend(e){e=avalon.mix({},defaults,e),e.type=e.type.toUpperCase();var t="string"==typeof e.data?e.data:avalon.param(e.data);if(e.querystring=t||"",e.url=e.url.replace(rhash,"").replace(rprotocol,location.protocol+"//"),"boolean"!=typeof e.crossDomain){var r=document.createElement("a");try{r.href=e.url;var a="1"[0]?r.href:r.getAttribute("href",4);r.href=a,e.crossDomain=originAnchor.protocol+"//"+originAnchor.host!=r.protocol+"//"+r.host}catch(n){e.crossDomain=!0}}return e.hasContent=!rnoContent.test(e.type),e.hasContent||(t&&(e.url+=(rquery.test(e.url)?"&":"?")+t),e.cache===!1&&(e.url+=(rquery.test(e.url)?"&":"?")+"_time="+(new Date-0))),e}function ok(e){return e}function ng(e){throw e}function paramInner(e,t,r){var a;if(Array.isArray(t))avalon.each(t,function(t,a){paramInner(e+"["+("object"==typeof a?t:"")+"]",a,r)});else if(avalon.isPlainObject(t))for(a in t)paramInner(e+"["+a+"]",t[a],r);else r(e,t)}function trimLine(e){return e.replace(rline,"\r\n")}var global=this||(0,eval)("this"),DOC=global.document,encode=encodeURIComponent,decode=decodeURIComponent,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rhash=/#.*$/,rquery=/\?/,rjsonp=/(=)\?(?=&|$)|\?\?/,r20=/%20/g,originAnchor=document.createElement("a");originAnchor.href=location.href;var accepts={xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",script:"text/javascript, application/javascript","*":["*/"]+["*"]},useOnload=0===IE()||IE()>8;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.lastIndexOf(e,t)===t});var head=DOC.getElementsByTagName("head")[0],isLocal=!1;try{isLocal=rlocalProtocol.test(location.protocol)}catch(e){}!new function(){var s=["XMLHttpRequest","ActiveXObject('MSXML2.XMLHTTP.6.0')","ActiveXObject('MSXML2.XMLHTTP.3.0')","ActiveXObject('MSXML2.XMLHTTP')","ActiveXObject('Microsoft.XMLHTTP')"];s[0]=IE()<8&&0!==IE()&&isLocal?"!":s[0];for(var i=0,axo;axo=s[i++];)try{if(eval("new "+axo)){avalon.xhr=new Function("return new "+axo);break}}catch(e){}};var supportCors="withCredentials"in avalon.xhr(),defaults={type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:!0,jsonp:"callback"},XHRMethods={setRequestHeader:function(e,t){return this.requestHeaders[e]=t,this},getAllResponseHeaders:function(){return 4===this.readyState?this.responseHeadersString:null},getResponseHeader:function(e,t){if(4===this.readyState){for(;t=rheaders.exec(this.responseHeadersString);)this.responseHeaders[t[1]]=t[2];t=this.responseHeaders[e]}return void 0===t?null:t},overrideMimeType:function(e){return this.mimeType=e,this},abort:function(e){return e=e||"abort",this.transport&&this.respond(0,e),this},dispatch:function(e,t){var r=t;if(this.transport){this.readyState=4;var a=e>=200&&300>e||304===e;if(a)if(204===e)r="nocontent";else if(304===e)r="notmodified";else if("undefined"==typeof this.response){var n=this.options.dataType||this.options.mimeType;(!n&&this.responseText||this.responseXML)&&(n=this.getResponseHeader("Content-Type")||"",n=n.match(/json|xml|script|html/)||["text"],n=n[0]);var o=this.responseText||"",s=this.responseXML||"";try{this.response=avalon.ajaxConverters[n].call(this,o,s)}catch(i){a=!1,this.error=i,r="parsererror"}}this.status=e,this.statusText=r+"",this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID),this._transport=this.transport,a?this._resolve([this.response,r,this]):this._reject([this,r,this.error]),delete this.transport}}};avalon.ajax=function(e,t){e&&e.url||avalon.error("参数必须为Object并且拥有url属性"),e=ajaxExtend(e);var r,a,n={responseHeadersString:"",responseHeaders:{},requestHeaders:{},querystring:e.querystring,readyState:0,uniqueID:(""+Math.random()).replace(/0\./,""),status:0},t=new avalon.Promise(function(e,t){a=e,r=t});t.options=e,t._reject=r,t._resolve=a;var o=[],s=[];Array("done","fail","always").forEach(function(e){t[e]=function(t){return"function"==typeof t&&("fail"!==e&&o.push(t),"done"!==e&&s.push(t)),this}});var i=e.async===!1;i&&(avalon.log("warnning:与jquery1.8一样,async:false这配置已经被废弃"),t.async=!1),avalon.mix(t,n,XHRMethods),t.then(function(e){e=Array.isArray(e)?e:void 0===e?[]:[e];for(var r,a=0;r=o[a++];)r.apply(t,e);return e},function(e){e=Array.isArray(e)?e:void 0===e?[]:[e];for(var r,a=0;r=s[a++];)r.apply(t,e);return e}),t.done(e.success).fail(e.error).always(e.complete);var c=e.dataType,l=avalon.ajaxTransports;(e.crossDomain&&!supportCors||rjsonp.test(e.url))&&"json"===c&&"GET"===e.type&&(c=e.dataType="jsonp");var p=e.form?"upload":c,u=l[p]||l.xhr;avalon.mix(t,u),t.preproccess&&(c=t.preproccess()||c),e.contentType&&t.setRequestHeader("Content-Type",e.contentType),t.setRequestHeader("Accept",accepts[c]?accepts[c]+", */*; q=0.01":accepts["*"]);for(var d in e.headers)t.setRequestHeader(d,e.headers[d]);return e.async&&e.timeout>0&&(t.timeoutID=setTimeout(function(){t.abort("timeout"),t.dispatch(0,"timeout")},e.timeout)),t.request(),t},"get,post".replace(avalon.rword,function(e){avalon[e]=function(t,r,a,n){return"function"==typeof r&&(n=n||a,a=r,r=void 0),avalon.ajax({type:e,url:t,data:r,success:a,dataType:n})}}),avalon.getScript=function(e,t){return avalon.get(e,null,t,"script")},avalon.getJSON=function(e,t,r){return avalon.get(e,t,r,"json")},avalon.upload=function(e,t,r,a,n){return"function"==typeof r&&(n=a,a=r,r=void 0),avalon.ajax({url:e,type:"post",dataType:n,form:t,data:r,success:a})},avalon.ajaxConverters={text:function(e){return e},xml:function(e,t){return void 0!==t?t:parseXML(e)},html:function(e){return avalon.parseHTML(e)},json:function(e){return avalon.parseJSON||avalon.log("avalon.parseJSON不存在,请升级到最新版"),avalon.parseJSON(e)},script:function(e){return parseJS(e),e},jsonp:function(){var e,t;return this.jsonpCallback.startsWith("avalon.")?(t=this.jsonpCallback.replace(/avalon\./,""),e=avalon[t],delete avalon[t]):e=window[this.jsonpCallback],e}},avalon.param=function(e){var t,r=[],a=function(e,t){t=null==t?"":t,r[r.length]=encode(e)+"="+encode(t)};if(Array.isArray(e)||!avalon.isPlainObject(e))avalon.each(e,function(e,t){a(e,t)});else for(t in e)paramInner(t,e[t],a);return r.join("&").replace(r20,"+")},avalon.unparam=function(e){var t,r,a=/\[(.*?)\]/g,n=/(.+?)\[/,o={};return"string"!=(r=avalon.type(e))||"string"==r&&!r.length?{}:(-1!==e.indexOf("?")&&(e=e.split("?").pop()),t=decode(e).split("&"),!(r=t.length)||1==r&&""===r?o:(t.forEach(function(e){if(e.length){r=e.split("=");var t,s,i=r.shift(),c=r.join("=").replace(/\+/g," "),l=[];if(i.length){for(;r=a.exec(i);)l.push(r[1]);if(!(t=l.length))return void(o[i]=c);t--,r=n.exec(i),r&&(i=r[1])&&i.length&&("object"!==avalon.type(o[i])&&(o[i]={}),s=o[i],avalon.each(l,function(e,a){(r=a).length||(r=0,avalon.each(s,function(e){!isNaN(e)&&e>=0&&e%1===0&&e>=r&&(r=Number(e)+1)})),e==t?s[r]=c:s="object"!==avalon.type(s[r])?s[r]={}:s[r]}))}}}),o))};var rinput=/select|input|button|textarea/i,rcheckbox=/radio|checkbox/,rline=/\r?\n/g;avalon.serialize=function(e){var t={};return Array.prototype.filter.call(e.getElementsByTagName("*"),function(e){return rinput.test(e.nodeName)&&e.name&&!e.disabled?rcheckbox.test(e.type)?e.checked:!0:void 0}).forEach(function(e){var r=avalon(e).val();r=Array.isArray(r)?r.map(trimLine):trimLine(r);var a=e.name;a in t?Array.isArray(r)?t[a].push(r):t[a]=[t[a],r]:t[a]=r}),avalon.param(t,!1)};var transports=avalon.ajaxTransports={xhr:{request:function(){var e=this,t=this.options,r=this.transport=new avalon.xhr;r.open(t.type,t.url,t.async,t.username,t.password),this.mimeType&&r.overrideMimeType&&r.overrideMimeType(this.mimeType),t.crossDomain&&"withCredentials"in r&&(r.withCredentials=!0),t.crossDomain||(this.requestHeaders["X-Requested-With"]="XMLHttpRequest");for(var a in this.requestHeaders)r.setRequestHeader(a,this.requestHeaders[a]+"");if(t.progressCallback){var n=document.all&&!window.atob;n||(r.upload.onprogress=t.progressCallback)}var o=t.dataType;"responseType"in r&&/^(blob|arraybuffer|text)$/.test(o)&&(r.responseType=o,this.useResponseType=!0),r.send(t.hasContent&&(this.formdata||this.querystring)||null),t.async&&4!==r.readyState?useOnload?r.onload=r.onerror=function(t){this.readyState=4,this.status="load"===t.type?200:500,e.respond()}:r.onreadystatechange=function(){e.respond()}:this.respond()},respond:function(e,t){var r=this.transport;if(r){t&&this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID);try{var a=4===r.readyState;if(t||a)if(r.onreadystatechange=avalon.noop,useOnload&&(r.onerror=r.onload=null),t)a||"function"!=typeof r.abort||r.abort();else{var n=r.status,o=r.responseText;this.responseText="string"==typeof o?o:void 0;try{var s=r.responseXML;this.responseXML=s.documentElement}catch(i){}this.useResponseType&&(this.response=r.response),this.responseHeadersString=r.getAllResponseHeaders();try{var c=r.statusText}catch(i){this.error=i,c="firefoxAccessError"}n||!isLocal||this.options.crossDomain?1223===n&&(n=204):n=this.responseText?200:404,this.dispatch(n,c)}}catch(l){t||this.dispatch(500,l)}}}},jsonp:{preproccess:function(){var e=this.options,t=this.jsonpCallback=e.jsonpCallback||"avalon.jsonp"+setTimeout("1");return rjsonp.test(e.url)?e.url=e.url.replace(rjsonp,"$1"+t):e.url=e.url+(rquery.test(e.url)?"&":"?")+e.jsonp+"="+t,t.startsWith("avalon.")?(t=t.replace(/avalon\./,""),avalon[t]=function(e){avalon[t]=e}):window[t]=function(e){window[t]=e},"script"}},script:{request:function(){var e=this.options,t=this.transport=DOC.createElement("script");e.charset&&(t.charset=e.charset);var r=this;t.onerror=t[useOnload?"onload":"onreadystatechange"]=function(){r.respond()},t.src=e.url,head.insertBefore(t,head.firstChild)},respond:function(e,t){var r=this.transport;if(r){t&&this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID);var a=/loaded|complete|undefined/i.test(r.readyState);if(t||a){r.onerror=r.onload=r.onreadystatechange=null;var n=r.parentNode;if(n&&n.removeChild(r),!t){var o;if(this.jsonpCallback){var s=this.jsonpCallback.startsWith("avalon.")?avalon[this.jsonpCallback.replace(/avalon\./,"")]:window[this.jsonpCallback];o="function"==typeof s?[500,"error"]:[200,"success"]}else o=[200,"success"];this.dispatch.apply(this,o)}}}}},upload:{preproccess:function(){var e,t=this.options;"function"==typeof t.form.append?(e=t.form,t.contentType=""):e=new FormData(t.form),avalon.each(t.data,function(t,r){e.append(t,r)}),this.formdata=e}}};if(avalon.mix(transports.jsonp,transports.script),avalon.mix(transports.upload,transports.xhr),!window.FormData){var str='Function BinaryToArray(binary)\r\n                 Dim oDic\r\n                 Set oDic = CreateObject("scripting.dictionary")\r\n                 length = LenB(binary) - 1\r\n                 For i = 1 To length\r\n                     oDic.add i, AscB(MidB(binary, i, 1))\r\n                 Next\r\n                 BinaryToArray = oDic.Items\r\n              End Function';execScript(str,"VBScript"),avalon.fixAjax=function(){function e(e){var t=avalon.parseHTML("<iframe  id='"+e+"' name='"+e+"' style='position:absolute;left:-9999px;top:-9999px;'/>").firstChild;return(DOC.body||DOC.documentElement).insertBefore(t,null)}function t(e,t){var r,a,n,o,s,i=[];for(r in t)for(a=Array.isArray(t[r]),n=a?t[r]:[t[r]],o=0;o<n.length;o++)s=DOC.createElement("input"),s.type="hidden",s.name=r,s.value=n[o],e.appendChild(s),i.push(s);return i}avalon.ajaxConverters.arraybuffer=function(){var e=this.tranport&&this.tranport.responseBody;return e?new VBArray(BinaryToArray(e)).toArray():void 0},avalon.ajaxTransports.upload={request:function(){var r=this,a=this.options,n="iframe-upload-"+this.uniqueID,o=a.form,s=this.transport=e(n),i={target:o.target||"",action:o.action||"",enctype:o.enctype,method:o.method},c=a.data?t(o,a.data):[];o.target=n,o.action=a.url,o.method="POST",o.enctype="multipart/form-data",this.uploadcallback=avalon.bind(s,"load",function(e){r.respond(e)}),o.submit();for(var l in i)o[l]=i[l];c.forEach(function(e){o.removeChild(e)})},respond:function(e){var t,r=this.transport;if(r){if(e&&"load"===e.type){var a=r.contentWindow.document;this.responseXML=a,a.body&&(this.responseText=a.body.innerHTML,(t=a.body.firstChild)&&"PRE"===t.nodeName.toUpperCase()&&t.firstChild&&(this.responseText=t.firstChild.nodeValue)),this.dispatch(200,"success")}this.uploadcallback=avalon.unbind(r,"load",this.uploadcallback),delete this.uploadcallback,setTimeout(function(){r.parentNode.removeChild(r)})}}},delete avalon.fixAjax},avalon.fixAjax()}return avalon});