<script lang="ts">
	import type { CookieCategories, DetailedCookieConsent } from '$lib/types.js';
	import { themeStore } from '$lib/utils/cookie.svelte.js';
	import { onMount } from 'svelte';
	import RenderConsentStatus from './RenderConsentStatus.svelte';

	let {
		label,
		consentCategory,
		handleToggle
	}: {
		label: keyof CookieCategories;
		consentCategory: any;
		handleToggle: (category: keyof CookieCategories) => void;
	} = $props();
</script>

<div class="scm-flex scm-items-center scm-justify-between">
	<div>
		<h4 class="scm-text-xs scm-font-medium scm-text-slate-900 dark:scm-text-white">{label}</h4>
		<p class="scm-text-xs scm-text-slate-600 dark:scm-text-slate-400">
			Personalize advertisements and measure their performance
		</p>
		{#if consentCategory}
			<RenderConsentStatus theme={themeStore.value} status={consentCategory} />
		{/if}
	</div>
	<label class="scm-relative scm-inline-flex scm-cursor-pointer scm-items-center">
		{#if consentCategory && consentCategory.consented !== undefined}
			<input
				type="checkbox"
				checked={consentCategory.consented}
				onclick={() => handleToggle(label)}
				class="scm-peer scm-sr-only" />
		{/if}
		<div
			class="scm-peer scm-h-6 scm-w-11 scm-rounded-full scm-bg-slate-200 after:scm-absolute after:scm-left-[2px] after:scm-top-0.5 after:scm-h-5 after:scm-w-5 after:scm-rounded-full after:scm-bg-white after:scm-transition-all after:scm-content-[''] peer-checked:scm-bg-blue-500 peer-checked:after:scm-translate-x-full peer-focus:scm-ring-2 peer-focus:scm-ring-blue-500 dark:scm-bg-slate-700">
		</div>
	</label>
</div>
