import toolbox from 'sw-toolbox';

var version = 1;
var cacheList = ['static', 'posts', 'comments'];
var currentCaches = {};
cacheList.forEach(cache => {
	currentCaches[cache] = cache + version;
});

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
	event.waitUntil(
		caches.keys().then(cacheNames => {
			let values = Object.keys(currentCaches).map(key => currentCaches[key]);
			return Promise.all(cacheNames.map(cacheName => {
				if ((values.indexOf(cacheName) === -1) && (cacheName.indexOf('$$$inactive$$$') === -1)) {
					return caches.delete(cacheName);
				} else {
					return Promise.resolve();
				}
			}));
		})
	);
});

toolbox.router.get('/*\.js', toolbox.cacheFirst, { cache: { name: currentCaches['static'] } });
toolbox.router.get('/r/:subreddit/comments/:post_id/*', toolbox.cacheFirst, { origin: 'https://www.reddit.com', cache: { name: currentCaches['comments'] } });
toolbox.router.get('/r/*', toolbox.cacheFirst, { origin: 'https://www.reddit.com', cache: { name: currentCaches['posts'] } });
