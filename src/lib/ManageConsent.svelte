<script lang="ts">
	import RenderConsentStatus from './snippets/RenderConsentStatus.svelte';
	import { type CookieCategories, type DetailedCookieConsent } from './types.js';
	import { storedConsent, themeStore } from './utils/cookie.svelte.js';

	interface ManageConsentProps {
		onSave: (categories: DetailedCookieConsent) => void;
		onCancel?: () => void;
	}

	let { onSave, onCancel }: ManageConsentProps = $props();

	function handleToggle(category: keyof CookieCategories) {
		if (!storedConsent.value) return;

		storedConsent.updateDetailedConsent({
			...storedConsent.value,
			[category]: {
				...storedConsent.value[category],
				consented: !storedConsent.value[category].consented
			}
		});
	}
</script>

<div class={themeStore.value === 'dark' ? 'dark' : ''}>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Cookie Preferences</h3>
			<p class="text-xs text-slate-700 dark:text-slate-200">
				Manage your cookie preferences below. Essential cookies are always enabled as they are
				necessary for the website to function properly.
			</p>
		</div>

		<div class="flex flex-col gap-4">
			<!-- Essential Cookies - Always enabled -->
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-xs font-medium text-slate-900 dark:text-white">Essential</h4>
					<p class="text-xs text-slate-600 dark:text-slate-400">
						Required for the website to function properly
					</p>
					<p class="mt-1 text-xs text-slate-500">Status: Always enabled</p>
				</div>
				<div
					class="rounded-full bg-slate-200 px-3 py-1 text-center text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
					Always On
				</div>
			</div>

			<!-- Analytics Cookies -->
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-xs font-medium text-slate-900 dark:text-white">Analytics</h4>
					<p class="text-xs text-slate-600 dark:text-slate-400">
						Help us understand how visitors interact with our website
					</p>
					{#if storedConsent.value && storedConsent.value.Analytics}
						<RenderConsentStatus theme={themeStore.value} status={storedConsent.value.Analytics} />
					{/if}
				</div>
				<label class="relative inline-flex cursor-pointer items-center">
					<input
						type="checkbox"
						bind:checked={storedConsent.simplifiedConsent!.Analytics}
						onclick={() => handleToggle('Analytics')}
						class="peer sr-only" />
					<div
						class="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-slate-700">
					</div>
				</label>
			</div>

			<!-- Social -->
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-xs font-medium text-slate-900 dark:text-white">Social</h4>
					<p class="text-xs text-slate-600 dark:text-slate-400">
						Enable social media features and sharing
					</p>
					{#if storedConsent.value && storedConsent.value.Social}
						<RenderConsentStatus theme={themeStore.value} status={storedConsent.value.Social} />
					{/if}
				</div>
				<label class="relative inline-flex cursor-pointer items-center">
					<input
						type="checkbox"
						bind:checked={storedConsent.simplifiedConsent!.Social}
						onclick={() => handleToggle('Social')}
						class="peer sr-only" />
					<div
						class="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-slate-700">
					</div>
				</label>
			</div>

			<!-- Advertising -->
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-xs font-medium text-slate-900 dark:text-white">Advertising</h4>
					<p class="text-xs text-slate-600 dark:text-slate-400">
						Personalize advertisements and measure their performance
					</p>
					{#if storedConsent.value && storedConsent.value.Advertising}
						<RenderConsentStatus
							theme={themeStore.value}
							status={storedConsent.value.Advertising} />
					{/if}
				</div>
				<label class="relative inline-flex cursor-pointer items-center">
					<input
						type="checkbox"
						bind:checked={storedConsent.simplifiedConsent!.Advertising}
						onclick={() => handleToggle('Advertising')}
						class="peer sr-only" />
					<div
						class="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-slate-700">
					</div>
				</label>
			</div>
		</div>

		<div class="mt-2 flex gap-3">
			{#if onCancel}
				<button
					onclick={onCancel}
					class="flex-1 rounded-md bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 transition-all duration-200 hover:scale-105 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
					Cancel
				</button>
			{/if}

			<button
				onclick={() => (storedConsent.value ? onSave(storedConsent.value) : null)}
				class="flex-1 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
				Save Preferences
			</button>
		</div>
	</div>
</div>
