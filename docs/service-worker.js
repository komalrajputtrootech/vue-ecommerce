if(!self.define){let e,r={};const c=(c,o)=>(c=new URL(c+".js",o).href,r[c]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=r,document.head.appendChild(e)}else e=c,importScripts(c),r()})).then((()=>{let e=r[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(o,s)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(r[i])return;let n={};const u=e=>c(e,i),l={module:{uri:i},exports:n,require:u};r[i]=Promise.all(o.map((e=>l[e]||u(e)))).then((e=>(s(...e),n)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"ecommerce-app"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/vue-ecommerce/css/app.c415e03e.css",revision:null},{url:"/vue-ecommerce/css/chunk-vendors.32ba7086.css",revision:null},{url:"/vue-ecommerce/fonts/primeicons.29151a74.woff",revision:null},{url:"/vue-ecommerce/fonts/primeicons.5f5d08cd.ttf",revision:null},{url:"/vue-ecommerce/fonts/primeicons.964f445f.eot",revision:null},{url:"/vue-ecommerce/img/color.dae87a04.png",revision:null},{url:"/vue-ecommerce/img/primeicons.76044b1c.svg",revision:null},{url:"/vue-ecommerce/index.html",revision:"fa3c339d91498c446f7c8ef74cf00713"},{url:"/vue-ecommerce/js/about.2125a4da.js",revision:null},{url:"/vue-ecommerce/js/app.abbe77bd.js",revision:null},{url:"/vue-ecommerce/js/chunk-vendors.b95ed02e.js",revision:null},{url:"/vue-ecommerce/manifest.json",revision:"878980cfcbf7ddb1f70f3c804e8871da"},{url:"/vue-ecommerce/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map