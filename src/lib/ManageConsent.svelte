<script lang="ts">
	import RenderConsentStatus from './snippets/RenderConsentStatus.svelte';
	import { type CookieCategories, type DetailedCookieConsent } from './types.js';

	interface ManageConsentProps {
		theme?: 'light' | 'dark';
		onSave: (categories: CookieCategories) => void;
		onCancel?: () => void;
		initialPreferences?: CookieCategories;
		detailedConsent?: DetailedCookieConsent | null;
	}

	let {
		theme = 'light',
		onSave,
		onCancel,
		initialPreferences = {
			Analytics: false,
			Social: false,
			Advertising: false
		},
		detailedConsent
	}: ManageConsentProps = $props();

	let consent = $state<CookieCategories>(initialPreferences);

	function handleToggle(category: keyof CookieCategories) {
		consent = { ...consent, [category]: !consent[category] };
	}
</script>

<div class="flex flex-col gap-6">
	<div>
		<h3 class={`mb-2 text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
			Cookie Preferences
		</h3>
		<p class={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
			Manage your cookie preferences below. Essential cookies are always enabled as they are
			necessary for the website to function properly.
		</p>
	</div>

	<div class="flex flex-col gap-4">
		<!-- Essential Cookies - Always enabled -->
		<div class="flex items-center justify-between">
			<div>
				<h4 class={`text-xs font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
					Essential
				</h4>
				<p class={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
					Required for the website to function properly
				</p>
				<p class={`mt-1 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
					Status: Always enabled
				</p>
			</div>
			<div
				class={`rounded-full px-3 py-1 text-center text-xs font-medium ${theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-gray-800 text-gray-300'}`}
			>
				Always On
			</div>
		</div>

		<!-- Analytics Cookies -->
		<div class="flex items-center justify-between">
			<div>
				<h4 class={`text-xs font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
					Analytics
				</h4>
				<p class={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
					Help us understand how visitors interact with our website
				</p>

				{#if detailedConsent && detailedConsent['Analytics']}
					<RenderConsentStatus {theme} status={detailedConsent['Analytics']} />
				{/if}
			</div>
			<label class="relative inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					bind:checked={consent.Analytics}
					onchange={() => handleToggle('Analytics')}
					class="peer sr-only"
				/>

				<div
					class={`peer h-6 w-11 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 
              ${
								theme === 'light'
									? 'bg-gray-200 peer-checked:bg-blue-500'
									: 'bg-gray-700 peer-checked:bg-blue-500'
							} 
              after:absolute after:left-[2px] after:top-0.5 after:h-5 
              after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] 
              peer-checked:after:translate-x-full`}
				></div>
			</label>
		</div>

		<!-- Social Cookies -->
		<div class="flex items-center justify-between">
			<div>
				<h4 class={`text-xs font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
					Social
				</h4>
				<p class={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
					Enable social media features and sharing
				</p>
				{#if detailedConsent && detailedConsent['Social']}
					<RenderConsentStatus {theme} status={detailedConsent['Social']} />
				{/if}
			</div>
			<label class="relative inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					bind:checked={consent.Social}
					onchange={() => handleToggle('Social')}
					class="peer sr-only"
				/>
				<div
					class={`peer h-6 w-11 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 
              ${
								theme === 'light'
									? 'bg-gray-200 peer-checked:bg-blue-500'
									: 'bg-gray-700 peer-checked:bg-blue-500'
							} 
              after:absolute after:left-[2px] after:top-0.5 after:h-5 
              after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] 
              peer-checked:after:translate-x-full`}
				></div>
			</label>
		</div>

		<!-- Advertising Cookies -->
		<div class="flex items-center justify-between">
			<div>
				<h4 class={`text-xs font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
					Advertising
				</h4>
				<p class={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
					Personalize advertisements and measure their performance
				</p>
				{#if detailedConsent && detailedConsent['Advertising']}
					<RenderConsentStatus {theme} status={detailedConsent['Advertising']} />
				{/if}
			</div>
			<label class="relative inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					bind:checked={consent.Advertising}
					onchange={() => handleToggle('Advertising')}
					class="peer sr-only"
				/>
				<div
					class={`peer h-6 w-11 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 
              ${
								theme === 'light'
									? 'bg-gray-200 peer-checked:bg-blue-500'
									: 'bg-gray-700 peer-checked:bg-blue-500'
							} 
              after:absolute after:left-[2px] after:top-0.5 after:h-5 
              after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] 
              peer-checked:after:translate-x-full`}
				></div>
			</label>
		</div>
	</div>

	<div class="mt-2 flex gap-3">
		{#if onCancel}
			<button
				onclick={onCancel}
				class="flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {theme ===
				'light'
					? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					: 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
			>
				Cancel
			</button>
		{/if}

		<button
			onclick={() => onSave(consent)}
			class="flex-1 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Save Preferences
		</button>
	</div>
</div>
