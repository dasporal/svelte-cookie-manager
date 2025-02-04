<script lang="ts">
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

<div class="flex flex-col gap-4 p-4">
	<div>
		{#if title}
			<p class={`mb-1 text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
				{title}
			</p>
		{/if}
		<p
			class={`
    text-center text-xs font-medium sm:text-left sm:text-sm
    ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}
  `}>
			{message}
		</p>
	</div>
	<div class="flex w-full items-center justify-between">
		{#if privacyPolicyUrl}
			<a
				href={privacyPolicyUrl}
				target="_blank"
				rel="noopener noreferrer"
				class={`
    text-xs font-medium
    ${theme === 'light' ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'}
    transition-colors duration-200
  `}>
				{privacyPolicyText}
			</a>
		{/if}
		<div class="flex items-center gap-3">
			{#if showManageButton}
				<button
					onclick={handleManageClick}
					class={`
    rounded-md border border-blue-500 bg-transparent px-3
    py-1.5 text-xs font-medium
    text-blue-500
    transition-all duration-200
    hover:scale-105 hover:border-blue-600
    hover:text-blue-600 focus:outline-none focus:outline-transparent
    focus-visible:outline-none focus-visible:outline-transparent
  `}>
					{manageButtonText}
				</button>
			{/if}
			<button
				onclick={handleDeclineClick}
				class={`
    rounded-md px-3 py-1.5 text-xs font-medium
    ${theme === 'light' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
    transition-all duration-200
    hover:scale-105 focus:outline-none focus:outline-transparent
    focus-visible:outline-none focus-visible:outline-transparent
  `}>
				{declineButtonText}
			</button>
			<button
				onclick={handleAcceptClick}
				class={`
    rounded-md bg-blue-500 px-3 py-1.5 text-xs
    font-medium text-white transition-all
    duration-200 hover:scale-105
    hover:bg-blue-600 focus:outline-none focus:outline-transparent
    focus-visible:outline-none focus-visible:outline-transparent
  `}>
				{buttonText}
			</button>
		</div>
	</div>
</div>
