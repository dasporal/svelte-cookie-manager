import { browser } from '$app/environment';

let theme = $derived.by(() => {
	if (!browser) return null;

	return localStorage.getItem('cookie-theme') ?? 'dark';
});

export function getTheme(): 'light' | 'dark' {
	return theme;
}
