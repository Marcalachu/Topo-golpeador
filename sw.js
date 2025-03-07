
// Service Worker para aplicación offline
const CACHE_NAME = 'topo-quiz-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './images/topo.png',
  './sounds/correct-choice-43861.mp3',
  './sounds/incorrect-293358.mp3',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
