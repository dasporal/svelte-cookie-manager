import { browser } from '$app/environment';
import type { DetailedCookieConsent } from '$lib/types.js';

let storedConsent = $derived.by(() => {
	if (!browser) return null;

	const item = localStorage.getItem('cookie-consent');
	return item ? (JSON.parse(item) as DetailedCookieConsent) : null;
});

export function getCurrentConsent(): DetailedCookieConsent | null {
	return storedConsent;
}

export function hasConsentFor(category: keyof DetailedCookieConsent): boolean {
	const consent = getCurrentConsent();
	return consent?.[category]?.consented ?? false;
}
