import toolbox from 'sw-toolbox';

var version = 2;
var cacheList = ['static', 'posts', 'comments', 'html', 'manifest'];
var currentCaches = {};
cacheList.forEach(cache => {
	currentCaches[cache] = cache + version;
});

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(`posts${version}`).then(cache => {
			cache.addAll([
				'/r/popular.json'
			]);
			return self.skipWaiting();
		})
	);
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

toolbox.router.get('/*\.js', toolbox.fastest, {
    cache: {
        name: currentCaches['static'],
        maxEntries: 2
    }
});
toolbox.router.get('/r/:subreddit/comments/:post_id/*', toolbox.fastest, {
    origin: 'https://www.reddit.com',
    cache: {
        name: currentCaches['comments'],
        maxEntries: 20
    }
});
toolbox.router.get('/r/*', toolbox.fastest, {
    origin: 'https://www.reddit.com',
    cache: {
        name: currentCaches['posts'],
        maxEntries: 10
    }
});
toolbox.router.get('/', toolbox.fastest, {
    cache: {
        name: currentCaches['html'],
        maxEntries: 1
    }
});
toolbox.router.get('/manifest.json', toolbox.fastest, {
    cache: {
        name: currentCaches['manifest'],
        maxEntries: 1
    }
});
