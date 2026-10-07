const CACHE_NAME="lme-scrap-v2-1-20261007";
const ASSETS=[
 "./",
 "./index.html?v=20261007v21",
 "./manifest.json?v=20261007v21",
 "./icon-180.png?v=20261007v21",
 "./icon-512.png?v=20261007v21"
];
self.addEventListener("install",event=>{
 self.skipWaiting();
 event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET") return;
 event.respondWith(
  fetch(event.request).then(res=>{
   const copy=res.clone();
   caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)).catch(()=>{});
   return res;
  }).catch(()=>caches.match(event.request).then(r=>r||caches.match("./")))
 );
});
