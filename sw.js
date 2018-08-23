const cacheName = 'Assets';
const files = [
  '/',
  'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin',
  // 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/icon.min.css',
  // 'resources/vendors/semantic/themes/default/assets/fonts/icons.woff2',
  // 'https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPGQ.woff2',
  'resources/img/erdu-logo.svg',
  'resources/vendors/semantic/semantic.min.css',
  'resources/vendors/jquery/jquery-3.3.1.min.js',
  'resources/vendors/semantic/semantic.min.js',
  'resources/css/main.css',
  'resources/js/main.js',
  'resources/js/programs.json',
  'manifest.json'
];

self.addEventListener('install', event => {
  console.log('installing');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(files))
    .catch(error => console.log(error))
  )
});

self.addEventListener('activate', event => {
  console.log('Service Worker ready to handle fetches');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
    .catch(() => caches.match(event.request))
    // caches.match(event.request)
    // .catch(() => fetch(event.request))
    .catch(err => console.log(err))
  );
});