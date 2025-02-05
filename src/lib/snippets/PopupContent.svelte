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

<div class="flex flex-col items-start gap-4 p-4">
	<div class="flex flex-col">
		{#if title}
			<p
				class={`mb-2 text-sm font-semibold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
				{title}
			</p>
		{/if}
		<p
			class={`
  text-xs font-medium
  ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}
`}>
			{message}
		</p>
	</div>

	<div class="flex w-full flex-col gap-3">
		<div class="flex w-full items-center gap-3">
			<DeclineButton {declineButtonText} {handleDeclineClick} {theme} displayType="popup" />
			<AcceptButton {buttonText} {handleAcceptClick} />
		</div>
		<div class="flex w-full flex-col gap-2">
			{#if showManageButton}
				<ManageButton {handleManageClick} {manageButtonText} />
			{/if}

			{#if privacyPolicyUrl}
				<a
					href={privacyPolicyUrl}
					target="_blank"
					rel="noopener noreferrer"
					class={`
  text-xs font-medium
  ${theme === 'light' ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200'}
  transition-colors duration-200
`}>
					{privacyPolicyText}
				</a>
			{/if}
		</div>
	</div>
</div>
