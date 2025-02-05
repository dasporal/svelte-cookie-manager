import { browser } from '$app/environment';
import type { DetailedCookieConsent } from '$lib/types.js';

export const storedConsent = (() => {
	let cookieConsent = $state({
		hasConsent: null as null | boolean,
		isDeclined: false,
		detailedConsent: loadStoredConsent()
	});

	function createDetailedConsent(consented: boolean): DetailedCookieConsent {
		const timestamp = new Date().toISOString();
		return {
			Analytics: { consented, timestamp },
			Social: { consented, timestamp },
			Advertising: { consented, timestamp }
		};
	}

	function loadStoredConsent() {
		if (!browser) return null;
		const item = localStorage.getItem('cookie-consent');
		return item ? (JSON.parse(item) as DetailedCookieConsent) : null;
	}

	return {
		get value() {
			return cookieConsent.detailedConsent;
		},
		getCookieConsent() {
			return cookieConsent;
		},
		showConsentBanner() {
			cookieConsent.hasConsent = null;
		},
		acceptCookies() {
			const newConsent = createDetailedConsent(true);
			localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
			cookieConsent = {
				hasConsent: true,
				isDeclined: false,
				detailedConsent: newConsent
			};
		},
		declineCookies() {
			const newConsent = createDetailedConsent(false);
			localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
			cookieConsent = {
				hasConsent: false,
				isDeclined: true,
				detailedConsent: newConsent
			};
		},
		updateDetailedConsent(preferences) {
			const newConsent = {
				Analytics: {
					consented: preferences.Analytics.consented,
					timestamp: new Date().toISOString()
				},
				Social: { consented: preferences.Social.consented, timestamp: new Date().toISOString() },
				Advertising: {
					consented: preferences.Advertising.consented,
					timestamp: new Date().toISOString()
				}
			};

			localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
			cookieConsent.detailedConsent = newConsent;
		},
		hasConsentFor(category: keyof DetailedCookieConsent): boolean {
			return cookieConsent.detailedConsent?.[category].consented ?? false;
		},
		initialConsent: loadStoredConsent()
	};
})();

export const displayType = (() => {
	let displayType: 'popup' | 'banner' | 'modal' = $state('popup');

	return {
		get value(): 'popup' | 'banner' | 'modal' {
			return displayType;
		},
		set value(newDisplayType: 'popup' | 'banner' | 'modal') {
			displayType = newDisplayType;
		}
	};
})();

export const isVisible = (() => {
	let isVisible = $state(false);

	return {
		get value(): boolean {
			return isVisible;
		},
		set value(value: boolean) {
			isVisible = value;
		},
		toggle() {
			isVisible = isVisible === true ? false : true;
		}
	};
})();

export const displayManage = (() => {
	let isVisible = $state(false);

	return {
		get value(): boolean {
			return isVisible;
		},
		set value(value: boolean) {
			isVisible = value;
		},
		toggle() {
			isVisible = isVisible === true ? false : true;
		}
	};
})();

export const theme = (() => {
	let theme: 'light' | 'dark' = $state(
		browser ? (localStorage.getItem('cookie-theme') ?? 'dark') : 'dark'
	);

	return {
		get value(): 'light' | 'dark' {
			return theme;
		},
		set value(newTheme: 'light' | 'dark') {
			theme = newTheme;
			if (browser) {
				localStorage.setItem('cookie-theme', newTheme);
			}
		},
		toggle() {
			theme = theme === 'light' ? 'dark' : 'light';
			if (browser) {
				localStorage.setItem('cookie-theme', theme);
			}
		}
	};
})();
