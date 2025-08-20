// This is a simple service worker for offline support
const CACHE_NAME = 'chess-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/chess-icon-192.png',
  '/chess-icon-512.png',
  '/styles.css',
  '/App.tsx',
  '/Chessboard.tsx',
  '/chessUtils.ts',
  '/MoveHistory.tsx',
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});