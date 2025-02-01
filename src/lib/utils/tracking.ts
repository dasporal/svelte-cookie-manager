let originalXhrOpen = typeof window !== 'undefined' ? XMLHttpRequest.prototype.open : null;
let originalFetch = typeof window !== 'undefined' ? window.fetch : null;

export function blockTrackingRequests(blockedHosts: string[]) {
	if (typeof window === 'undefined') return; // Ensure it runs only in the browser

	XMLHttpRequest.prototype.open = function (method, url) {
		if (blockedHosts.some((host) => url.includes(host))) return;
		return originalXhrOpen?.apply(this, arguments);
	};

	window.fetch = function (url, options) {
		if (blockedHosts.some((host) => url.toString().includes(host))) {
			return Promise.resolve(new Response(null, { status: 403, statusText: 'Blocked' }));
		}
		return originalFetch?.apply(this, arguments);
	};
}

export function blockTrackingScripts(trackingKeywords: string[]) {
	document.querySelectorAll('script').forEach((script) => {
		if (trackingKeywords.some((keyword) => script.src.includes(keyword))) {
			script.remove();
		}
	});

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (
					node.tagName === 'SCRIPT' &&
					trackingKeywords.some((keyword: string) => node.src.includes(keyword))
				) {
					node.remove();
				}
			});
		});
	});

	observer.observe(document.documentElement, { childList: true, subtree: true });
	return observer;
}

export function restoreOriginalRequests() {
	XMLHttpRequest.prototype.open = originalXhrOpen;
	window.fetch = originalFetch;
}
