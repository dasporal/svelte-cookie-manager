<script lang="ts">
	import AcceptButton from '$lib/buttons/AcceptButton.svelte';
	import DeclineButton from '$lib/buttons/DeclineButton.svelte';
	import ManageButton from '$lib/buttons/ManageButton.svelte';

	let {
		title,
		message,
		theme,
		privacyPolicyUrl,
		privacyPolicyText,
		showManageButton,
		manageButtonText,
		declineButtonText,
		buttonText,
		handleManageClick,
		handleDeclineClick,
		handleAcceptClick
	}: {
		title: string;
		message: string;
		theme: 'light' | 'dark';
		privacyPolicyUrl: string;
		privacyPolicyText: string;
		showManageButton: boolean;
		manageButtonText: string;
		declineButtonText: string;
		buttonText: string;
		handleManageClick: () => void;
		handleDeclineClick: () => void;
		handleAcceptClick: () => void;
	} = $props();
</script>

<div
	class={`scm-flex scm-flex-col scm-gap-4 scm-p-4 ${theme === 'light' ? 'scm-light' : 'scm-dark'}`}>
	<div>
		{#if title}
			<p class="scm-mb-1 scm-text-sm scm-font-semibold scm-text-slate-900 dark:scm-text-white">
				{title}
			</p>
		{/if}
		<p
			class="scm-text-center scm-text-xs scm-font-medium scm-text-slate-700 dark:scm-text-slate-200 sm:scm-text-left sm:scm-text-sm">
			{message}
		</p>
	</div>
	<div class="scm-flex scm-w-full scm-items-center scm-justify-between">
		{#if privacyPolicyUrl}
			<a
				href={privacyPolicyUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="scm-text-xs scm-font-medium scm-text-slate-500 scm-transition-colors scm-duration-200 hover:scm-text-slate-700 dark:scm-text-slate-400 dark:hover:scm-text-slate-200">
				{privacyPolicyText}
			</a>
		{/if}
		<div class="scm-flex scm-items-center scm-gap-3">
			{#if showManageButton}
				<ManageButton {handleManageClick} {manageButtonText} />
			{/if}

			<DeclineButton {declineButtonText} {handleDeclineClick} {theme} displayType="banner" />

			<AcceptButton {buttonText} {handleAcceptClick} />
		</div>
	</div>
</div>
