if(!self.define){let e,c={};const s=(s,i)=>(s=new URL(s+".js",i).href,c[s]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=c,document.head.appendChild(e)}else e=s,importScripts(s),c()})).then((()=>{let e=c[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(c[t])return;let n={};const r=e=>s(e,t),d={module:{uri:t},exports:n,require:r};c[t]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(a(...e),n)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/145-3e3170c45b2e3b57.js",revision:"3e3170c45b2e3b57"},{url:"/_next/static/chunks/245-26d238eaacea0c2e.js",revision:"26d238eaacea0c2e"},{url:"/_next/static/chunks/29107295-fbcfe2172188e46f.js",revision:"fbcfe2172188e46f"},{url:"/_next/static/chunks/651.8dc8555b8c1c2ed4.js",revision:"8dc8555b8c1c2ed4"},{url:"/_next/static/chunks/726-a1e917835fb78029.js",revision:"a1e917835fb78029"},{url:"/_next/static/chunks/920-4aac0d0b958246f5.js",revision:"4aac0d0b958246f5"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-24a85f369ffdb971.js",revision:"24a85f369ffdb971"},{url:"/_next/static/chunks/pages/_app-d63e432396de5ade.js",revision:"d63e432396de5ade"},{url:"/_next/static/chunks/pages/_error-9a690a4e194ba967.js",revision:"9a690a4e194ba967"},{url:"/_next/static/chunks/pages/call-a364470e87783549.js",revision:"a364470e87783549"},{url:"/_next/static/chunks/pages/call/ReceiveCall-1e0a20f4e185e313.js",revision:"1e0a20f4e185e313"},{url:"/_next/static/chunks/pages/call/SendCall-02c12789b7f9ebad.js",revision:"02c12789b7f9ebad"},{url:"/_next/static/chunks/pages/createCall-f4bfc93cb9d9f250.js",revision:"f4bfc93cb9d9f250"},{url:"/_next/static/chunks/pages/login-301ce380a9ee2161.js",revision:"301ce380a9ee2161"},{url:"/_next/static/chunks/pages/member-2b6f5b2dbccee38a.js",revision:"2b6f5b2dbccee38a"},{url:"/_next/static/chunks/pages/member/ReservedMember-8c8617e3fd8ad87b.js",revision:"8c8617e3fd8ad87b"},{url:"/_next/static/chunks/pages/member/VisitedMember-6bcd2a51dcf4566e.js",revision:"6bcd2a51dcf4566e"},{url:"/_next/static/chunks/pages/reward-7f538febc3e89e45.js",revision:"7f538febc3e89e45"},{url:"/_next/static/chunks/pages/reward/RewardItem-5dbb395f04973ec3.js",revision:"5dbb395f04973ec3"},{url:"/_next/static/chunks/pages/support-7d2c570d57693286.js",revision:"7d2c570d57693286"},{url:"/_next/static/chunks/pages/support/AskSupport-b6fa07b60b94b159.js",revision:"b6fa07b60b94b159"},{url:"/_next/static/chunks/pages/support/QaSupport-8d59cc92bf18c388.js",revision:"8d59cc92bf18c388"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d1a0618aef73ba2c.js",revision:"d1a0618aef73ba2c"},{url:"/_next/static/css/069c2c39e7bfb1b1.css",revision:"069c2c39e7bfb1b1"},{url:"/_next/static/lMGl217uXi4QHub3z6ejv/_buildManifest.js",revision:"56ec53ec29007ca1ffb15799625132bf"},{url:"/_next/static/lMGl217uXi4QHub3z6ejv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/ic-arrow-down.b56b582a.svg",revision:"ce88e4d34a1c5e0dcd6d39096dcb8a69"},{url:"/_next/static/media/ic-arrow-up.a9904615.svg",revision:"42151a6483902709c4e3e5b2dd2a7234"},{url:"/_next/static/media/ic-bell-surface.42f4e2f9.svg",revision:"18c4a7ed27f294b7aaf70a8e34509fa5"},{url:"/_next/static/media/ic-bell.33f5e4c3.svg",revision:"ccd874f3cfbb08cc91b127dfc9dc9a58"},{url:"/_next/static/media/ic-calendar-n.2eb07d97.svg",revision:"32a6cdb5455e9c09e50e7070f4bdae50"},{url:"/_next/static/media/ic-check.d4a47936.svg",revision:"d3428af98af61d103f9868258083a78a"},{url:"/_next/static/media/ic-chevron-down.026be98c.svg",revision:"a921e08e89d68c84e744e2f5d4dccdea"},{url:"/_next/static/media/ic-chevron-left.0e363d65.svg",revision:"64dcc764c4642a4d56ba327a31e65f7d"},{url:"/_next/static/media/ic-chevron-right.b867afab.svg",revision:"2ba7b51eea869f0961c657a2b1c27170"},{url:"/_next/static/media/ic-chevron-up.4a8ba25f.svg",revision:"e03a743cf371879fd159d2b102f0b888"},{url:"/_next/static/media/ic-circle-cancel.fc90e626.svg",revision:"eedc288e2f1b75a81dd5612e0ebeb263"},{url:"/_next/static/media/ic-circle-check.3201f46e.svg",revision:"7046b71a678ae094fc562a0f185126e9"},{url:"/_next/static/media/ic-clock-deadline.ceec99c5.svg",revision:"f6ba58015befdfd26831e441d85f8e79"},{url:"/_next/static/media/ic-clock-done.331a75fa.svg",revision:"b9d0d8b8616d6d6ed90ad85de1b0db1b"},{url:"/_next/static/media/ic-clock.5449c9bd.svg",revision:"087c26ce9f7abea7c333f7bb61a52107"},{url:"/_next/static/media/ic-close.ea621db4.svg",revision:"86c555bb94387085ced2f411ec9d9ae7"},{url:"/_next/static/media/ic-edit.3572bd6a.svg",revision:"1a9498ca3bbf1f9cc745f753f03cf8b1"},{url:"/_next/static/media/ic-eye-off.9d778e21.svg",revision:"54ef32a19d4475f1d14cd42562f2b673"},{url:"/_next/static/media/ic-eye-on.28401fb9.svg",revision:"4df1c19100a84b4f11b8c7c777788077"},{url:"/_next/static/media/ic-help.b7612886.svg",revision:"88cb1363b78b9d8d92708bc4d362c502"},{url:"/_next/static/media/ic-list-filter.3df50982.svg",revision:"227675b2b49fb3c57c6fc0dbd6044a70"},{url:"/_next/static/media/ic-map-pin.ffa1fd0a.svg",revision:"2149959e3ce63fe90a798f4ac93550c9"},{url:"/_next/static/media/ic-offer.72fc3b9e.svg",revision:"b1c77f65c183b0347cfdc16e88e4aa0e"},{url:"/_next/static/media/ic-out.97418aef.svg",revision:"e5a97a5ef50018c4fff85c4d6558522e"},{url:"/_next/static/media/ic-point-2.8898d297.svg",revision:"98e68880665901817f8b341b3072c510"},{url:"/_next/static/media/ic-point.e18b5da5.svg",revision:"2639d57e4f76e544f82c44de37718bb5"},{url:"/_next/static/media/ic-qa.46e2e728.svg",revision:"bcbd91e82df5cd107a8ef0248f9ffa94"},{url:"/_next/static/media/ic-search.51ebf046.svg",revision:"d897b7082861322b414253985c58dd46"},{url:"/_next/static/media/ic-set-ok.7afda66c.svg",revision:"3f60102df2d4b43645960f717ca8e661"},{url:"/_next/static/media/ic-trash.07cf0694.svg",revision:"5018cfd5e04020bf3362def05ea8f942"},{url:"/_next/static/media/ic-user-list.1afc60dd.svg",revision:"2c360e8893d74a1fe046025497010e0c"},{url:"/_next/static/media/ic-user-now.b004fe05.svg",revision:"5307c2fdeaf34be5f6bfac4908539912"},{url:"/_next/static/media/ic-user-v.9931a569.svg",revision:"b0d59817c5a99438e64f633530a57159"},{url:"/_next/static/media/ic-user.c6cf646e.svg",revision:"e79a556a822bf077985d4a8c1b4c65e0"},{url:"/_next/static/media/ic-users.13730a64.svg",revision:"9864cef404db97abc848e6b014f39cb7"},{url:"/_next/static/media/ic-warning.cb74d341.svg",revision:"5975d248a1d00c37ee106caed76379fd"},{url:"/_next/static/media/img-login-bg.325440f2.svg",revision:"7be3c37c75f476b5a1c2d71aec3815d7"},{url:"/_next/static/media/logo-icon.a1b9ba6b.svg",revision:"3e2b256c7728ab94570878007544decc"},{url:"/_next/static/media/logo-title.18c71482.svg",revision:"b4a6575a97c04103b6bb01df9bbec276"},{url:"/_next/static/media/mark-point-gray.4fd25870.svg",revision:"35e50c234e9f9c83b5d2b7aee74a39d1"},{url:"/_next/static/media/mark-point-yellow.2594ac61.svg",revision:"3080e8bb68b1ee6b502c6069a1c328de"},{url:"/_next/static/media/mark-q.4a9c31c2.svg",revision:"3bb1c54120a24a18c7dc57d236fcba7e"},{url:"/_next/static/media/mark-table-new.f80dc3cf.svg",revision:"5cd9c2c64db00d8b0dcc339a3ee2a29e"},{url:"/_next/static/media/service-gift-color.82422ff1.svg",revision:"19b1c15602a16b9a16141f65023a1f61"},{url:"/_next/static/media/service-gift-gray.1c3d52bc.svg",revision:"e0c73ad90c0515a7c45e61e2a0162e99"},{url:"/favicon.ico",revision:"24e3993c5ced1d7e104be6590a8eb784"},{url:"/firebase-messaging-sw.js",revision:"287193ac9f8bf6a7ed63067b2c7e9d5a"},{url:"/fonts/NotoSansKR-Black.otf",revision:"05c077164c27fa722dcafe63ed38355e"},{url:"/fonts/NotoSansKR-Bold.otf",revision:"e2406ff1791c401bc93e73d9e44e6d2b"},{url:"/fonts/NotoSansKR-Light.otf",revision:"e914a10a1bd0088fb8f743fc7569749f"},{url:"/fonts/NotoSansKR-Medium.otf",revision:"32666ae307200b0bcab5553590672bb1"},{url:"/fonts/NotoSansKR-Regular.otf",revision:"210989664066c01d8ffdbdf56bb773cd"},{url:"/fonts/NotoSansKR-Thin.otf",revision:"277434d967d5f33b857fc3f2dbaff15b"},{url:"/icons/logo-icon-white.png",revision:"bd28d5e61505d97c15232859ea5e0bf5"},{url:"/manifest.json",revision:"ad855abb2a1b2a68879f3d0d227c71f1"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:s,state:i})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const c=e.pathname;return!c.startsWith("/api/auth/")&&!!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
