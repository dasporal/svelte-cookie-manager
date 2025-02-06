<script lang="ts">
	import {
		displayTypeStore,
		storedConsent,
		isVisible,
		themeStore
	} from '$lib/utils/cookie.svelte.js';

	let emoji = $derived(themeStore.value === 'light' ? '🌙' : '☀️');
</script>

<svelte:head>
	<title>Hypership Inspired Svelte Cookie Manager</title>
</svelte:head>

<div
	class="scm-text-light scm-flex scm-min-h-screen scm-w-full scm-flex-col scm-items-center scm-justify-center scm-gap-6 scm-bg-slate-950 scm-p-4 scm-text-center">
	<h1 class="scm-text-4xl scm-font-bold scm-text-slate-100">Svelte Cookie Manager</h1>
	<div class="scm-scale-200 scm-my-8 scm-flex scm-items-center scm-justify-center">
		<div class="scm-animate-bounce scm-text-4xl">🍪</div>
	</div>
	<a
		href="https://react-cookie-manager.hypership.dev/"
		class="scm-text-white hover:scm-text-slate-200 hover:scm-underline"
		>From an original idea of Hypership</a>
	<div class="scm-my-8 scm-text-center">
		<code
			class="scm-inline-block scm-overflow-hidden scm-rounded-lg scm-border scm-border-blue-300 scm-bg-slate-800 scm-px-8 scm-py-4 scm-font-mono scm-text-lg scm-tracking-wide scm-text-white scm-shadow-md scm-backdrop-blur scm-transition scm-duration-300">
			$ npm i svelte-cookie-manager
		</code>
	</div>

	<div>
		<button
			onclick={isVisible.toggle}
			class="scm-mb-5 scm-cursor-pointer scm-rounded-md scm-bg-blue-500 scm-px-5 scm-py-2 scm-text-lg scm-text-white scm-transition hover:scm-bg-blue-600">
			Show Cookie Consent
		</button>
		<div
			class="scm-flex scm-flex-col scm-gap-4 scm-rounded-lg scm-border scm-border-slate-700 scm-bg-slate-800 scm-p-5">
			<div class="scm-flex scm-items-center scm-justify-between scm-gap-5">
				<span class="scm-w-24 scm-font-bold scm-text-white">Analytics:</span>
				<span
					class={`scm-w-16 scm-font-medium ${storedConsent.value?.Analytics?.consented ? 'scm-text-green-400' : 'scm-text-red-400'} `}>
					{storedConsent.hasConsentFor('Analytics') ? 'Enabled' : 'Disabled'}
				</span>
			</div>
			<div class="scm-flex scm-items-center scm-justify-between scm-gap-5">
				<span class="scm-w-24 scm-font-bold scm-text-white">Social:</span>
				<span
					class={`scm-w-16 scm-font-medium ${storedConsent.value?.Social?.consented ? 'scm-text-green-400' : 'scm-text-red-400'} `}>
					{storedConsent.hasConsentFor('Social') ? 'Enabled' : 'Disabled'}
				</span>
			</div>
			<div class="scm-flex scm-items-center scm-justify-between scm-gap-5">
				<span class="scm-w-24 scm-font-bold scm-text-white">Advertising:</span>
				<span
					class={`scm-w-16 scm-font-medium ${storedConsent.value?.Advertising?.consented ? 'scm-text-green-400' : 'scm-text-red-400'} `}>
					{storedConsent.hasConsentFor('Advertising') ? 'Enabled' : 'Disabled'}
				</span>
			</div>
		</div>
	</div>
	<div class="scm-my-5 scm-flex scm-flex-col scm-items-center">
		<h3 class="scm-mb-2 scm-text-center">Change Cookie Manager Display Type</h3>
		<div
			class="scm-border-light scm-mx-auto scm-flex scm-w-fit scm-rounded-lg scm-border scm-bg-slate-800 scm-p-1">
			<button
				onclick={() => {
					displayTypeStore.value = 'popup';
					isVisible.value = true;
				}}
				class="scm-cursor-pointer scm-border-r scm-border-slate-700 scm-bg-transparent scm-px-4 scm-py-2 scm-text-sm scm-text-white">
				Popup
			</button>
			<button
				onclick={() => {
					displayTypeStore.value = 'modal';
					isVisible.value = true;
				}}
				class="scm-cursor-pointer scm-border-r scm-border-slate-700 scm-bg-transparent scm-px-4 scm-py-2 scm-text-sm scm-text-white">
				Modal
			</button>
			<button
				onclick={() => {
					displayTypeStore.value = 'banner';
					isVisible.value = true;
				}}
				class="scm-cursor-pointer scm-border-r scm-border-slate-700 scm-bg-transparent scm-px-4 scm-py-2 scm-text-sm scm-text-white">
				Banner
			</button>
			<button
				class="scm-cursor-pointer scm-bg-transparent scm-px-4 scm-py-2 scm-text-sm scm-text-white"
				onclick={themeStore.toggle}>
				{emoji}
			</button>
		</div>
	</div>
	<a
		href="https://github.com/dasporal/svelte-cookie-manager"
		class="scm-text-white hover:scm-text-slate-200 hover:scm-underline">By dasporal</a>
</div>
