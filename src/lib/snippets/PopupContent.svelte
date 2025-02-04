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

<div class="flex flex-col items-start gap-4 p-4">
	<div class="flex flex-col">
		{#if title}
			<p
				class={`
  mb-2 text-sm font-semibold
  ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
				{title}
			</p>
		{/if}
		<p
			class={`
  text-xs font-medium
  ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}
`}>
			{message}
		</p>
	</div>

	<div class="flex w-full flex-col gap-3">
		<div class="flex items-center gap-3">
			<button
				onclick={handleDeclineClick}
				class={`
  flex-1 rounded-md px-3 py-1.5 text-xs font-medium
  ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}
  transition-all duration-200
  hover:scale-105 focus:outline-none focus:outline-transparent
  focus-visible:outline-none focus-visible:outline-transparent
`}>
				{declineButtonText}
			</button>
			<button
				onclick={handleAcceptClick}
				class={`
  flex-1 rounded-md bg-blue-500 px-3 py-1.5 text-xs
  font-medium text-white transition-all
  duration-200 hover:scale-105
  hover:bg-blue-600 focus:outline-none focus:outline-transparent
  focus-visible:outline-none focus-visible:outline-transparent
`}>
				{buttonText}
			</button>
		</div>
		<div class="flex w-full flex-col gap-2">
			{#if showManageButton}
				<button
					onclick={handleManageClick}
					class={`
  w-full justify-center rounded-md border border-blue-500
  bg-transparent px-3 py-1.5
  text-xs font-medium text-blue-500
  transition-all duration-200
  hover:scale-105 hover:border-blue-600
  hover:text-blue-600 focus:outline-none focus:outline-transparent
  focus-visible:outline-none focus-visible:outline-transparent
`}>
					{manageButtonText}
				</button>
			{/if}
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
		</div>
	</div>
</div>
