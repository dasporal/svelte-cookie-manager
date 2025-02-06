<script lang="ts">
	import ConsentCategory from './snippets/ConsentCategory.svelte';
	import RenderConsentStatus from './snippets/RenderConsentStatus.svelte';
	import { type CookieCategories, type DetailedCookieConsent } from './types.js';
	import { storedConsent, themeStore } from './utils/cookie.svelte.js';

	interface ManageConsentProps {
		onSave: (categories: DetailedCookieConsent) => void;
		onCancel?: () => void;
	}

	let { onSave, onCancel }: ManageConsentProps = $props();

	let consent: DetailedCookieConsent = $state(storedConsent.value);

	$inspect(consent);

	function handleToggle(category: keyof CookieCategories) {
		if (!consent) return;
		console.log('handling', category);

		consent = {
			...consent,
			[category]: {
				...consent[category],
				consented: !consent[category].consented
			}
		};
	}
</script>

<div class={themeStore.value === 'dark' ? 'dark' : ''}>
	<div class="scm-flex scm-flex-col scm-gap-6">
		<div>
			<h3 class="scm-mb-2 scm-text-sm scm-font-semibold scm-text-slate-900 dark:scm-text-white">
				Cookie Preferences
			</h3>
			<p class="scm-text-xs scm-text-slate-700 dark:scm-text-slate-200">
				Manage your cookie preferences below. Essential cookies are always enabled as they are
				necessary for the website to function properly.
			</p>
		</div>

		<div class="scm-flex scm-flex-col scm-gap-4">
			<!-- Essential Cookies - Always enabled -->
			<div class="scm-flex scm-items-center scm-justify-between">
				<div>
					<h4 class="scm-text-xs scm-font-medium scm-text-slate-900 dark:scm-text-white">
						Essential
					</h4>
					<p class="scm-text-xs scm-text-slate-600 dark:scm-text-slate-400">
						Required for the website to function properly
					</p>
					<p class="scm-mt-1 scm-text-xs scm-text-slate-500">Status: Always enabled</p>
				</div>
				<div
					class="scm-rounded-full scm-bg-slate-200 scm-px-3 scm-py-1 scm-text-center scm-text-xs scm-font-medium scm-text-slate-600 dark:scm-bg-slate-800 dark:scm-text-slate-300">
					Always On
				</div>
			</div>

			<ConsentCategory consentCategory={consent.Analytics} label="Analytics" {handleToggle} />
			<ConsentCategory consentCategory={consent.Social} label="Social" {handleToggle} />
			<ConsentCategory consentCategory={consent.Advertising} label="Advertising" {handleToggle} />
		</div>

		<div class="scm-mt-2 scm-flex scm-gap-3">
			{#if onCancel}
				<button
					onclick={onCancel}
					class="scm-focus:outline-none scm-focus:ring-2 scm-focus:ring-blue-500 scm-focus:ring-offset-2 scm-flex-1 scm-rounded-md scm-bg-slate-200 scm-px-3 scm-py-1.5 scm-text-xs scm-font-medium scm-text-slate-800 scm-transition-all scm-duration-200 hover:scm-scale-105 hover:scm-bg-slate-300 dark:scm-bg-slate-800 dark:scm-text-slate-300 dark:hover:scm-bg-slate-700">
					Cancel
				</button>
			{/if}

			<button
				onclick={() => (consent ? onSave(consent) : null)}
				class="scm-focus:outline-none scm-focus:ring-2 scm-focus:ring-blue-500 scm-focus:ring-offset-2 scm-flex-1 scm-rounded-md scm-bg-blue-500 scm-px-3 scm-py-1.5 scm-text-xs scm-font-medium scm-text-white scm-transition-all scm-duration-200 hover:scm-scale-105 hover:scm-bg-blue-600">
				Save Preferences
			</button>
		</div>
	</div>
</div>
