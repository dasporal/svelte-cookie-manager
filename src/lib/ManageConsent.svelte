<script lang="ts">
	import RenderConsentStatus from './snippets/RenderConsentStatus.svelte';
	import { type CookieCategories, type DetailedCookieConsent } from './types.js';
	import { storedConsent, themeStore } from './utils/cookie.svelte.js';

	interface ManageConsentProps {
		onSave: (categories: DetailedCookieConsent) => void;
		onCancel?: () => void;
	}

	let { onSave, onCancel }: ManageConsentProps = $props();

	let consent: DetailedCookieConsent | null = $state(storedConsent.value);

	function handleToggle(category: keyof CookieCategories) {
		if (!consent) return;

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

			<!-- Analytics Cookies -->
			<div class="scm-flex scm-items-center scm-justify-between">
				<div>
					<h4 class="scm-text-xs scm-font-medium scm-text-slate-900 dark:scm-text-white">
						Analytics
					</h4>
					<p class="scm-text-xs scm-text-slate-600 dark:scm-text-slate-400">
						Help us understand how visitors interact with our website
					</p>
					{#if storedConsent.value && storedConsent.value.Analytics}
						<RenderConsentStatus theme={themeStore.value} status={storedConsent.value.Analytics} />
					{/if}
				</div>
				<label class="scm-relative scm-inline-flex scm-cursor-pointer scm-items-center">
					<input
						type="checkbox"
						bind:checked={storedConsent.simplifiedConsent!.Analytics}
						onclick={() => handleToggle('Analytics')}
						class="scm-peer scm-sr-only" />
					<div
						class="scm-peer scm-h-6 scm-w-11 scm-rounded-full scm-bg-slate-200 after:scm-absolute after:scm-left-[2px] after:scm-top-0.5 after:scm-h-5 after:scm-w-5 after:scm-rounded-full after:scm-bg-white after:scm-transition-all after:scm-content-[''] peer-checked:scm-bg-blue-500 peer-checked:after:scm-translate-x-full peer-focus:scm-ring-2 peer-focus:scm-ring-blue-500 dark:scm-bg-slate-700">
					</div>
				</label>
			</div>

			<!-- Social -->
			<div class="scm-flex scm-items-center scm-justify-between">
				<div>
					<h4 class="scm-text-xs scm-font-medium scm-text-slate-900 dark:scm-text-white">Social</h4>
					<p class="scm-text-xs scm-text-slate-600 dark:scm-text-slate-400">
						Enable social media features and sharing
					</p>
					{#if storedConsent.value && storedConsent.value.Social}
						<RenderConsentStatus theme={themeStore.value} status={storedConsent.value.Social} />
					{/if}
				</div>
				<label class="scm-relative scm-inline-flex scm-cursor-pointer scm-items-center">
					<input
						type="checkbox"
						bind:checked={storedConsent.simplifiedConsent!.Social}
						onclick={() => handleToggle('Social')}
						class="scm-peer scm-sr-only" />
					<div
						class="scm-peer scm-h-6 scm-w-11 scm-rounded-full scm-bg-slate-200 after:scm-absolute after:scm-left-[2px] after:scm-top-0.5 after:scm-h-5 after:scm-w-5 after:scm-rounded-full after:scm-bg-white after:scm-transition-all after:scm-content-[''] peer-checked:scm-bg-blue-500 peer-checked:after:scm-translate-x-full peer-focus:scm-ring-2 peer-focus:scm-ring-blue-500 dark:scm-bg-slate-700">
					</div>
				</label>
			</div>

			<!-- Advertising -->
			<div class="scm-flex scm-items-center scm-justify-between">
				<div>
					<h4 class="scm-text-xs scm-font-medium scm-text-slate-900 dark:scm-text-white">
						Advertising
					</h4>
					<p class="scm-text-xs scm-text-slate-600 dark:scm-text-slate-400">
						Personalize advertisements and measure their performance
					</p>
					{#if storedConsent.value && storedConsent.value.Advertising}
						<RenderConsentStatus
							theme={themeStore.value}
							status={storedConsent.value.Advertising} />
					{/if}
				</div>
				<label class="scm-relative scm-inline-flex scm-cursor-pointer scm-items-center">
					<input
						type="checkbox"
						bind:checked={storedConsent.simplifiedConsent!.Advertising}
						onclick={() => handleToggle('Advertising')}
						class="scm-peer scm-sr-only" />
					<div
						class="scm-peer scm-h-6 scm-w-11 scm-rounded-full scm-bg-slate-200 after:scm-absolute after:scm-left-[2px] after:scm-top-0.5 after:scm-h-5 after:scm-w-5 after:scm-rounded-full after:scm-bg-white after:scm-transition-all after:scm-content-[''] peer-checked:scm-bg-blue-500 peer-checked:after:scm-translate-x-full peer-focus:scm-ring-2 peer-focus:scm-ring-blue-500 dark:scm-bg-slate-700">
					</div>
				</label>
			</div>
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
