import { BROWSER } from 'esm-env';
import type { CookieCategories, DetailedCookieConsent } from '$lib/types.js';

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
		if (!BROWSER) return null;
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
		get simplifiedConsent(): CookieCategories | null {
			if (!cookieConsent.detailedConsent) return null;

			return {
				Analytics: cookieConsent.detailedConsent.Analytics.consented,
				Social: cookieConsent.detailedConsent.Social.consented,
				Advertising: cookieConsent.detailedConsent.Advertising.consented
			};
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
		updateDetailedConsent(preferences: DetailedCookieConsent) {
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

export const themeStore = (() => {
	let theme: 'light' | 'dark' | null = $state(
		BROWSER ? localStorage.getItem('cookie-theme') : null
	) as 'light' | 'dark' | null;

	return {
		get value(): 'light' | 'dark' | null {
			return theme;
		},
		set value(newTheme: 'light' | 'dark') {
			theme = newTheme;
			if (BROWSER) {
				localStorage.setItem('cookie-theme', newTheme);
			}
		},
		toggle() {
			theme = theme === 'light' ? 'dark' : 'light';
			if (BROWSER) {
				localStorage.setItem('cookie-theme', theme);
			}
		}
	};
})();

export const displayTypeStore = (() => {
	let displayType: 'popup' | 'banner' | 'modal' | null = $state(
		BROWSER ? localStorage.getItem('cookie-display') : null
	) as 'popup' | 'banner' | 'modal' | null;

	return {
		get value(): 'popup' | 'banner' | 'modal' | null {
			return displayType;
		},
		set value(newDisplayType: 'popup' | 'banner' | 'modal') {
			displayType = newDisplayType;
			if (BROWSER) {
				localStorage.setItem('cookie-display', newDisplayType);
			}
		}
	};
})();
