!function(t,e){"undefined"!=typeof module?module.exports=e():"function"==typeof define&&"object"==typeof define.amd?define("domReady",e):this[t]=e()}("domready",function(){var t,e=[],n=document,r=n.documentElement.doScroll,i="DOMContentLoaded",o=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return o||n.addEventListener(i,t=function(){for(n.removeEventListener(i,t),o=1;t=e.shift();)t()}),function(t){o?setTimeout(t,0):e.push(t)}}),function(t,e){"use strict";function n(t,e){var n,r;e=e||{},t="raven"+t.substr(0,1).toUpperCase()+t.substr(1),document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t);for(r in e)f(e,r)&&(n[r]=e[r]);if(document.createEvent)document.dispatchEvent(n);else try{document.fireEvent("on"+n.eventType.toLowerCase(),n)}catch(i){}}function r(t){this.name="RavenConfigError",this.message=t}function i(t){var e=Z.exec(t),n={},i=7;try{for(;i--;)n[X[i]]=e[i]||""}catch(o){throw new r("Invalid DSN: "+t)}if(n.pass)throw new r("Do not specify your private key in the DSN!");return n}function o(t){return void 0===t}function u(t){return"function"==typeof t}function s(t){return"[object String]"===z.toString.call(t)}function c(t){return"object"==typeof t&&null!==t}function l(t){for(var e in t)return!1;return!0}function a(t){return c(t)&&"[object Error]"===z.toString.call(t)||t instanceof Error}function f(t,e){return z.hasOwnProperty.call(t,e)}function d(t,e){var n,r;if(o(t.length))for(n in t)f(t,n)&&e.call(null,n,t[n]);else if(r=t.length)for(n=0;r>n;n++)e.call(null,n,t[n])}function h(){q="?sentry_version=4&sentry_client=raven-js/"+J.VERSION+"&sentry_key="+F}function p(t,e){var r=[];t.stack&&t.stack.length&&d(t.stack,function(t,e){var n=m(e);n&&r.push(n)}),n("handle",{stackInfo:t,options:e}),v(t.name,t.message,t.url,t.lineno,r,e)}function m(t){if(t.url){var e,n={filename:t.url,lineno:t.line,colno:t.column,"function":t.func||"?"},r=g(t);if(r){var i=["pre_context","context_line","post_context"];for(e=3;e--;)n[i[e]]=r[e]}return n.in_app=!(!B.includePaths.test(n.filename)||/(Raven|TraceKit)\./.test(n["function"])||/raven\.(min\.)?js$/.test(n.filename)),n}}function g(t){if(t.context&&B.fetchContext){for(var e=t.context,n=~~(e.length/2),r=e.length,i=!1;r--;)if(e[r].length>300){i=!0;break}if(i){if(o(t.column))return;return[[],e[n].substr(t.column,50),[]]}return[e.slice(0,n),e[n],e.slice(n+1)]}}function v(t,e,n,r,i,o){var u,s;e+="",("Error"!==t||e)&&(B.ignoreErrors.test(e)||(i&&i.length?(n=i[0].filename||n,i.reverse(),u={frames:i}):n&&(u={frames:[{filename:n,lineno:r,in_app:!0}]}),e=b(e,B.maxMessageLength),B.ignoreUrls&&B.ignoreUrls.test(n)||(!B.whitelistUrls||B.whitelistUrls.test(n))&&(s=r?e+" at "+r:e,E(y({exception:{type:t,value:e},stacktrace:u,culprit:n,message:s},o)))))}function y(t,e){return e?(d(e,function(e,n){t[e]=n}),t):t}function b(t,e){return t.length<=e?t:t.substr(0,e)+"…"}function x(){return+new Date}function w(){var t={url:document.location.href,headers:{"User-Agent":navigator.userAgent}};return document.referrer&&(t.headers.Referer=document.referrer),t}function E(t){S()&&(t=y({project:U,logger:B.logger,platform:"javascript",request:w()},t),t.tags=y(y({},B.tags),t.tags),t.extra=y(y({},B.extra),t.extra),t.extra=y({"session:duration":x()-D},t.extra),l(t.tags)&&delete t.tags,j&&(t.user=j),B.release&&(t.release=B.release),u(B.dataCallback)&&(t=B.dataCallback(t)||t),t&&!l(t)&&(!u(B.shouldSendCallback)||B.shouldSendCallback(t))&&(L=t.event_id||(t.event_id=T()),C(t)))}function C(t){var e=_(),r=R+q+"&sentry_data="+encodeURIComponent(JSON.stringify(t));e.crossOrigin="anonymous",e.onload=function(){n("success",{data:t,src:r})},e.onerror=e.onabort=function(){n("failure",{data:t,src:r})},e.src=r}function _(){return document.createElement("img")}function S(){return H?R?!0:(A("error","Error: Raven has not been configured."),!1):!1}function k(t){for(var e,n=[],r=0,i=t.length;i>r;r++)e=t[r],s(e)?n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):e&&e.source&&n.push(e.source);return new RegExp(n.join("|"),"i")}function T(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,n="x"==t?e:3&e|8;return n.toString(16)})}function A(e,n){t.console&&console[e]&&J.debug&&console[e](n)}function M(){var e=t.RavenConfig;e&&J.config(e.dsn,e.config).install()}var $={remoteFetching:!1,collectWindowErrors:!0,linesOfContext:7},P=[].slice,N="?";$.wrap=function(t){function e(){try{return t.apply(this,arguments)}catch(e){throw $.report(e),e}}return e},$.report=function(){function n(t){s(),p.push(t)}function r(t){for(var e=p.length-1;e>=0;--e)p[e]===t&&p.splice(e,1)}function i(){c(),p=[]}function o(t,e){var n=null;if(!e||$.collectWindowErrors){for(var r in p)if(f(p,r))try{p[r].apply(null,[t].concat(P.call(arguments,2)))}catch(i){n=i}if(n)throw n}}function u(t,e,n,r,i){var u=null;if(v)$.computeStackTrace.augmentStackTraceWithInitialElement(v,e,n,t),l();else if(i)u=$.computeStackTrace(i),o(u,!0);else{var s={url:e,line:n,column:r};s.func=$.computeStackTrace.guessFunctionName(s.url,s.line),s.context=$.computeStackTrace.gatherContext(s.url,s.line),u={message:t,url:document.location.href,stack:[s]},o(u,!0)}return d?d.apply(this,arguments):!1}function s(){h||(d=t.onerror,t.onerror=u,h=!0)}function c(){h&&(t.onerror=d,h=!1,d=e)}function l(){var t=v,e=m;m=null,v=null,g=null,o.apply(null,[t,!1].concat(e))}function a(e,n){var r=P.call(arguments,1);if(v){if(g===e)return;l()}var i=$.computeStackTrace(e);if(v=i,g=e,m=r,t.setTimeout(function(){g===e&&l()},i.incomplete?2e3:0),n!==!1)throw e}var d,h,p=[],m=null,g=null,v=null;return a.subscribe=n,a.unsubscribe=r,a.uninstall=i,a}(),$.computeStackTrace=function(){function e(e){if(!$.remoteFetching)return"";try{var n=function(){try{return new t.XMLHttpRequest}catch(e){return new t.ActiveXObject("Microsoft.XMLHTTP")}},r=n();return r.open("GET",e,!1),r.send(""),r.responseText}catch(i){return""}}function n(t){if(!s(t))return[];if(!f(x,t)){var n="";-1!==t.indexOf(document.domain)&&(n=e(t)),x[t]=n?n.split("\n"):[]}return x[t]}function r(t,e){var r,i=/function ([^(]*)\(([^)]*)\)/,u=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,s="",c=10,l=n(t);if(!l.length)return N;for(var a=0;c>a;++a)if(s=l[e-a]+s,!o(s)){if(r=u.exec(s))return r[1];if(r=i.exec(s))return r[1]}return N}function i(t,e){var r=n(t);if(!r.length)return null;var i=[],u=Math.floor($.linesOfContext/2),s=u+$.linesOfContext%2,c=Math.max(0,e-u-1),l=Math.min(r.length,e+s-1);e-=1;for(var a=c;l>a;++a)o(r[a])||i.push(r[a]);return i.length>0?i:null}function u(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function c(t){return u(t).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function l(t,e){for(var r,i,o=0,u=e.length;u>o;++o)if((r=n(e[o])).length&&(r=r.join("\n"),i=t.exec(r)))return{url:e[o],line:r.substring(0,i.index).split("\n").length,column:i.index-r.lastIndexOf("\n",i.index)-1};return null}function a(t,e,r){var i,o=n(e),s=new RegExp("\\b"+u(t)+"\\b");return r-=1,o&&o.length>r&&(i=s.exec(o[r]))?i.index:null}function d(e){for(var n,r,i,o,s=[t.location.href],a=document.getElementsByTagName("script"),f=""+e,d=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,h=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,p=0;p<a.length;++p){var m=a[p];m.src&&s.push(m.src)}if(i=d.exec(f)){var g=i[1]?"\\s+"+i[1]:"",v=i[2].split(",").join("\\s*,\\s*");n=u(i[3]).replace(/;$/,";?"),r=new RegExp("function"+g+"\\s*\\(\\s*"+v+"\\s*\\)\\s*{\\s*"+n+"\\s*}")}else r=new RegExp(u(f).replace(/\s+/g,"\\s+"));if(o=l(r,s))return o;if(i=h.exec(f)){var y=i[1];if(n=c(i[2]),r=new RegExp("on"+y+"=[\\'\"]\\s*"+n+"\\s*[\\'\"]","i"),o=l(r,s[0]))return o;if(r=new RegExp(n),o=l(r,s))return o}return null}function h(t){if(!t.stack)return null;for(var e,n,u=/^\s*at (.*?) ?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/i,s=/^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,c=t.stack.split("\n"),l=[],f=/^(.*) is undefined$/.exec(t.message),d=0,h=c.length;h>d;++d){if(e=s.exec(c[d]))n={url:e[3],func:e[1]||N,args:e[2]?e[2].split(","):"",line:+e[4],column:e[5]?+e[5]:null};else{if(!(e=u.exec(c[d])))continue;n={url:e[2],func:e[1]||N,line:+e[3],column:e[4]?+e[4]:null}}!n.func&&n.line&&(n.func=r(n.url,n.line)),n.line&&(n.context=i(n.url,n.line)),l.push(n)}return l.length?(l[0].line&&!l[0].column&&f?l[0].column=a(f[1],l[0].url,l[0].line):l[0].column||o(t.columnNumber)||(l[0].column=t.columnNumber+1),{name:t.name,message:t.message,url:document.location.href,stack:l}):null}function p(t){for(var e,n=t.stacktrace,o=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,u=n.split("\n"),s=[],c=0,l=u.length;l>c;c+=2)if(e=o.exec(u[c])){var a={line:+e[1],column:+e[2],func:e[3]||e[4],args:e[5]?e[5].split(","):[],url:e[6]};if(!a.func&&a.line&&(a.func=r(a.url,a.line)),a.line)try{a.context=i(a.url,a.line)}catch(f){}a.context||(a.context=[u[c+1]]),s.push(a)}return s.length?{name:t.name,message:t.message,url:document.location.href,stack:s}:null}function m(e){var o=e.message.split("\n");if(o.length<4)return null;var u,s,a,d,h=/^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,m=/^\s*Line (\d+) of function script\s*$/i,g=[],v=document.getElementsByTagName("script"),y=[];for(s in v)f(v,s)&&!v[s].src&&y.push(v[s]);for(s=2,a=o.length;a>s;s+=2){var b=null;if(u=h.exec(o[s]))b={url:u[2],func:u[3],line:+u[1]};else if(u=p.exec(o[s])){b={url:u[3],func:u[4]};var x=+u[1],w=y[u[2]-1];if(w&&(d=n(b.url))){d=d.join("\n");var E=d.indexOf(w.innerText);E>=0&&(b.line=x+d.substring(0,E).split("\n").length)}}else if(u=m.exec(o[s])){var C=t.location.href.replace(/#.*$/,""),_=u[1],S=new RegExp(c(o[s+1]));d=l(S,[C]),b={url:C,line:d?d.line:_,func:""}}if(b){b.func||(b.func=r(b.url,b.line));var k=i(b.url,b.line),T=k?k[Math.floor(k.length/2)]:null;k&&T.replace(/^\s*/,"")===o[s+1].replace(/^\s*/,"")?b.context=k:b.context=[o[s+1]],g.push(b)}}return g.length?{name:e.name,message:o[0],url:document.location.href,stack:g}:null}function g(t,e,n,o){var u={url:e,line:n};if(u.url&&u.line){t.incomplete=!1,u.func||(u.func=r(u.url,u.line)),u.context||(u.context=i(u.url,u.line));var s=/ '([^']+)' /.exec(o);if(s&&(u.column=a(s[1],u.url,u.line)),t.stack.length>0&&t.stack[0].url===u.url){if(t.stack[0].line===u.line)return!1;if(!t.stack[0].line&&t.stack[0].func===u.func)return t.stack[0].line=u.line,t.stack[0].context=u.context,!1}return t.stack.unshift(u),t.partial=!0,!0}return t.incomplete=!0,!1}function v(t,e){for(var n,i,o,u=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,s=[],c={},l=!1,f=v.caller;f&&!l;f=f.caller)if(f!==y&&f!==$.report){if(i={url:null,func:N,line:null,column:null},f.name?i.func=f.name:(n=u.exec(f.toString()))&&(i.func=n[1]),o=d(f)){i.url=o.url,i.line=o.line,i.func===N&&(i.func=r(i.url,i.line));var h=/ '([^']+)' /.exec(t.message||t.description);h&&(i.column=a(h[1],o.url,o.line))}c[""+f]?l=!0:c[""+f]=!0,s.push(i)}e&&s.splice(0,e);var p={name:t.name,message:t.message,url:document.location.href,stack:s};return g(p,t.sourceURL||t.fileName,t.line||t.lineNumber,t.message||t.description),p}function y(t,e){var n=null;e=null==e?0:+e;try{if(n=p(t))return n}catch(r){if(b)throw r}try{if(n=h(t))return n}catch(r){if(b)throw r}try{if(n=m(t))return n}catch(r){if(b)throw r}try{if(n=v(t,e+1))return n}catch(r){if(b)throw r}return{}}var b=!1,x={};return y.augmentStackTraceWithInitialElement=g,y.computeStackTraceFromStackProp=h,y.guessFunctionName=r,y.gatherContext=i,y}();var O,L,R,j,F,U,q,W=t.Raven,H=!("object"!=typeof JSON||!JSON.stringify),B={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],collectWindowErrors:!0,tags:{},maxMessageLength:100,extra:{}},I=!1,z=Object.prototype,D=x(),J={VERSION:"1.1.19",debug:!0,noConflict:function(){return t.Raven=W,J},config:function(t,e){if(R)return A("error","Error: Raven has already been configured"),J;if(!t)return J;var n=i(t),r=n.path.lastIndexOf("/"),o=n.path.substr(1,r);return e&&d(e,function(t,e){B[t]=e}),B.ignoreErrors.push(/^Script error\.?$/),B.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),B.ignoreErrors=k(B.ignoreErrors),B.ignoreUrls=B.ignoreUrls.length?k(B.ignoreUrls):!1,B.whitelistUrls=B.whitelistUrls.length?k(B.whitelistUrls):!1,B.includePaths=k(B.includePaths),F=n.user,U=n.path.substr(r+1),R="//"+n.host+(n.port?":"+n.port:"")+"/"+o+"api/"+U+"/store/",n.protocol&&(R=n.protocol+":"+R),B.fetchContext&&($.remoteFetching=!0),B.linesOfContext&&($.linesOfContext=B.linesOfContext),$.collectWindowErrors=!!B.collectWindowErrors,h(),J},install:function(){return S()&&!I&&($.report.subscribe(p),I=!0),J},context:function(t,n,r){return u(t)&&(r=n||[],n=t,t=e),J.wrap(t,n).apply(this,r)},wrap:function(t,n){function r(){for(var e=[],r=arguments.length,i=!t||t&&t.deep!==!1;r--;)e[r]=i?J.wrap(t,arguments[r]):arguments[r];try{return n.apply(this,e)}catch(o){throw J.captureException(o,t),o}}if(o(n)&&!u(t))return t;if(u(t)&&(n=t,t=e),!u(n))return n;if(n.__raven__)return n;for(var i in n)f(n,i)&&(r[i]=n[i]);return r.__raven__=!0,r.__inner__=n,r},uninstall:function(){return $.report.uninstall(),I=!1,J},captureException:function(t,e){if(!a(t))return J.captureMessage(t,e);O=t;try{$.report(t,e)}catch(n){if(t!==n)throw n}return J},captureMessage:function(t,e){return B.ignoreErrors.test&&B.ignoreErrors.test(t)?void 0:(E(y({message:t+""},e)),J)},setUserContext:function(t){return j=t,J},setExtraContext:function(t){return B.extra=t||{},J},setTagsContext:function(t){return B.tags=t||{},J},setReleaseContext:function(t){return B.release=t,J},setDataCallback:function(t){return B.dataCallback=t,J},setShouldSendCallback:function(t){return B.shouldSendCallback=t,J},lastException:function(){return O},lastEventId:function(){return L},isSetup:function(){return S()}};J.setUser=J.setUserContext;var X="source protocol user pass host port path".split(" "),Z=/^(?:(\w+):)?\/\/(\w+)(:\w+)?@([\w\.-]+)(?::(\d+))?(\/.*)/;r.prototype=new Error,r.prototype.constructor=r,M(),"function"==typeof define&&define.amd?(t.Raven=J,define("raven",[],function(){return J})):"object"==typeof module?module.exports=J:"object"==typeof exports?exports=J:t.Raven=J}("undefined"!=typeof window?window:this),define("modules/monitor",["raven"],function(t){var e={dsn:null,git_commit:"not available"};try{e={dsn:null,git_commit:"89243359aef558712dd0bb4bc3598828141b3e25"}}catch(n){}var r={extractTags:function(){var t=document.body.getAttribute("class"),e=t.match(/tone--([^\s]+)/);return{itemTone:e?e[1]:null,itemId:document.body.getAttribute("data-page-id"),deviceKind:document.body.getAttribute("data-ads-config"),ads:"true"===document.body.getAttribute("data-ads-enabled")}},ignoreErrors:function(){var t=["fake"];return t.push=function(){},t},setContext:function(n,r){return e.dsn?t.context({tags:{context:n}},r):r()}},i=function(){var n=r.extractTags();!t.isSetup()&&e.dsn&&t.config(e.dsn,{tags:n,release:e.git_commit,ignoreErrors:r.ignoreErrors(),shouldSendCallback:function(t){t.stacktrace&&t.stacktrace.frames&&(t.stacktrace.frames=t.stacktrace.frames.reverse().slice(0,3).reverse());var e=35;return 100*Math.random()<=e}}).install()};return{init:i,setContext:r.setContext,modules:r,config:e,raven:t}}),function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define("bonzo",n):e[t]=n()}("bonzo",this,function(){function t(t,e){var n=null,r=T.defaultView.getComputedStyle(t,"");return r&&(n=r[e]),t.style[e]||n}function e(t){return t&&t.nodeName&&(1==t.nodeType||11==t.nodeType)}function n(t,n,r){var i,o,u;if("string"==typeof t)return E.create(t);if(e(t)&&(t=[t]),r){for(u=[],i=0,o=t.length;o>i;i++)u[i]=y(n,t[i]);return u}return t}function r(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function i(t,e,n,r){for(var i,o=0,u=t.length;u>o;o++)i=r?t.length-o-1:o,e.call(n||t[i],t[i],i,t);return t}function o(t,n,r){for(var i=0,u=t.length;u>i;i++)e(t[i])&&(o(t[i].childNodes,n,r),n.call(r||t[i],t[i],i,t));return t}function u(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function s(t){return t?t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():t}function c(t){t[D]("data-node-uid")||t[z]("data-node-uid",++W);var e=t[D]("data-node-uid");return q[e]||(q[e]={})}function l(t){var e=t[D]("data-node-uid");e&&delete q[e]}function a(t){var e;try{return null===t||void 0===t?void 0:"true"===t?!0:"false"===t?!1:"null"===t?null:(e=parseFloat(t))==t?e:t}catch(n){}return void 0}function f(t,e,n){for(var r=0,i=t.length;i>r;++r)if(e.call(n||null,t[r],r,t))return!0;return!1}function d(t){return"transform"==t&&(t=J.transform)||/^transform-?[Oo]rigin$/.test(t)&&(t=J.transform+"Origin"),t?u(t):null}function h(t,e,r,o){var u=0,s=e||this,c=[],l=K&&"string"==typeof t&&"<"!=t.charAt(0)?K(t):t;return i(n(l),function(t,e){i(s,function(n){r(t,c[u++]=e>0?y(s,n):n)},null,o)},this,o),s.length=u,i(c,function(t){s[--u]=t},null,!o),s}function p(t,e,n){var r=E(t),i=r.css("position"),o=r.offset(),u="relative",s=i==u,c=[parseInt(r.css("left"),10),parseInt(r.css("top"),10)];"static"==i&&(r.css("position",u),i=u),isNaN(c[0])&&(c[0]=s?0:t.offsetLeft),isNaN(c[1])&&(c[1]=s?0:t.offsetTop),null!=e&&(t.style.left=e-o.left+c[0]+I),null!=n&&(t.style.top=n-o.top+c[1]+I)}function m(t,e){return"function"==typeof e?e.call(t,t):e}function g(t,e,n){var r=this[0];return r?null==t&&null==e?(b(r)?x():{x:r.scrollLeft,y:r.scrollTop})[n]:(b(r)?k.scrollTo(t,e):(null!=t&&(r.scrollLeft=t),null!=e&&(r.scrollTop=e)),this):this}function v(t){if(this.length=0,t){t="string"==typeof t||t.nodeType||"undefined"==typeof t.length?[t]:t,this.length=t.length;for(var e=0;e<t.length;e++)this[e]=t[e]}}function y(t,e){var n,r,i,o=e.cloneNode(!0);if(t.$&&"function"==typeof t.cloneEvents)for(t.$(o).cloneEvents(e),n=t.$(o).find("*"),r=t.$(e).find("*"),i=0;i<r.length;i++)t.$(n[i]).cloneEvents(r[i]);return o}function b(t){return t===k||/^(?:body|html)$/i.test(t.tagName)}function x(){return{x:k.pageXOffset||A.scrollLeft,y:k.pageYOffset||A.scrollTop}}function w(t){var e=document.createElement("script"),n=t.match(N);return e.src=n[1],e}function E(t){return new v(t)}var C,_,S,k=window,T=k.document,A=T.documentElement,M="parentNode",$=/^(checked|value|selected|disabled)$/i,P=/^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,N=/\s*<script +src=['"]([^'"]+)['"]>/,O=["<table>","</table>",1],L=["<table><tbody><tr>","</tr></tbody></table>",3],R=["<select>","</select>",1],j=["_","",0,1],F={thead:O,tbody:O,tfoot:O,colgroup:O,caption:O,tr:["<table><tbody>","</tbody></table>",2],th:L,td:L,col:["<table><colgroup>","</colgroup></table>",2],fieldset:["<form>","</form>",1],legend:["<form><fieldset>","</fieldset></form>",2],option:R,optgroup:R,script:j,style:j,link:j,param:j,base:j},U=/^(checked|selected|disabled)$/,q={},W=0,H=/^-?[\d\.]+$/,B=/^data-(.+)$/,I="px",z="setAttribute",D="getAttribute",J=function(){var t=T.createElement("p");return{transform:function(){var e,n=["transform","webkitTransform","MozTransform","OTransform","msTransform"];for(e=0;e<n.length;e++)if(n[e]in t.style)return n[e]}(),classList:"classList"in t}}(),X=/\s+/,Z=String.prototype.toString,G={lineHeight:1,zoom:1,zIndex:1,opacity:1,boxFlex:1,WebkitBoxFlex:1,MozBoxFlex:1},K=T.querySelectorAll&&function(t){return T.querySelectorAll(t)};return J.classList?(C=function(t,e){return t.classList.contains(e)},_=function(t,e){t.classList.add(e)},S=function(t,e){t.classList.remove(e)}):(C=function(t,e){return r(e).test(t.className)},_=function(t,e){t.className=(t.className+" "+e).trim()},S=function(t,e){t.className=t.className.replace(r(e)," ").trim()}),v.prototype={get:function(t){return this[t]||null},each:function(t,e){return i(this,t,e)},deepEach:function(t,e){return o(this,t,e)},map:function(t,e){var n,r,i=[];for(r=0;r<this.length;r++)n=t.call(this,this[r],r),e?e(n)&&i.push(n):i.push(n);return i},html:function(t,e){var r=e?"textContent":"innerHTML",o=this,u=function(e,r){i(n(t,o,r),function(t){e.appendChild(t)})},s=function(n,i){try{if(e||"string"==typeof t&&!P.test(n.tagName))return n[r]=t}catch(o){}u(n,i)};return"undefined"!=typeof t?this.empty().each(s):this[0]?this[0][r]:""},text:function(t){return this.html(t,!0)},append:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r.appendChild(t)})})},prepend:function(t){var e=this;return this.each(function(r,o){var u=r.firstChild;i(n(t,e,o),function(t){r.insertBefore(t,u)})})},appendTo:function(t,e){return h.call(this,t,e,function(t,e){t.appendChild(e)})},prependTo:function(t,e){return h.call(this,t,e,function(t,e){t.insertBefore(e,t.firstChild)},1)},before:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r[M].insertBefore(t,r)})})},after:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r[M].insertBefore(t,r.nextSibling)},null,1)})},insertBefore:function(t,e){return h.call(this,t,e,function(t,e){t[M].insertBefore(e,t)})},insertAfter:function(t,e){return h.call(this,t,e,function(t,e){var n=t.nextSibling;n?t[M].insertBefore(e,n):t[M].appendChild(e)},1)},replaceWith:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r[M]&&r[M].replaceChild(t,r)})})},clone:function(t){var e,n,r=[];for(n=0,e=this.length;e>n;n++)r[n]=y(t||this,this[n]);return E(r)},addClass:function(t){return t=Z.call(t).split(X),this.each(function(e){i(t,function(t){t&&!C(e,m(e,t))&&_(e,m(e,t))})})},removeClass:function(t){return t=Z.call(t).split(X),this.each(function(e){i(t,function(t){t&&C(e,m(e,t))&&S(e,m(e,t))})})},hasClass:function(t){return t=Z.call(t).split(X),f(this,function(e){return f(t,function(t){return t&&C(e,t)})})},toggleClass:function(t,e){return t=Z.call(t).split(X),this.each(function(n){i(t,function(t){t&&("undefined"!=typeof e?e?!C(n,t)&&_(n,t):S(n,t):C(n,t)?S(n,t):_(n,t))})})},show:function(t){return t="string"==typeof t?t:"",this.each(function(e){e.style.display=t})},hide:function(){return this.each(function(t){t.style.display="none"})},toggle:function(t,e){return e="string"==typeof e?e:"","function"!=typeof t&&(t=null),this.each(function(n){n.style.display=n.offsetWidth||n.offsetHeight?"none":e,t&&t.call(n)})},first:function(){return E(this.length?this[0]:[])},last:function(){return E(this.length?this[this.length-1]:[])},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},parent:function(){return this.related(M)},related:function(t){return E(this.map(function(e){for(e=e[t];e&&1!==e.nodeType;)e=e[t];return e||0},function(t){return t}))},focus:function(){return this.length&&this[0].focus(),this},blur:function(){return this.length&&this[0].blur(),this},css:function(e,n){function r(t,e,n){for(var r in o)if(o.hasOwnProperty(r)){n=o[r],(e=d(r))&&H.test(n)&&!(e in G)&&(n+=I);try{t.style[e]=m(t,n)}catch(i){}}}var i,o=e;return void 0===n&&"string"==typeof e?(n=this[0],n?n===T||n===k?(i=n===T?E.doc():E.viewport(),"width"==e?i.width:"height"==e?i.height:""):(e=d(e))?t(n,e):null:null):("string"==typeof e&&(o={},o[e]=n),this.each(r))},offset:function(t,e){if(t&&"object"==typeof t&&("number"==typeof t.top||"number"==typeof t.left))return this.each(function(e){p(e,t.left,t.top)});if("number"==typeof t||"number"==typeof e)return this.each(function(n){p(n,t,e)});if(!this[0])return{top:0,left:0,height:0,width:0};var n=this[0],r=n.ownerDocument.documentElement,i=n.getBoundingClientRect(),o=x(),u=n.offsetWidth,s=n.offsetHeight,c=i.top+o.y-Math.max(0,r&&r.clientTop,T.body.clientTop),l=i.left+o.x-Math.max(0,r&&r.clientLeft,T.body.clientLeft);return{top:c,left:l,height:s,width:u}},dim:function(){if(!this.length)return{height:0,width:0};var t=this[0],e=9==t.nodeType&&t.documentElement,n=e||!t.style||t.offsetWidth||t.offsetHeight?null:function(e){var n={position:t.style.position||"",visibility:t.style.visibility||"",display:t.style.display||""};return e.first().css({position:"absolute",visibility:"hidden",display:"block"}),n}(this),r=e?Math.max(t.body.scrollWidth,t.body.offsetWidth,e.scrollWidth,e.offsetWidth,e.clientWidth):t.offsetWidth,i=e?Math.max(t.body.scrollHeight,t.body.offsetHeight,e.scrollHeight,e.offsetHeight,e.clientHeight):t.offsetHeight;return n&&this.first().css(n),{height:i,width:r}},attr:function(t,e){var n,r=this[0];if("string"!=typeof t&&!(t instanceof String)){for(n in t)t.hasOwnProperty(n)&&this.attr(n,t[n]);return this}return"undefined"==typeof e?r?$.test(t)?U.test(t)&&"string"==typeof r[t]?!0:r[t]:r[D](t):null:this.each(function(n){$.test(t)?n[t]=m(n,e):n[z](t,m(n,e))})},removeAttr:function(t){return this.each(function(e){U.test(t)?e[t]=!1:e.removeAttribute(t)})},val:function(t){return"string"==typeof t||"number"==typeof t?this.attr("value",t):this.length?this[0].value:null},data:function(t,e){var n,r,o=this[0];return"undefined"==typeof e?o?(n=c(o),"undefined"==typeof t?(i(o.attributes,function(t){(r=(""+t.name).match(B))&&(n[u(r[1])]=a(t.value))}),n):("undefined"==typeof n[t]&&(n[t]=a(this.attr("data-"+s(t)))),n[t])):null:this.each(function(n){c(n)[t]=e})},remove:function(){return this.deepEach(l),this.detach()},empty:function(){return this.each(function(t){for(o(t.childNodes,l);t.firstChild;)t.removeChild(t.firstChild)})},detach:function(){return this.each(function(t){t[M]&&t[M].removeChild(t)})},scrollTop:function(t){return g.call(this,null,t,"y")},scrollLeft:function(t){return g.call(this,t,null,"x")}},E.setQueryEngine=function(t){K=t,delete E.setQueryEngine},E.aug=function(t,e){for(var n in t)t.hasOwnProperty(n)&&((e||v.prototype)[n]=t[n])},E.create=function(t){return"string"==typeof t&&""!==t?function(){if(N.test(t))return[w(t)];var e=t.match(/^\s*<([^\s>]+)/),n=T.createElement("div"),r=[],o=e?F[e[1].toLowerCase()]:null,u=o?o[2]+1:1,s=o&&o[3],c=M;for(n.innerHTML=o?o[0]+t+o[1]:t;u--;)n=n.firstChild;s&&n&&1!==n.nodeType&&(n=n.nextSibling);do e&&1!=n.nodeType||r.push(n);while(n=n.nextSibling);return i(r,function(t){t[c]&&t[c].removeChild(t)}),r}():e(t)?[t.cloneNode(!0)]:[]},E.doc=function(){var t=E.viewport();return{width:Math.max(T.body.scrollWidth,A.scrollWidth,t.width),height:Math.max(T.body.scrollHeight,A.scrollHeight,t.height)}},E.firstChild=function(t){for(var e,n=t.childNodes,r=0,i=n&&n.length||0;i>r;r++)1===n[r].nodeType&&(e=n[i=r]);return e},E.viewport=function(){return{width:k.innerWidth,height:k.innerHeight}},E.isAncestor="compareDocumentPosition"in A?function(t,e){return 16==(16&t.compareDocumentPosition(e))}:function(t,e){return t!==e&&t.contains(e)},E}),function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define("qwery",n):e[t]=n()}("qwery",this,function(){function t(t){return[].slice.call(t,0)}function e(t){var e;return t&&"object"==typeof t&&(e=t.nodeType)&&(1==e||9==e)}function n(t){return"object"==typeof t&&isFinite(t.length)}function r(t){for(var e=[],r=0,i=t.length;i>r;++r)n(t[r])?e=e.concat(t[r]):e[e.length]=t[r];return e}function i(t){var e,n,r=[];t:for(e=0;e<t.length;e++){for(n=0;n<r.length;n++)if(r[n]==t[e])continue t;r[r.length]=t[e]}return r}function o(t){return t?"string"==typeof t?u(t)[0]:!t[f]&&n(t)?t[0]:t:c}function u(i,u){var a,f=o(u);return f&&i?i===l||e(i)?!u||i!==l&&e(f)&&d(i,f)?[i]:[]:i&&n(i)?r(i):c.getElementsByClassName&&"string"==i&&(a=i.match(s))?t(f.getElementsByClassName(a[1])):i&&(i.document||i.nodeType&&9==i.nodeType)?u?[]:[i]:t(f.querySelectorAll(i)):[]}var s=/^\.([\w\-]+)$/,c=document,l=window,a=c.documentElement,f="nodeType",d="compareDocumentPosition"in a?function(t,e){return 16==(16&e.compareDocumentPosition(t))}:function(t,e){return e=e==c||e==window?a:e,e!==t&&e.contains(t)};return u.uniq=i,u},this),define("modules/$",["bonzo","qwery"],function(t,e){"use strict";function n(n,r){return t(e(n,r))}return n}),define("modules/ads",["modules/$","bonzo"],function(t,e){"use strict";var n="advert-mpu-content",r="advert-mobile-mpu-content",i={insertAdPlaceholders:function(e){var i=(window.innerWidth,0);if(t(".article__body > div > *:nth-child(-n+3)").each(function(){var e=t(this)[0].tagName;"P"==e||"H2"==e||"BLOCKQUOTE"==e?i++:("FIGURE"==e&&t(this).hasClass("element-placeholder")||t(this).hasClass("element-video"))&&i++}),"tablet"==e.adsConfig&&3==i){var o="<div class='advert-slot advert-slot--mpu advert-slot--mpu--tablet'><div class='advert-slot__label'>Advertisement<a class='advert-slot__action' href='x-gu://subscribe'>Hide<span data-icon='&#xe04F;'></span></a></div><div class=\"advert-slot__wrapper\" id=\"advert-slot__wrapper\"><div class='advert-slot__wrapper__content' id="+n+"></div></div></div>";t(".article__body > div > p:nth-of-type(1)").before(o)}else if("mobile"==e.adsConfig){var u="<div class='advert-slot advert-slot--mpu advert-slot--mpu--mobile'><div class='advert-slot__label'>Advertisement<a class='advert-slot__action' href='x-gu://subscribe'>Hide<span data-icon='&#xe04F;'></span></a></div><div class=\"advert-slot__wrapper\" id=\"advert-slot__wrapper\"><div class='advert-slot__wrapper__content' id="+r+"></div></div></div>",s=(parseInt(e.mpuAfterParagraphs,10)||6)-1;t(".article__body > div > p:nth-of-type("+s+") ~ p + p").first().before(u)}},getMpuPos:function(t){var e,n=document.getElementById("advert-slot__wrapper");return n?(e=n.getBoundingClientRect(),0!==e.width&&0!==e.height?t(e.left+document.body.scrollLeft,e.top+document.body.scrollTop,e.width,e.height):void 0):null},getMpuPosJson:function(){return i.getMpuPos(function(t,e,n,r){return'{"left":'+t+', "top":'+e+', "width":'+n+', "height":'+r+"}"})},getMpuPosCommaSeparated:function(){return i.getMpuPos(function(t,e,n,r){return t+","+e})},getMpuOffsetTop:function(){return i.getMpuPos(function(t,e,n,r){return e})},poller:function(t,e,n){var r=i.getMpuOffsetTop();n&&this.isAndroid&&i.updateAndroidPosition(),r!==e&&(this.isAndroid?i.updateAndroidPosition():window.location.href="x-gu://ad_moved"),setTimeout(i.poller.bind(i,t+50,r),t)},updateAndroidPosition:function(){i.getMpuPos(function(t,e,n,r){window.GuardianJSInterface.mpuAdsPosition(t,e,n,r)})},initMpuPoller:function(){i.poller(1e3,i.getMpuOffsetTop(),!0)},fireAdsReady:function(e){t("body").hasClass("no-ready")||"true"!==t("body").attr("data-use-ads-ready")||(e.location.href="x-gu://ads-ready")}},o=function(e){i.isAndroid=t("body").hasClass("android"),this.initialised||(this.initialised=!0,("true"==e.adsEnabled||null!==e.adsEnabled&&e.adsEnabled.match&&e.adsEnabled.match(/mpu/))&&(i.insertAdPlaceholders(e),window.getMpuPosJson=i.getMpuPosJson,window.getMpuPosCommaSeparated=i.getMpuPosCommaSeparated,window.initMpuPoller=i.initMpuPoller,window.applyNativeFunctionCall("initMpuPoller"),i.isAndroid||i.initMpuPoller()),i.fireAdsReady(window))};return{init:o,modules:i}});var gu=document.getElementById("gu"),baseUrl=gu.getAttribute("data-js-dir");require.config({paths:{bonzo:"../../../node_modules/bonzo/bonzo",bean:"../../../node_modules/bean/bean",d3:"../../../node_modules/d3/d3",domReady:"../../../node_modules/domready/ready",mobileSlider:"components/mobile-range-slider",throttleDebounce:"components/throttle-debounce",flipSnap:"components/flipsnap",fastClick:"../../../node_modules/fastclick/lib/fastclick",qwery:"../../../node_modules/qwery/qwery",fence:"../../../node_modules/fence/fence",smoothScroll:"../../../node_modules/smooth-scroll/dist/js/smooth-scroll",raven:"../../../node_modules/raven-js/dist/raven"},shim:{d3:{exports:"d3"}}}),require(["domReady","modules/monitor","modules/ads"],function(t,e,n){"use strict";function r(t){var e=document.body.getAttribute("data-template-directory"),n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e+t,document.getElementsByTagName("head")[0].appendChild(n)}t(function(){var t=document.body.getAttribute("data-content-type");e.init(),n.init({adsEnabled:document.body.getAttribute("data-ads-enabled"),adsConfig:document.body.getAttribute("data-ads-config"),
mpuAfterParagraphs:document.body.getAttribute("data-mpu-after-paragraphs")}),"article"===t?require(["article"],function(t){e.setContext("article",function(){t.init()})}):"liveblog"===t?require(["liveblog"],function(t){e.setContext("liveblog",function(){t.init()})}):"audio"===t?require(["audio"],function(t){e.setContext("audio",function(){t.init()})}):"gallery"===t?require(["gallery"],function(t){e.setContext("gallery",function(){t.init()})}):"football"===t?require(["football"],function(t){e.setContext("football",function(){t.init()})}):"cricket"===t?require(["cricket"],function(t){e.setContext("cricket",function(){t.init()})}):require(["bootstraps/common"],function(t){e.setContext("common",function(){t.init()})})});var i=document.getElementById("gu"),o=i.getAttribute("data-skip-style");o||r("assets/css/style-async.css")}),define("app",function(){});