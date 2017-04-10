import toolbox from 'sw-toolbox';

var version = 2;
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

// toolbox.router.get('/*\.js', toolbox.cacheFirst, {
//     cache: {
//         name: currentCaches['static'],
//         maxEntries: 2,
//         maxAgeSeconds: 60 * 60 * 24
//     }
// });
toolbox.router.get('/r/:subreddit/comments/:post_id/*', toolbox.fastest, {
    origin: 'https://www.reddit.com',
    cache: {
        name: currentCaches['comments'],
        maxAgeSeconds: 60 * 60 * 24
    }
});
toolbox.router.get('/r/*', toolbox.fastest, {
    origin: 'https://www.reddit.com',
    cache: {
        name: currentCaches['posts'],
        maxAgeSeconds: 60 * 60 * 24
    }
});
