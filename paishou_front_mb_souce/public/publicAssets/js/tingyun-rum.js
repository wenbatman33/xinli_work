var TINGYUN=function(t,e,n){if(/(MSIE [0-8].\d+)/.test(navigator.userAgent)){return {TY_INFO: 'Browser Version Not Support to load TINGYUN Agent'};}function r(t){return JSON.parse(t)}function i(t){return JSON.stringify(t)}function a(t){var e=!!t&&"length"in t&&t.length,n=typeof t;return"function"!==n&&("array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function o(t,e,n){var r,i=0;if(t)if(a(t))for(r=t.length;i<r&&e.call(t[i],t[i],i)!==!1;i++);else for(i in t)if((n||Object.prototype.hasOwnProperty.call(t,i))&&e.call(t[i],t[i],i)===!1)break;return t}function s(t){return function(e){return"Array"===t&&Array.isArray?Array.isArray(e):Object.prototype.toString.call(e)==="[object "+t+"]"}}function u(t){return new Function("return "+t)()}function c(t){switch(typeof t){case"object":if(!t)return null;if(t instanceof Array){var e=Pe.call(t);return o(e,function(t,n){e[n]=c(t)}),"["+e.join(",")+"]"}if(t instanceof Date)return t.getTime().toString();var n="";return o(t,function(t,e){He(t)||(n+=c(e)+":"+c(t)+",")}),n&&(n=n.substr(0,n.length-1)),"{"+n+"}";case"string":return Ue+t.replace(Fe,"\\$1").replace(Xe,"\\n")+Ue;case"number":return isNaN(t)?null:t;case"boolean":return t;case"function":return c(t.toString());case"undefined":default:return'"undefined"'}}function f(t){return t&&Ne(t)?qe(t):t}function l(t,e,n,r){return t.addEventListener(e,n,r)}function d(t,e,n){return t.removeEventListener(e,n)}function h(t,e,n){return t.attachEvent("on"+e,n)}function v(t,e,n){return t.detachEvent("on"+e,n)}function p(t,e,n,r){var i=function(){return We(t,e,i),n.apply(this,arguments)};return Ye(t,e,i,r)}function g(t,e){return Function.prototype.apply.apply(t,e)}function m(t,e){return function(){t.apply(e,arguments)}}function y(t){return Je?Je(t):t}function _(t){var e=arguments.length;if(e<2||!t)return t;var n=Pe.call(arguments,1);return o(n,function(e){o(e,function(e,n){t[n]=e})}),t}function x(t,e){for(var n=-1,r=0,i=null==t?0:t.length,a=[];++n<i;){var o=t[n];e(o,n,t)&&(a[r++]=o)}return a}function b(t,e){return t?e?t.replace(/\{(\w+.?\w+)\}/g,function(t,n){return e[n]||""}).replace(/\{(\d+)\}/g,function(t,n){return e[n]||""}):t:""}function S(t,e,n){var r;if(null==t)return-1;var i=Object(t),a=i.length>>>0;if(0===a)return-1;var o=+n||0;if(Math.abs(o)===1/0&&(o=0),o>=a)return-1;for(r=Math.max(o>=0?o:a-Math.abs(o),0);r<a;){if(r in i&&i[r]===e)return r;r++}return-1}function E(t,e){var n=null==t?0:t.length;if(!n)return-1;for(var r=n;r--;)if(t[r]===e)return r;return r}function w(t){return setTimeout(t,0)}function T(){}function k(){var t=window&&window.performance;return t&&t.timing&&t.timing.navigationStart&&t.now?Math.round(t.timing.navigationStart+t.now()):+new Date}function C(t){return function(){if(null!==t){var e=t;t=null,e.apply(this,arguments)}}}function O(t){return t?Ne(t)?t.length:e.ArrayBuffer&&t instanceof ArrayBuffer?t.byteLength:e.Blob&&t instanceof Blob?t.size:t.length?t.length:0:0}function I(t){return Ke!==Ve&&/^https/i.test(t&&t.protocol||Ke)?"https:":Ve}function R(t,e,n,r){var i=null;return t&&e&&(i=I(r)+"//"+t+e,n&&(i+="?",o(n,function(t,e){var n=[y(e),"=",y(t),"&"];i+=n.join("")}),r&&r.disableUploadTime||(i+="__r="+k()))),i}function q(){this.events={}}function M(t){return!(t in Xn)||Xn[t]}function N(t){var e=Pn.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?e[3]:null}function A(t,e,n,r){var i=t+"="+e;if(n){var a=new Date;a.setTime(a.getTime()+1e3*n),i+=";expires="+a.toGMTString()}r&&(i+=";path="+r),Pn.cookie=i}function H(t,e,n,r){He(n)&&(r=n);var i=new XDomainRequest;i.open(ir,t),i.onload=function(){r(null,i.responseText)},i.onerror=function(t){r(t)},i.send(Me(e))}function j(t,e,n){var r=Pn.createElement(t);try{for(var i in e)r[i]=e[i]}catch(a){var o="<"+t;for(var i in e)o+=" "+i+'="'+e[i]+'"';o+=">",n||(o+="</"+t+">"),r=Pn.createElement(o)}return r}function D(t,e,n,r){He(n)&&(r=n);var i="ty_form"+k(),a=j("div",{style:rr}),o=j("iframe",{name:i,width:0,height:0,style:rr}),s=j("form",{style:rr,action:t,enctype:"application/x-www-form-urlencoded",method:"post",target:i}),u=j("input",{name:"data",type:"hidden"},!0);u.value=Me(e),s.appendChild(u),a.appendChild(o),a.appendChild(s),Pn.body.appendChild(a),s.submit(),o.onload=function(){r&&r(null,o.innerHTML),Pn.body.removeChild(a)}}function L(t,e,n,r){He(n)&&(r=n,n=null);var i=C(r),a=new Un;a[vn]=!0,a.overrideMimeType&&a.overrideMimeType("text/html"),a.onreadystatechange=function(){4==a.readyState&&200==a.status&&i(null,a.responseText)},a.onerror=i,e=Me(e);try{a.open(ir,t,!0)}catch(o){return D(t,e,i)}for(var s in n)a.setRequestHeader(s,n[s]);e?a.send(e):a.send()}function B(t,e,n,r){He(n)&&(r=n,n=null);var i=$n.sendBeacon(t,Me(e));i?r&&r():L(t,e,n,r)}function z(t,e,n){if(t&&n&&He(n)){var r=t[e];if(!r||!r._wrapped){var i=n(r,e);return i&&(i._wrapped=!0),t[e]=i,i}}}function P(t){sr&&t()}function U(t){return function(){sr&&t.apply(this,arguments)}}function F(){sr=!1}function X(t,e){pr[t]=e}function G(t){W(t,_r)}function Y(t){W(t,xr)}function W(t,e){var n="ok";return t?void e.push(t):n=e.length?e.join("\n"):n}function J(t){try{return f(t)}catch(e){G(e&&e.message)}return null}function $(t,e,n){return n===_n&&t&&t.getResponseHeader?t.getResponseHeader(e):n===xn&&t.headers?t.headers.get(e):null}function K(t,e,n){var r=J($(t,yn,n||_n));return r&&r.r&&toString(r.r)===toString(e.r)?r:null}function V(t,e){t.s_id=e.id,t.s_name=e.action,e.time&&(t.s_du=e.time.duration,t.s_qu=e.time.qu),t.t_id=e.trId}function Q(t){var e=!1;return o(dr.xhrs,function(n){if(n.id===t.id)return e=!0,!1}),e}function Z(){try{o(gr,function(t){t&&t.disconnect()})}catch(t){}}function tt(t,e){this.flags=0,He(t.create)&&(this.create=t.create,this.flags|=Tr),He(t.before)&&(this.before=t.before,this.flags|=kr),He(t.after)&&(this.after=t.after,this.flags|=Cr),He(t.error)&&(this.error=t.error,this.flags|=Or),this.data=e}function et(t,e){if(!Rr){if(!je(t)||!t)throw new TypeError("callbacks arguments must be an object");return Rr=new tt(t,e)}}function nt(t){var e=Rr.data;if(0!==(Rr.flags&Tr)){var n=Rr.create(Rr.data);void 0!==n&&(e=n)}return function r(){0!==(Rr.flags&kr)&&Rr.before(this,e);var n=r;n._&&(n._=1);try{var i=t.apply(this,arguments)}catch(a){throw 0!==(Rr.flags&Or)&&Rr.error(e,a),a}return 0!==(Rr.flags&Cr)&&Rr.after(this,e),i}}function rt(t){return!Rr||Rr.flags<=0?t:nt(t)}function it(){function t(t){return function(e){var n=Pe.call(arguments,0);He(e)&&(n[0]=rt(e));var r=this;try{return t.apply(r,n)}catch(i){}return g(t,[r,n])}}z(e,"setTimeout",t),z(e,"setInterval",t)}function at(t){function e(){}return e.prototype=t,new e}function ot(){this.id=null,this.active=null,this._set=[]}function st(){it();var t=new ot;return t.id=et({create:function(){return t.active},before:function(e,n){n&&t.enter(n)},after:function(e,n){n&&t.exit(n)},error:function(e,n){if(e){try{var r="moduleId";n[r]=e[r]}catch(i){}t.exit(e)}}}),t}function ut(){return Mr||(qr=st(),Mr=!0),qr}function ct(t){Nr&&console.warn(t||"Event key required!")}function ft(t){t=t||{},this.key=t.key,this.type=t.type||qn;var e=t.timeout||6e5;this.i=e?setTimeout(m(this.fail,this),e):null,this.status=1,this.remain=0,this.xhrs=[],this.s=k(),this.e=null,this.called=this.sent=this.stored=!1}function lt(t){t=t||{};var e=t.key;if(!e)return new ct;if(jr[e])return new ct("event "+e+" is executing");jr[e]=!0;var n=qr.createContext();qr.enter(n);var r=new ft(t);return qr.set("event",r),r._end=function(){var t=this;t.sent||t.stored||0!==t.remain||!t.called?t.stored&&this.refreshEventAndStore(n):t.finish().send(n)},r.end=function(t,e){var r=this;return r.called?void(Nr&&console.warn("Event "+this.key+"has ended or failed!")):(r.called=!0,qr.exit(n),r.status=null!=t?t:1,void(e||r._end()))},r.finish=function(t){var e=this;return e.e=k(),e.i&&clearTimeout(e.i),delete jr[e.key],e},r.fail=function(){this.end(0)},r.store=function(){this.end(null,!0),this.refreshEventAndStore(n),this.stored=!0},r}function dt(t){var n=e.localStorage.getItem(On),r=J(n);if(r&&r.start&&(t=t||{},!t.key||r.key===t.key)){var i=t.timeout;if(i||(i=In),r.duration=k()-r.start,r.duration>i)return void e.localStorage.removeItem(On);if(hr.xhrs&&hr.xhrs.length>0){r.xhrs||(r.xhrs=[]);try{o(hr.xhrs,function(t){t.start=t.start-r.start}),r.xhrs=r.xhrs.concat(hr.xhrs)}catch(a){}pt()}var s=e.performance.timing;if(s.navigationStart&&(s.loadEventEnd||s.loadEventStart)&&s.navigationStart-r.start>=0){var u={req:"GET "+document.URL,status:200,type:"PF",start:s.navigationStart-r.start,du:(s.loadEventEnd||s.loadEventStart)-s.navigationStart};ei&&(u.s_id=ei.id,u.s_name=ei.n,u.s_du=ei.a,u.s_qu=ei.q,u.t_id=ei.tid),r.xhrs||(r.xhrs=[]),r.xhrs.push(u)}var c=1;t.status&&(c=t.status===Nn?1:0),r.status=c,e.localStorage.removeItem(On),oi.emit("send","/spe",null,r,T)}}function ht(t){w(function(){dt(t)})}function vt(){var t=e.localStorage.getItem(On);t&&(hr.recording=!0)}function pt(){hr.recording=!1,hr.xhrs=[]}function gt(t){t=_(t||{},{type:Rn});var e=lt(t);return t.autoEnd&&setTimeout(function(){t.status&&t.status===An?e.fail():e.end()},t.endDelay||Mn),e}function mt(){return oi[zr]||oi._end}function yt(){return oi.loadEventEnd||oi._end}function _t(t){function e(e){return t[e]>0?t[e]-i:0}var r={},i=n;if(t){P(function(){var e=ur.t={};o(t,function(t,n){He(t)||(e[n]=t)},!0)}),i=t.navigationStart,r={f:e(Jr),qs:e(Dr),rs:e(Lr),re:e(Br),os:e(zr),oe:e(Pr),oi:e(Ur),oc:e(Fr),ls:e(Xr),le:e(Gr),tus:e(Yr),tue:e(Wr)};var a=e(Jr),s=e($r),u=e(Kr),c=e(Vr),f=e(Qr),l=e(Zr);if(l-f>0&&(r.cs=f,r.ce=l),s-a>0&&(r.ds=a,r.de=s),(c-u>0||c>0)&&(r.es=u,r.ee=c),0==r.le){var d=yt();r.ue=d-i}oi._le=r.ue||r.le;var h;t.msFirstPaint&&(h=t.msFirstPaint,P(function(){ur.fp="m_"+h}),r.__fp=3),h&&(r.fp=Math.round(h-i),oi.fp=r.fp),t[ti]&&(r.sl=e(ti))}else r={t:i,os:mt()-i,ls:yt()-i};return r.je=oi.errs&&oi.errs.length||0,oi.ct&&(r.ct=oi.ct-i),oi.touch&&(r.fi=oi.touch-i),r}function xt(t,e){var r={tr:!1,tt:y(Pn.title),charset:Pn.characterSet};cr.resources&&_(r,cr.resources),P(function(){r.debug=ur}),F();var i=oi.errs;o(i,function(t,r){var a=t.toObject();a.o=a.o-e&&e.navigationStart||n,i[r]=a}),r.err=i;var a,s="getEntriesByType";return t[s]?a=t[s]("resource"):Y(b(br,[s])),a&&(r.tr=!0,r.res=[],o(a,function(t){function e(e){var n=t[e];return n>0?n:0}var n=t.initiatorType,i=t.name,a={o:e("startTime"),rt:n,n:i,f:e(Jr),ds:e(Jr),de:e($r),cs:e(Qr),ce:e(Zr),sl:e(ti),qs:e(Dr),rs:e(Lr),re:e(Br),ts:t.transferSize||0,es:t.encodedBodySize||0};if("xmlhttprequest"===n){var o=bt(i);o&&(a.aid=o.s_id,a.atd=o.t_id,a.an=o.s_name,a.aq=o.s_qu,a.as=o.s_du)}r.res.push(a)})),r}function bt(t){var e;return o(oi.xhrs,function(n,r){if(r&&t.indexOf(r)>-1)return e=n,!1}),e}function St(t){var e={};return t&&(e.id=t.id,e.a=t.a,e.q=t.q,e.tid=t.tid,e.n=t.n),e}function Et(t){if(!t.agent){var n=e._ty_rum;if(n&&n.agent)t.agent=n.agent;else{var r="TINGYUN_DATA",i=N(r);if(i){try{t.agent=J(decodeURIComponent(i))}catch(a){G(a&&a.message)}A(r,"",-1e3)}}}return t.agent}function wt(t,e){var n=0,r=t.timing;return r?fr[Hn]&&fr[Hn]>0?(n=fr[Hn],e.__fp=2):t.getEntriesByName&&(n=r.domLoading,o(fr.resources,function(e){var i=t.getEntriesByName(e);if(1==i.length){var a=i[0].responseEnd+r.navigationStart;a>n&&(n=a)}}),n-=r.navigationStart,e.__fp=1):Y("fp=0"),P(function(){ur._fp=n}),Math.round(n)}function Tt(t,n,r,i){var a=r||0;if(Xn.lcp_switch&&fr[Dn]&&fr[Dn]>0)return a=fr[Dn],i.__fs=2,Math.round(a);var s=cr.firstScreenResources;if(s&&s.length&&t.getEntriesByName)return o(s,function(e){var n=t.getEntriesByName(e);if(n.length){var r=n[0],i=r.responseEnd;i>a&&(a=i)}}),i.fs_s=1,Math.round(a);var u=Pn.createElement("img");if(!u.getBoundingClientRect)return P(function(){ur.fs=a}),a;if(t.getEntriesByName){var c=e.innerHeight,f=e.innerWidth,l=[];o(Pn.querySelectorAll("img"),function(t){t.src&&qt(t.src)&&kt(Ct(t),c,f)&&!Ot(t)&&l.push(t.src)});var d=(n.loadEventEnd||oi.loadEventEnd)-n.navigationStart;o(l,function(e){var n=t.getEntriesByName(e);if(n.length){var r=n[0],i=r.responseEnd;r.fetchStart<=d&&i>a&&(a=i)}})}return i.__fs=1,Math.round(a)}function kt(t,n,r){if(t){var i=e.pageYOffset,a=t.top+(0===i?0:i||Pn.scrollTop||0)-(Pn.clientTop||0);if(a>=n)return!1;var o=t.left;return o>=0&&o<r}return!1}function Ct(t){return He(t.getBoundingClientRect)?t.getBoundingClientRect():void 0}function Ot(t){return Qn.reliableHiddenOffsets()?t.offsetWidth<=0&&t.offsetHeight<=0&&!t.getClientRects().length:It(t)}function It(t){for(;t&&1===t.nodeType;){if("none"===Rt(t)||"hidden"===t.type)return!0;t=t.parentNode}return!1}function Rt(t){return t.style&&t.style.display}function qt(t){if(!Xn.fs_resources||0===Xn.fs_resources.length)return!0;var e=!1;return o(Xn.fs_resources,function(n){if(t.indexOf(n)>-1)return e=!0,!1}),e}function Mt(t){var e=n,r=0;return t&&(e=t.navigationStart||e,r=t[zr]||t.domInteractive||t.domLoading||r),r=r||oi._end,r-e}function Nt(t){if(t){var e=t.fetchStart;if(e)return e-t.navigationStart}}function At(){var t={},n=0,r=e.performance;r&&r.getEntriesByType&&o(r.getEntriesByType("mark")||[],function(e){if(e&&e.name&&e.startTime&&0===e.name.indexOf(gn)){var r=e.name.substring(gn.length);r&&(t[r]=Math.round(e.startTime),n+=1)}});var i=e[En]&&e[En].data,a=_({},i||{},pr||{});return a&&r&&r.timing&&o(a,function(e,i){je(e)&&e.timestamp&&(t[i]=e.timestamp-r.timing.navigationStart,n+=1)}),n>0?t:null}function Ht(t,e){var n=Me(t),r=n?n.length:0;if(r>wn&&t.res&&t.res.length>0){t.res=t.res.slice(0,e);var i=Me(t),a=i?i.length:0;return a>wn?Ht(t,e-10>0?e-10:0):t}return t}function jt(){lr.poMetricCollected?ni():(lr.pfWaitingPoMetric=!0,setTimeout(ni,Xn.max_metric_wait||Ln))}function Dt(){function t(t){try{var e=t.getEntries();e&&o(e,function(t){t.entryType===Dn?fr[Dn]=t.renderTime||t.loadTime:t.entryType===Hn&&t.name===jn&&(fr[Hn]=t.startTime),Lt(r)})}catch(n){}}if(!e.PerformanceObserver)return void(lr.poMetricCollected=!0);var n=[Hn];Xn.lcp_switch&&n.push(Dn);var r=[],i=e.PerformanceObserver.supportedEntryTypes||[];if(o(n,function(t){i.indexOf(t)>-1&&r.push(t)}),P(function(){ur.et=r}),0==r.length)return void(lr.poMetricCollected=!0);try{o(r,function(n){gr[n]=new e.PerformanceObserver(t),gr[n].observe({type:n,buffered:!0})})}catch(a){}}function Lt(t){var e=!0;o(t,function(t){if(!fr[t])return e=!1,!1}),lr.poMetricCollected=e,lr.poMetricCollected&&lr.pfWaitingPoMetric&&jt()}function Bt(){Dt(),ii.on(tn,C(function(){t();var e=k();P(function(){ur.load=e}),oi.loadEventEnd=e})),o([tn,en,nn,rn],function(t){Ye(e,t,function(e){P(function(){(ur.e[t]||(ur.e[t]=[])).push(k())}),ii.emit(t,e)})});var t=C(function(){var t=k();P(function(){ur.end=t}),oi.domContentLoadedEventStart=t,Pn.querySelectorAll&&(fr.resources=fr.resources||[],o(Pn.querySelectorAll("head>link,head>script"),function(t){var e;"LINK"==t.tagName?e=t.href:"SCRIPT"!=t.tagName||t.defer||t.async||(e=t.src),e&&fr.resources.push(e)}))});Ye(Pn,"DOMContentLoaded",t),Ye(Pn,an,function(e){Pn.readyState===on&&t()});var n=C(function(){oi.touch=k()});o(["scroll","click","keypress"],function(t){p(Pn,t,n)})}function zt(){var t=this;t.xhrs={},t.errs=[],q.call(t)}function Pt(){if(Xn&&Xn.did_cookie){var t=N(Xn.did_cookie);if(null!=t)return t}var e=Zn(un);return e?e:tr(un,Qe(),fn)}function Ut(){var t=e.localStorage.getItem(cn);return t?t.split(Cn):null}function Ft(t){t&&3===t.length&&e.localStorage.setItem(cn,t.join(Cn))}function Xt(){var t=Ut();return Wt(t)&&(t=Gt()),t?t[0]:""}function Gt(){var t=k(),e=[Qe(),t,t];return Ft(e),e}function Yt(){var t=k(),e=Ut();Wt(e)?(e=Gt(),si.sid=e[0]):(e[2]=t,Ft(e))}function Wt(t){return!t||3!==t.length||k()-+t[2]>kn}function Jt(t){function e(t,e,r){var i=r||"log",a=n[t]||(n[t]={});a[i]=a[i]||"",a[i]+=e}var n={},r=G();if(e("Status",r,"ok"!==r),e("Debug",Y()),o(ci,function(t,n){e("Timeline",n+": "+t.toString())}),!t&&Nr)console.log("[TingYun Agent Diagnosis]\n"),o(n,function(t,e){var n=console[e];o(n,function(t,e){console[e](t)})});else{if(t!==hn)return Me(n);Jn.href=Jn.href+"#"+Me(n)}}function $t(t){this.limit=t,this.reset()}function Kt(t,e,n,r){return String(t)+String(e)+String(n)+String(r)}function Vt(t,e,n,r,i,a,o,s,u){var c=this;c.id=t,c.time=k(),c.msg=e,c.lineno=r,c.colno=i,c.filename=n,c.count=1,c.stack=a&&a.stack||"",c.module=o,c.trigger=s,c.customObj=u,c.fix();var f=pi[t];c.ep=f?0:1,pi[t]=!0}function Qt(t){if(lr.pf){var e=function(t){var e=[];return o(t,function(t){e.push(t.toObject())}),e}(vi.c);if(!e||!e.length)return null;var r={fu:hi?hi:hi++,os:parseInt((k()-(fr.pfStart||n))/1e3)};cr.ulabel&&(r.ulabel=cr.ulabel),oi.emit("send","/err1",r,{datas:e},m(vi.reset,vi))}}function Zt(t,e,n,r,i,a,s){if(e||!Yn){var u=!1;if(o(Fn.domains,function(t){if(u=t.test(e))return!1}),!u){var c=i&&i.moduleId,f=Kt(t,n,r,c),l=vi.get(f);l?l.increase():(l=new Vt(f,t,e,n,r,i,c,a,s),vi.add(f,l),oi.errs&&oi.errs.push(l))}}}function te(){var t=e.onerror;e.onerror=function(e,n,r,i,a){if(Zt(e,n,r,i,a,li),He(t))return t.apply(this,arguments)},e.onerror._ty=!0}function ee(){var t=e.onerror;t&&t._ty||te()}function ne(t,e){if(t){var n=t.message||"",r=t.stack,i="",a=0,s=0;if(r){var u=r.split(/\n/);o(u,function(t,e){if(t&&(t=t.trim()),t&&0===t.indexOf("at ")){var n=t.indexOf("("),r=t.indexOf(")");if(n&&r){var o=n+1;o>r&&(o=r);var u=t.substring(o,r);if(u){var c=u.split(":");c&&c.length>2&&(i=(c.slice(0,c.length-2)||[]).join(":"),a=+c[c.length-2],s=+c[c.length-1])}}}if(i&&De(a)&&a>0&&De(s)&&s>0)return!1})}Zt(n,i,a,s,{stack:r},fi,e)}}function re(){var t=$e();return t?te():Ye(e,Ze,function(t){var n,r,i,a,o;(t instanceof e.Event||e.ErrorEvent&&t instanceof e.ErrorEvent)&&(n=t.message||t.error&&(t.error.message||t.error.constructor.name)||"",r=t.lineno||0,i=t.colno||0,a=t.filename||t.error&&t.error.filename||t.target&&t.target.baseURI||"",a==Pn.URL&&(a="#"),o=t.error),Zt(n,a,r,i,o,li)}),ii.on([tn,en,nn,rn],function(t){Qt()}).on(tn,function(){t&&w(ee)}),setInterval(Qt,di)}function ie(t){return function e(n,r){var i=this,a=e;if(a._&&(a._=1),!i[vn]){var o=i[ln]={};o.method=n,o.url=r,o.id=dr.uniqueId++;var s=qr.get("event");s&&(o.key=s.key,s.remain++)}try{return t.apply(i,arguments)}catch(u){}}}function ae(t){return function e(n,r){var i=this,a=e;if(a._&&(a._=1),!i[vn]){var o=i[ln];o&&n&&"ty_rum_path"===n&&(o.ty_rum_path=r)}try{return t.apply(i,arguments)}catch(s){}}}function oe(t){return function e(n){var r=this,i=e;if(i._&&(i._=1),!r[vn]){var a=r[ln];a&&(a.start=k(),a.reqSize=O(n)),fe(r),r.setRequestHeader&&Xn.id&&a&&gi(a.url)&&(a.r=k()%1e9,r.setRequestHeader("X-Tingyun-Id",Xn.id+";r="+a.r))}try{return t.apply(r,arguments)}catch(o){}}}function se(t){o(mi,function(e,n){var r="on"+n;t[r]?z(t,r,function(n){if(ce(t,e),He(n))return n.apply(this,arguments)}):t[r]=function(){ce(t,e)}})}function ue(t){o(mi,function(e,n){Ye(t,n,function(){ce(t,e)})})}function ce(t,e){t&&t[ln]&&(t[ln].errorCode=e)}function fe(t){function e(e){return rt(function n(){var r=n;r._&&(r._=1),le(t);var i;if(He(e)){var a=t[ln];if(a&&4==t.readyState)var o=k();i=e.apply(this,arguments),a&&4==t.readyState&&(a.cbTime=k()-o)}return i})}var n=t[yi];if(n){z(t,yi,e);try{ue(t)}catch(r){}}else try{Ye(t,an,rt(function i(){var e=i;e._&&(e._=1),le(t)})),ue(t)}catch(r){return void w(function(){se(t),z(t,yi,e)})}w(function(){z(t,yi,e)})}function le(t){var e=t[ln];if(e&&(e.end=k(),e.readyState=t.readyState,4==t.readyState)){e.status=t.status,e.resSize=de(t);var n=qr.get("event");w(function(){if(!Q(e)){var r=he(e,t);n&&n.key==e.key&&(n.xhrs.push(r),0===--n.remain&&n._end()),oi.xhrs&&(wr(e),oi.xhrs[e.url]=r),dr.xhrs.push(r),hr.recording&&hr.xhrs.push(r)}})}}function de(t){var e=0;if(""==t.responseType||"text"==t.responseType)e=O(t.responseText);else if(t.response)e=O(t.response);else try{e=O(t.responseText)}catch(n){}return e}function he(t,e){if(t){var n=t.status,r={id:t.id,req:t.method+" "+t.url,start:t.start,du:n>0?t.end-t.start:0,cb:t.cbTime||0,status:n,err:t.errorCode?t.errorCode:0,rec:t.resSize,send:t.reqSize,type:_n};if(t.ty_rum_path&&(r.csheader=t.ty_rum_path),t.r){var i=K(e,t);i&&V(r,i)}return r}}function ve(){var t=Un&&Un.prototype;t?(z(t,"open",ie),z(t,"setRequestHeader",ae),z(t,"send",oe)):Un&&(e.XMLHttpRequest=function(){var t=new Un;return z(t,"open",ie),z(t,"send",oe),z(t,"setRequestHeader",ae),t})}function pe(t,e){if(Xn.id&&t&&gi(t.url)){t.r=k()%1e9;var n=Xn.id+";r="+t.r;if(e){var r=e.headers;Be(r)?(e.headers||(e.headers=new Headers),e.headers.append(mn,n)):je(r)?e.headers[mn]=n:r||(e.headers={},e.headers[mn]=n)}else e={headers:{}},e.headers[mn]=n}return e}function ge(t,e){if(t){var n={id:t.id,req:(t.method||"GET")+" "+t.url,start:t.start,du:t.status>0?t.end-t.start:0,cb:0,status:t.status,err:0,rec:0,send:0,type:xn};if(t.ty_rum_path&&(n.csheader=t.ty_rum_path),t.r){var r=K(e,t,xn);r&&V(n,r)}return n}}function me(t){return function e(){var n=e;n._&&(n._=1);var r=this,i=Pe.call(arguments,0);return new Promise(function(e,n){var a,o,s="GET",u=1;if(i)if(i.length>1)a=i[0],o=i[1],u=1,o&&je(o)&&(s=o.method);else if(1===i.length){var c=i[0];Ne(c)?a=c:c&&(je(c)||ze(c))&&(o=c,u=0,a=c.url,s=c.method)}var f={id:dr.uniqueId++,method:s,url:a},l=pe(f,o);if(l&&(i[u]=l,l.headers)){var d;Be(l.headers)?d=l.headers.get(Sn):je(l.headers)&&(d=l.headers[Sn]),d&&(f[Sn]=d)}var h=qr.get("event");h&&(f.key=h.key,h.remain++),f.start=k();var v;try{v=t.apply(r,i)}catch(p){return void n(p)}v.then(rt(function g(t){var n=g;if(n._&&(n._=1),f.end=k(),t){f.status=t.status;var r=qr.get("event");w(function(){if(!Q(f)){var e=ge(f,t);r&&r.key==f.key&&(r.xhrs.push(e),0===--r.remain&&r._end()),oi.xhrs&&(wr(f),oi.xhrs[f.url]=e),dr.xhrs.push(e),hr.recording&&hr.xhrs.push(e)}})}e(t)}),function(t){n(t)})})}}function ye(){e.fetch&&z(e,"fetch",me)}function _e(){return setInterval(function(){if(lr.pf&&dr.xhrs&&dr.xhrs.length){var t=[];if(o(dr.xhrs,function(e){t.push(e)}),t=x(t,function(t){return(xi.indexOf?xi.indexOf(t):S(xi,t))<0}),t&&t.length){xi=t;var e=null;cr.ulabel&&(e={ulabel:cr.ulabel}),oi.emit("send","/xhr1",e,{xhr:t},function(){dr.xhrs=x(dr.xhrs,function(e){return(t.indexOf?t.indexOf(e):S(t,e))<0})}),$e()&&!window.XDomainRequest&&(dr.xhrs=[])}}},_i)}function xe(t){if(t&&je(t)){var e=t.du;e||(e=t.status>0&&t.end&&t.start?t.end-t.start:0);var n={req:t.method+" "+t.url,start:t.start,du:e,cb:t.cb||0,status:t.status||0,err:t.err||0,rec:t.rec||0,send:t.send||0,type:bn};dr.xhrs||(dr.xhrs=[]),dr.xhrs.push(n)}}function be(){return Xn.disable_ajax||(ve(),ye()),_e()}function Se(){return Si||{}}function Ee(t,e){je(e)||(e={}),t&&t.beforeEach&&t.afterEach&&(t.beforeEach(function(t,e,n){var r=t.path;Ei[r]&&!Ei[r].e||(Ei[r]=gt({key:r})),n()}),t.afterEach(function(t,n){var r=t.path;setTimeout(function(){var t=Ei[r];!t||t.called||t.e||(e&&e.status===An?t.fail():t.end())},e.endDelay||Mn)}))}function we(t,e){var n;if(je(t))n=t;else{if(!Ne(t)||void 0===e)throw new zn(Sr);n={},n[t]=e}return o(n,function(t,e){e in wi?cr[wi[e]]=t:cr[e]=t}),this}function Te(t){if(t){var e=cr.firstScreenResources=cr.firstScreenResources||[];Ae(t)||(t=[t]),o(t,function(t){if(Ne(t))e.push(t);else if(ui(t)){var n=t.src||t.href;n&&e.push(n)}})}}function ke(t){Ae(t)||(t=[t]),o(t,function(t){if(t){if(!(t instanceof RegExp))throw new zn("parameter's type requires RegExp");(Fn.domains||(Fn.domains=[])).push(t)}})}function Ce(t){vr&&(vr.did=t)}function Oe(t,e){if(t){var n=t.split("_"),r=n[0],i=n[1];"ty"===r&&i&&X(i,{timestamp:k(),data:e})}}function Ie(){if(Object.defineProperty){var t=e[ln];Object.defineProperty(e,ln,{get:function(){return Ci++>0&&e.console&&console.warn("window.%s is deprecated, use window.%s instead.",ln,dn),t}})}}function Re(){return oi.start()&&(ri(),be(),re()),oi._end=k(),P(function(){ur._end=oi._end}),Ie(),Ti}var qe,Me,Ne=s("String"),Ae=s("Array"),He=s("Function"),je=s("Object"),De=s("Number"),Le=s("Undefined"),Be=s("Headers"),ze=s("Request"),Pe=[].slice,Ue='"',Fe=/([\"\\])/g,Xe=/\n/g,Ge=e.JSON;Ge&&Ge.parse&&Ge.stringify?(qe=r,Me=i):(qe=u,Me=c);var Ye,We;e.addEventListener?(Ye=l,We=d):(Ye=h,We=v);var Je=e.encodeURIComponent,$e=function(){return!document.addEventListener},Ke=e.location.protocol,Ve="http:",Qe=function(){function t(t){return t<0?NaN:t<=30?0|Math.random()*(1<<t):t<=53?(0|Math.random()*(1<<30))+(0|Math.random()*(1<<t-30))*(1<<30):NaN}function e(t,e){for(var n=t.toString(16),r=e-n.length,i="0";r>0;r>>>=1,i+=i)1&r&&(n=i+n);return n}return function(){return e(t(32),8)+"-"+e(t(16),4)+"-"+e(16384|t(12),4)+"-"+e(32768|t(14),4)+"-"+e(t(48),12)}}();q.prototype={on:function(t,e){var n=this;return Ne(t)?(n.events[t]||(n.events[t]=[])).push(e):Ae(t)&&o(t,function(t){n.on(t,e)}),n},off:function(t,e){var n=arguments.length,r=this;if(0===n)return r.events={},r;var i=r.events[t];if(!i)return r;if(1===n)return r.events[t]=null,r;for(var a,o=i.length;o--;)if(a=i[o],a===e){i.splice(o,1);break}return r},emit:function(t){var e=[].slice.call(arguments,1),n=this.events[t];return n&&o(n,function(t){return t.apply(this,e)}),this},unshift:function(t,e){var n=this;return(n.events[t]||(n.events[t]=[])).unshift(e),n}};var Ze="error",tn="load",en="unload",nn="beforeunload",rn="pagehide",an="readystatechange",on="complete",sn="on",un="TY_DISTINCT_ID",cn="TY_SESSION_ID",fn=86400,ln="_ty_rum",dn="TINGYUN",hn=2,vn="__ign",pn="__ty_aysncWrap__",gn="ty_",mn="X-Tingyun-Id",yn="X-Tingyun-Tx-Data",_n="XHR",xn="FETCH",bn="CUSTOM_AJAX",Sn="ty_rum_path",En="__TINGYUN",wn=64512,Tn=["trace","debug","info","warn","error"],kn=18e5,Cn="|",On="__TY_SPE_STORE",In=6e4,Rn="auto",qn="defined",Mn=200,Nn="success",An="fail",Hn="paint",jn="first-paint",Dn="largest-contentful-paint",Ln=5e3,Bn=1e4,zn=e.Error,Pn=e.document,Un=e.XMLHttpRequest,Fn={};t(Fn);var Xn=Fn.server||{},Gn={fp_threshold:2e3,fs_threshold:4e3,dr_threshold:4e3};Xn=_(Gn,Xn,e[En]&&e[En].config||{});var Yn=M("ignore_err"),Wn=M("debug"),Jn=e.location,$n=e.navigator,Kn=e.HTMLElement,Vn=function(){try{var t=Qe();return e.localStorage.setItem(t,t),e.localStorage.removeItem(t),!0}catch(n){return!1}}(),Qn={};Qn.localStorage=Vn,function(){function t(){var t,f,l=Pn.documentElement;l.appendChild(u),c.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",n=i=s=!1,r=o=!0,e.getComputedStyle&&(f=e.getComputedStyle(c),n="1%"!==(f||{}).top,s="2px"===(f||{}).marginLeft,i="4px"===(f||{width:"4px"}).width,c.style.marginRight="50%",r="4px"===(f||{marginRight:"4px"}).marginRight,t=c.appendChild(Pn.createElement("div")),t.style.cssText=c.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",t.style.marginRight=t.style.width="0",c.style.width="1px",o=!parseFloat((e.getComputedStyle(t)||{}).marginRight),c.removeChild(t)),c.style.display="none",a=0===c.getClientRects().length,a&&(c.style.display="",c.innerHTML="<table><tr><td></td><td>t</td></tr></table>",t=c.getElementsByTagName("td"),t[0].style.cssText="margin:0;border:0;padding:0;display:none",a=0===t[0].offsetHeight,a&&(t[0].style.display="",t[1].style.display="none",a=0===t[0].offsetHeight)),l.removeChild(u)}var n,r,i,a,o,s,u=(Pn.documentElement,Pn.createElement("div")),c=Pn.createElement("div");c.style&&(c.style.cssText="float:left;opacity:.5",Qn.opacity="0.5"===c.style.opacity,Qn.cssFloat=!!c.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",Qn.clearCloneStyle="content-box"===c.style.backgroundClip,u=Pn.createElement("div"),u.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",c.innerHTML="",u.appendChild(c),Qn.boxSizing=""===c.style.boxSizing||""===c.style.MozBoxSizing||""===c.style.WebkitBoxSizing,Qn.reliableHiddenOffsets=function(){return null==n&&t(),a})}();var Zn,tr;Qn.localStorage?(Zn=function(t){return e.localStorage.getItem(t)},tr=function(t,n){return e.localStorage.setItem(t,n),n}):(Zn=N,tr=A);var er,nr=function(){var t=e.navigator.standalone,n=e.navigator.userAgent.toLowerCase(),r=/safari/.test(n),i=/iphone|ipod|ipad/.test(n);return i&&!t&&!r},rr="display:none",ir="POST",ar=L;e.XDomainRequest?er=H:$e()?er=D:$n.sendBeacon?ar=er=B:er=L;var or=nr();or&&(ar=er=L);var sr=Wn,ur={start:n,e:{},an:{count:0},visible:[]},cr={},fr={},lr={pf:!1,poMetricCollected:!1,pfWaitingPoMetric:!1},dr={uniqueId:0,xhrs:[]},hr={recording:!1,xhrs:[]},vr={},pr={},gr={},mr={},yr=e.screen;yr&&(mr.sh=yr.height,mr.sw=yr.width);var _r=[],xr=[],br="{0} not support",Sr="illegal argument",Er=function(t){var e=[];return o(t,function(t){try{e.push(new RegExp(t))}catch(n){G(n&&n.message)}}),e}(Xn.custom_urls),wr=Er.length?function(t){var e=t.url;!oi.ct&&e&&o(Er,function(n){if(e.match(n))return oi.ct=t.end,!1})}:T,Tr=1,kr=2,Cr=4,Or=8,Ir=tt.prototype;Ir.create=Ir.before=Ir.after=Ir.error=null;var Rr;ot.prototype={createContext:function(){return Object.create?Object.create(this.active):at(this.active)},get:function(t){if(this.active)return this.active[t]},set:function(t,e){if(this.active)return this.active[t]=e},enter:function(t){if(!t)throw new zn("context required!");this._set.push(this.active),this.active=t},exit:function(t){if(!t)throw new zn("context required!");if(t===this.active)return void(this.active=this._set.pop());var e=this._set.lastIndexOf?this._set.lastIndexOf(t):E(this._set,t);if(e<0)throw new zn("context not currently entered!");this._set.splice(e,1)},bind:function(t,e){e||(e=this.active?this.active:this.createContext());var n=this;return function(){n.enter(e);try{return t.apply(this,arguments)}catch(r){try{var i="moduleId";r[i]=e[i]}catch(a){}throw r}finally{n.exit(e)}}}};var qr,Mr=!1,qr=ut(),Nr="undefined"!=typeof e.console,Ar=ct.prototype;Ar.fail=Ar.end=T;var Hr=ft.prototype;Hr.end=Hr.finish=Hr.fail=null,Hr.send=function(t){this.sent=!0;var e=this.getEventData(t);oi.emit("send","/spe",null,e,T)},Hr.getEventData=function(t){var e=this,n=t.event&&t.event.xhrs||[];return o(n,function(t){t.start=t.start-e.s}),{key:e.key,start:e.s,duration:e.e-e.s,status:e.status,type:e.type,xhrs:n}},Hr.refreshEventAndStore=function(t){this.finish();var n=this.getEventData(t);e.localStorage.setItem(On,Me(n))};var jr={},Dr="requestStart",Lr="responseStart",Br="responseEnd",zr="domContentLoadedEventStart",Pr="domContentLoadedEventEnd",Ur="domInteractive",Fr="domComplete",Xr="loadEventStart",Gr="loadEventEnd",Yr="unloadEventStart",Wr="unloadEventEnd",Jr="domainLookupStart",$r="domainLookupEnd",Kr="redirectStart",Vr="redirectEnd",Qr="connectStart",Zr="connectEnd",ti="secureConnectionStart",ei=Et(Fn);ei&&ei.ulabel&&(cr.ulabel=ei.ulabel);var ni=C(function(){function t(t){return t?"1":"0"}var r=e.performance,i=!!r;i||Y(b(br,["pf"]));var a=St(ei),s=r&&r.timing,u=_(_t(s),a,cr),c=_({},mr);c.ressize=!!s,oi.fp?(c.fp=oi.fp,i&&oi.fp>oi._le&&(Y("fp>le"),c.fp=wt(r,c))):i?c.fp=wt(r,c):c.fp=c.__fp=0,c.dr=Mt(s),i?c.fs=Tt(r,s,c.fp,c):c.__fs=0;var f="",l=At(),d=_(u,c)||{};l&&o(l,function(t,e){De(t)&&t>=0&&(d[e]=t)});var h;if(i){var v="trace",p=Math.max(d.ls,0);p||(p=yt()-s.navigationStart||n),d[v]=p;var g=Nt(s);o(["fp","fs","dr",v],function(e){f+=t((g?d[e]-g:d[e])>=Xn[e+"_threshold"])}),delete d[v],f.indexOf("1")>-1&&(h=xt(r,s)),l&&(h||(h={}),h.mark=l)}d.trflag=f||"0000",fr.pfStart=k(),delete d.firstScreenResources,delete d.resources,h&&(h=Ht(h,150)),oi.emit("send","/pf",d,h,function(){Y("pf sent!"),oi.xhrs=oi.errs=null,lr.pf=!0,Z(),setTimeout(pt,Xn.crosspage_ajax_store_time||Bn)})}),ri=function(){return ii.on(tn,function(){var t=0;if(Xn.pfDelay&&je(Xn.pfDelay)){var e=At();o(Xn.pfDelay,function(n,r){(!e||null==e[r])&&De(n)&&n>t&&(t=n)})}setTimeout(jt,t)}).on([en,nn,rn],jt)};!function(){if(Wn){var t,e,n="visibilitychange";Le(Pn.hidden)?Le(Pn.msHidden)?Le(Pn.webkitHidden)||(t="webkitHidden",e="webkit"+n):(t="msHidden",e="ms"+n):(t="hidden",e=n),Le(Pn.addEventListener)||Le(Pn[t])||Ye(Pn,e,U(function(){ur.visible.push([Pn[t],k()])}))}}();var ii=new q,ai=zt.prototype;ai.start=function(){if(!Xn.key)return G("missing config, agent disabled!"),!1;var t=e[ln]||e[dn];return t&&t.server?(G("already loaded!"),!1):(Bt(),vt(),this)},_(ai,q.prototype);var oi=new zt;oi.on("send",function(t,e,n,r){Yt();var i=R(Xn.beacon,t,_({},si,e||{},vr||{}));switch(r=r||T,t){case"/pf":n?er(i,n,function(){oi.xhrs=oi.errs=null,r()}):ar(i,void 0,r);break;default:er(i,n,r)}});var si={pvid:Qe(),ref:Pn.URL,referrer:Pn.referrer,key:Xn.key,v:"1.8.5",av:"1.8.5",did:Pt(),sid:Xt()};}