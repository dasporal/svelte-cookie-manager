let cookieConsent: {
	hasConsent: null | boolean;
	isDeclined: boolean;
	detailedConsent: null | {
		Analytics: {
			consented: any;
			timestamp: string;
		};
		Social: {
			consented: any;
			timestamp: string;
		};
		Advertising: {
			consented: any;
			timestamp: string;
		};
	};
} = $state({
	hasConsent: null,
	isDeclined: false,
	detailedConsent: null
});

export function getCookieConsent() {
	return cookieConsent;
}

export function showConsentBanner() {
	cookieConsent = { ...cookieConsent, hasConsent: null };
}

export let acceptCookies = () => {
	const newConsent = createDetailedConsent(true);
	localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
	cookieConsent = {
		hasConsent: true,
		isDeclined: false,
		detailedConsent: newConsent
	};
};

export let declineCookies = () => {
	const newConsent = createDetailedConsent(false);
	localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
	cookieConsent = {
		hasConsent: false,
		isDeclined: true,
		detailedConsent: newConsent
	};
};

let createDetailedConsent = (consented: boolean) => ({
	Analytics: { consented, timestamp: new Date().toISOString() },
	Social: { consented, timestamp: new Date().toISOString() },
	Advertising: { consented, timestamp: new Date().toISOString() }
});
