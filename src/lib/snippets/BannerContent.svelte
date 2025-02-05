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

<div class="flex flex-col gap-4 p-4" class:dark={theme === 'dark'}>
	<div>
		{#if title}
			<p class="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
				{title}
			</p>
		{/if}
		<p
			class="text-center text-xs font-medium text-slate-700 dark:text-slate-200 sm:text-left sm:text-sm">
			{message}
		</p>
	</div>
	<div class="flex w-full items-center justify-between">
		{#if privacyPolicyUrl}
			<a
				href={privacyPolicyUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
				{privacyPolicyText}
			</a>
		{/if}
		<div class="flex items-center gap-3">
			{#if showManageButton}
				<ManageButton {handleManageClick} {manageButtonText} />
			{/if}

			<DeclineButton {declineButtonText} {handleDeclineClick} {theme} displayType="banner" />

			<AcceptButton {buttonText} {handleAcceptClick} />
		</div>
	</div>
</div>
