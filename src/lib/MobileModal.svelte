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
		handleSavePreferences: (categories: CookieCategories) => void;
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
		displayType = 'banner',
		initialPreferences,
		detailedConsent
	}: CookieConsenterProps & MobileModalProps = $props();
</script>

{#if displayType === 'modal'}
	<div class="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm"></div>
{/if}

<div
	class="fixed inset-x-0 bottom-0 z-[99999] px-4 pb-4 pt-2
			transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
			{isExiting ? 'translate-y-full' : isEntering ? 'translate-y-full' : 'translate-y-0'}"
>
	<div
		class="mx-auto max-w-[calc(100vw-32px)] p-4
				{theme === 'light' ? 'bg-white/95 ring-1 ring-black/10' : 'bg-black/95 ring-1 ring-white/10'}
				rounded-2xl backdrop-blur-sm backdrop-saturate-150"
	>
		{#if isManaging}
			<ManageConsent
				{theme}
				onSave={handleSavePreferences}
				onCancel={handleCancelManage}
				{initialPreferences}
				{detailedConsent}
			/>
		{:else}
			<div class="flex flex-col gap-3">
				{#if title}
					<h3 class="my-0 font-semibold {theme === 'light' ? 'text-gray-900' : 'text-white'}">
						{title}
					</h3>
				{/if}

				<p class="text-sm {theme === 'light' ? 'text-gray-700' : 'text-gray-200'}">
					{message}
				</p>

				<div class="flex flex-col gap-3">
					<button
						onclick={handleAcceptClick}
						class="w-full rounded-lg bg-blue-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:outline-transparent focus-visible:outline-none focus-visible:outline-transparent"
					>
						{buttonText}
					</button>

					<button
						onclick={handleDeclineClick}
						class="w-full rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:outline-transparent focus-visible:outline-none focus-visible:outline-transparent
								{theme === 'light'
							? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
							: 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
					>
						{declineButtonText}
					</button>

					{#if showManageButton}
						<button
							onclick={handleManageClick}
							class="w-full rounded-lg border border-blue-500 bg-transparent px-3 py-2.5 text-sm font-medium text-blue-500 hover:border-blue-400 hover:text-blue-400 focus:outline-none focus:outline-transparent focus-visible:outline-none focus-visible:outline-transparent"
						>
							{manageButtonText}
						</button>
					{/if}
				</div>

				{#if privacyPolicyUrl}
					<a
						href={privacyPolicyUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs {theme === 'light'
							? 'text-gray-500 hover:text-gray-700'
							: 'text-gray-400 hover:text-gray-200'}"
					>
						{privacyPolicyText}
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>
