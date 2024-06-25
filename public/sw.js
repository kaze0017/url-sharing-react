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
