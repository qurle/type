const addResourcesToCache = async (resources) => {
	const cache = await caches.open('v1');
	await cache.addAll(resources);
};

const putInCache = async (request, response) => {
	if (request.method !== 'GET') return
	const cache = await caches.open('v1');
	await cache.put(request, response);
};

const networkFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {

	// First try to get the resource from the network
	try {
		const responseFromNetwork = await fetch(request.clone());
		// response may be used only once
		// we need to save clone to put one copy in cache
		// and serve second one
		putInCache(request, responseFromNetwork.clone());
		return responseFromNetwork;
	} catch (error) {
		// If that fails, use resource from the cache
		const responseFromCache = await caches.match(request);
		if (responseFromCache) {
			return responseFromCache;
		}

		const fallbackResponse = await caches.match(fallbackUrl);
		if (fallbackResponse) {
			return fallbackResponse;
		}
		// when even the fallback response is not available,
		// there is nothing we can do, but we must always
		// return a Response object
		return new Response('Network error happened', {
			status: 408,
			headers: { 'Content-Type': 'text/plain' },
		});
	}

	// First try to get the resource from the cache
	const responseFromCache = await caches.match(request);
	if (responseFromCache) {
		return responseFromCache;
	}
};

const enableNavigationPreload = async () => {
	if (self.registration.navigationPreload) {
		// Enable navigation preloads!
		await self.registration.navigationPreload.enable();
	}
};

self.addEventListener('activate', (event) => {
	if (!event.request?.url.startsWith('http')) {
		return
	}
	event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
	event.waitUntil(
		addResourcesToCache([
			'./',
			'./fav/favicon.svg',
		])
	);
});

self.addEventListener('fetch', (event) => {
	if (!event.request?.url.startsWith('http')) {
		return
	}
	event.respondWith(
		networkFirst({
			request: event.request,
			preloadResponsePromise: event.preloadResponse,
			fallbackUrl: './fav/favicon.svg',
		})
	);
});

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
	// First try to get the resource from the cache
	const responseFromCache = await caches.match(request);
	if (responseFromCache) {
		return responseFromCache;
	}

	// Next try to use the preloaded response, if it's there
	// NOTE: Chrome throws errors regarding preloadResponse, see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1420515
	// https://github.com/mdn/dom-examples/issues/145
	// To avoid those errors, remove or comment out this block of preloadResponse
	// code along with enableNavigationPreload() and the "activate" listener.
	const preloadResponse = await preloadResponsePromise;
	if (preloadResponse) {
		console.debug('using preload response', preloadResponse);
		putInCache(request, preloadResponse.clone());
		return preloadResponse;
	}

	// Next try to get the resource from the network
	try {
		const responseFromNetwork = await fetch(request.clone());
		// response may be used only once
		// we need to save clone to put one copy in cache
		// and serve second one
		putInCache(request, responseFromNetwork.clone());
		return responseFromNetwork;
	} catch (error) {
		const fallbackResponse = await caches.match(fallbackUrl);
		if (fallbackResponse) {
			return fallbackResponse;
		}
		// when even the fallback response is not available,
		// there is nothing we can do, but we must always
		// return a Response object
		return new Response('Network error happened', {
			status: 408,
			headers: { 'Content-Type': 'text/plain' },
		});
	}
}