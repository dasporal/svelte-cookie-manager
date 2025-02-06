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
  scm-w-full scm-max-w-lg scm-rounded-xl scm-p-6
  ${theme === 'light' ? 'scm-bg-white/95 scm-ring-2 scm-ring-slate-200' : 'scm-bg-black/95 scm-ring-1 scm-ring-white/10'}
`}>
	<div class="scm-flex scm-flex-col">
		{#if title}
			<p
				class={`
  scm-mb-3 scm-text-lg scm-font-semibold
  ${theme === 'light' ? 'scm-text-slate-900' : 'scm-text-white'}
`}>
				{title}
			</p>
		{/if}
		<p
			class={`
  scm-mb-6 scm-text-sm scm-font-medium
  ${theme === 'light' ? 'scm-text-slate-700' : 'scm-text-slate-200'}
`}>
			{message}
		</p>
	</div>

	<div class="scm-flex scm-flex-col scm-gap-3">
		<div class="scm-flex scm-items-center scm-justify-between">
			{#if privacyPolicyUrl}
				<a
					href={privacyPolicyUrl}
					target="_blank"
					rel="noopener noreferrer"
					class={`
  scm-text-xs scm-font-medium
  ${theme === 'light' ? 'scm-text-slate-500 hover:scm-text-slate-700' : 'scm-text-slate-400 hover:scm-text-slate-200'}
  scm-transition-colors scm-duration-200
`}>
					{privacyPolicyText}
				</a>
			{/if}
			<div class="scm-flex scm-items-center scm-gap-3">
				{#if showManageButton}
					<ManageButton {handleManageClick} {manageButtonText} />
				{/if}
				<DeclineButton {declineButtonText} {handleDeclineClick} {theme} displayType="modal" />

				<AcceptButton {buttonText} {handleAcceptClick} />
			</div>
		</div>
	</div>
</div>
