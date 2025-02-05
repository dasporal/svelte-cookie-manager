<script lang="ts">
	import { browser } from '$app/environment';
	import CookieManager from '$lib/CookieManager.svelte';
	import '$lib/styles.css';
	import { getCurrentConsent } from '$lib/utils/cookie.svelte.js';
	import { getTheme } from '$lib/utils/theme.svelte.js';

	let displayType: 'popup' | 'banner' | 'modal' = $state('popup');
	let isVisible = $state(false);
	let currentConsent = $state(getCurrentConsent());
	let theme = $state(getTheme());
	let emoji = $derived(theme === 'light' ? '🌙' : '☀️');

	function showConsentBanner() {
		isVisible = true;
	}

	function setDisplayType(type: 'popup' | 'banner' | 'modal') {
		displayType = type;
	}

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<svelte:head>
	<title>Hypership Inspired Svelte Template</title>
</svelte:head>

<CookieManager
	title="Would You Like A Cookie? 🍪"
	message="We value your privacy. Choose which cookies you want to allow. Essential cookies are always enabled as they are necessary for the website to function properly."
	buttonText="Accept All"
	declineButtonText="Decline All"
	showManageButton={true}
	manageButtonText="Manage Cookies"
	privacyPolicyUrl="https://example.com/privacy"
	privacyPolicyText="Privacy Policy"
	{theme}
	bind:isVisible
	{displayType} />

<div
	class="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-dark p-4 text-center text-light">
	<h1 class="text-4xl font-bold text-slate-100">Svelte Cookie Manager</h1>
	<div class="scale-200 my-8 flex items-center justify-center">
		<div class="animate-bounce text-4xl">🍪</div>
	</div>

	<div class="my-8 text-center">
		<code
			class="text-slate inline-block overflow-hidden rounded-lg border border-blue-300 bg-slate-800 px-8 py-4 font-mono text-lg tracking-wide shadow-md backdrop-blur transition duration-300">
			$ npm i svelte-cookie-manager
		</code>
	</div>

	<div>
		<button
			onclick={showConsentBanner}
			class="mb-5 cursor-pointer rounded-md bg-blue-500 px-5 py-2 text-lg text-white transition hover:bg-blue-600">
			Show Cookie Consent
		</button>
		<div class="flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800 p-5">
			<div class="flex items-center justify-between gap-5">
				<span class="w-24 font-bold text-white">Analytics:</span>
				<span
					class="w-16 font-medium {currentConsent?.Analytics?.consented
						? 'text-green-400'
						: 'text-red-400'}">
					{currentConsent?.Analytics?.consented ? 'Enabled' : 'Disabled'}
				</span>
			</div>
			<div class="flex items-center justify-between gap-5">
				<span class="w-24 font-bold text-white">Social:</span>
				<span
					class="w-16 font-medium {currentConsent?.Social?.consented
						? 'text-green-400'
						: 'text-red-400'}">
					{currentConsent?.Social?.consented ? 'Enabled' : 'Disabled'}
				</span>
			</div>
			<div class="flex items-center justify-between gap-5">
				<span class="w-24 font-bold text-white">Advertising:</span>
				<span
					class="w-16 font-medium {currentConsent?.Advertising?.consented
						? 'text-green-400'
						: 'text-red-400'}">
					{currentConsent?.Advertising?.consented ? 'Enabled' : 'Disabled'}
				</span>
			</div>
		</div>
	</div>
	<div class="my-5 flex flex-col items-center">
		<h3 class="mb-2 text-center">Change Cookie Manager Display Type</h3>
		<div class="mx-auto flex w-fit rounded-lg border border-light bg-slate-800 p-1">
			<button
				onclick={() => setDisplayType('popup')}
				class="cursor-pointer border-r border-slate-700 bg-transparent px-4 py-2 text-sm text-white">
				Popup
			</button>
			<button
				onclick={() => setDisplayType('modal')}
				class="cursor-pointer border-r border-slate-700 bg-transparent px-4 py-2 text-sm text-white">
				Modal
			</button>
			<button
				onclick={() => setDisplayType('banner')}
				class="cursor-pointer border-r border-slate-700 bg-transparent px-4 py-2 text-sm text-white">
				Banner
			</button>
			<button
				class="cursor-pointer bg-transparent px-4 py-2 text-sm text-white"
				onclick={toggleTheme}>
				{emoji}
			</button>
		</div>
	</div>
</div>
