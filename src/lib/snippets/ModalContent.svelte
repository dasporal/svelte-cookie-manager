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
	class={`
  w-full max-w-lg rounded-xl p-6
  ${theme === 'light' ? 'bg-white/95 ring-2 ring-slate-200' : 'bg-black/95 ring-1 ring-white/10'}
`}>
	<div class="flex flex-col">
		{#if title}
			<p
				class={`
  mb-3 text-lg font-semibold
  ${theme === 'light' ? 'text-slate-900' : 'text-white'}
`}>
				{title}
			</p>
		{/if}
		<p
			class={`
  mb-6 text-sm font-medium
  ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}
`}>
			{message}
		</p>
	</div>

	<div class="flex flex-col gap-3">
		<div class="flex items-center justify-between">
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
			<div class="flex items-center gap-3">
				{#if showManageButton}
					<ManageButton {handleManageClick} {manageButtonText} />
				{/if}
				<DeclineButton {declineButtonText} {handleDeclineClick} {theme} displayType="modal" />

				<AcceptButton {buttonText} {handleAcceptClick} />
			</div>
		</div>
	</div>
</div>
