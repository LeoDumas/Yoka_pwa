if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const l=e=>s(e,t),d={module:{uri:t},exports:o,require:l};i[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-bpx0K_gX.css",revision:null},{url:"assets/index-C-ALGqri.js",revision:null},{url:"index.html",revision:"90ea343e07efb29080293dda1737db98"},{url:"registerSW.js",revision:"aa37f5eb9ab2974515b769d18d552d00"},{url:"manifest.webmanifest",revision:"9bcbe140ce2bea0c2e5e284e278c1cc2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
