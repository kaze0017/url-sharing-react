console.warn("Service Worker: Registered");

let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/0.chunk.js",
        "/static/js/main.chunk.js",
        "/index.html",
        "/",
        "/users",
        "/faveicon.ico",
        "/logo192.png",
        "/logo512.png",
        "/logo/URLSHARE.png",
        "/static/media/bg-2.c42f954ff807073207c1.jpg",
        "/images/logos/googleplay.png",
        "/images/logos/appstore.png",
      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});


const CACHE_NAME = "api-cache";
const API_URL = "/api/notifications";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes(API_URL)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});

