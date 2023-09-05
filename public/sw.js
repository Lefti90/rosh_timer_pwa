/* eslint-disable no-restricted-globals */
var cacheName = 'roshan-timer';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
        console.log('Cached from sw.js')
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
        console.log('Offline cache fetched from sw.js')
      return response || fetch(e.request);
    })
  );
});