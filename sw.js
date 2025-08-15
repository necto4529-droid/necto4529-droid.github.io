// Simple offline cache for static assets
const CACHE = '2048pro-site-v1';
const ASSETS = [
  '/', '/index.html', '/styles.css', '/app.js',
  '/assets/icon.png',
  '/assets/banner/banner.jpg',
  '/assets/screenshots/shot-1.jpg',
  '/assets/screenshots/shot-2.jpg',
  '/assets/screenshots/shot-3.jpg',
  '/assets/screenshots/shot-4.jpg',
  '/assets/screenshots/shot-5.jpg',
  '/assets/screenshots/shot-6.jpg',
  '/manifest.webmanifest'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(e.request.method!=='GET'){ return; }
  // network-first for APK, cache-first for static
  if(url.pathname.endsWith('.apk')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
    const copy = resp.clone();
    caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
    return resp;
  }).catch(()=> r )));
});
