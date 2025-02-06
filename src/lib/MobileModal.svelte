<script lang="ts">
	import type { CookieConsenterProps, CookieCategories, DetailedCookieConsent } from './types.js';
	import ManageConsent from './ManageConsent.svelte';

	interface MobileModalProps {
		handleAcceptClick: (e: MouseEvent) => void;
		handleDeclineClick: (e: MouseEvent) => void;
		handleManageClick: (e: MouseEvent) => void;
		isExiting: boolean;
		isEntering: boolean;
		isManaging: boolean;
		handleSavePreferences: (categories: DetailedCookieConsent) => void;
		handleCancelManage: () => void;
		initialPreferences?: CookieCategories;
		detailedConsent?: DetailedCookieConsent | null;
	}

	let {
		buttonText,
		declineButtonText,
		manageButtonText,
		showManageButton,
		privacyPolicyText,
		privacyPolicyUrl,
		title,
		message,
		theme,
		handleAcceptClick,
		handleDeclineClick,
		handleManageClick,
		isExiting,
		isEntering,
		isManaging,
		handleSavePreferences,
		handleCancelManage,
		displayType = 'banner'
	}: CookieConsenterProps & MobileModalProps = $props();
</script>

{#if displayType === 'modal'}
	<div class="scm-fixed scm-inset-0 scm-z-[99999] scm-bg-black/40 scm-backdrop-blur-sm"></div>
{/if}

<div
	class={`scm-fixed scm-inset-x-0 scm-bottom-0 scm-z-[99999] scm-px-4 scm-pb-4 scm-pt-2
			scm-transition-all scm-duration-500 scm-ease-[cubic-bezier(0.32,0.72,0,1)]
			${isExiting ? 'scm-translate-y-full' : isEntering ? 'scm-translate-y-full' : 'scm-translate-y-0'}`}>
	<div
		class={`scm-mx-auto scm-max-w-[calc(100vw-32px)] scm-p-4
				${theme === 'light' ? 'scm-bg-white/95 scm-ring-1 scm-ring-black/10' : 'scm-bg-black/95 scm-ring-1 scm-ring-white/10'}
				scm-rounded-2xl scm-backdrop-blur-sm scm-backdrop-saturate-150`}>
		{#if isManaging}
			<ManageConsent onSave={handleSavePreferences} onCancel={handleCancelManage} />
		{:else}
			<div class="scm-flex scm-flex-col scm-gap-3">
				{#if title}
					<h3
						class={`scm-my-0 scm-font-semibold ${theme === 'light' ? 'scm-text-slate-900' : 'scm-text-white'}`}>
						{title}
					</h3>
				{/if}

				<p class={`scm-text-sm ${theme === 'light' ? 'scm-text-slate-700' : 'scm-text-slate-200'}`}>
					{message}
				</p>

				<div class="scm-flex scm-flex-col scm-gap-3">
					<button
						onclick={handleAcceptClick}
						class="scm-w-full scm-rounded-lg scm-bg-blue-500 scm-px-3 scm-py-2.5 scm-text-sm scm-font-medium scm-text-white hover:scm-bg-blue-600 scm-focus:outline-none scm-focus:outline-transparent scm-focus-visible:outline-none scm-focus-visible:outline-transparent">
						{buttonText}
					</button>

					<button
						onclick={handleDeclineClick}
						class={`scm-w-full scm-rounded-lg scm-px-3 scm-py-2.5 scm-text-sm scm-font-medium scm-focus:outline-none scm-focus:outline-transparent scm-focus-visible:outline-none scm-focus-visible:outline-transparent
								${
									theme === 'light'
										? 'scm-bg-slate-200 scm-text-slate-800 hover:scm-bg-slate-300'
										: 'scm-bg-slate-800 scm-text-slate-300 hover:scm-bg-slate-700'
								}`}>
						{declineButtonText}
					</button>

					{#if showManageButton}
						<button
							onclick={handleManageClick}
							class="scm-w-full scm-rounded-lg scm-border scm-border-blue-500 scm-bg-transparent scm-px-3 scm-py-2.5 scm-text-sm scm-font-medium scm-text-blue-500 hover:scm-border-blue-400 hover:scm-text-blue-400 scm-focus:outline-none scm-focus:outline-transparent scm-focus-visible:outline-none scm-focus-visible:outline-transparent">
							{manageButtonText}
						</button>
					{/if}
				</div>

				{#if privacyPolicyUrl}
					<a
						href={privacyPolicyUrl}
						target="_blank"
						rel="noopener noreferrer"
						class={`scm-text-xs ${
							theme === 'light'
								? 'scm-text-slate-500 hover:scm-text-slate-700'
								: 'scm-text-slate-400 hover:scm-text-slate-200'
						}`}>
						{privacyPolicyText}
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>
