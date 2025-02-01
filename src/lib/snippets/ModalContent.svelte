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

	const titleClasses = $derived(
		`
  text-lg font-semibold mb-3
  ${theme === 'light' ? 'text-gray-900' : 'text-white'}
`.trim()
	);

	const messageClasses = $derived(
		`
  text-sm font-medium mb-6
  ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}
`.trim()
	);

	const contentClasses = $derived(
		`
  w-full max-w-lg rounded-xl p-6
  ${theme === 'light' ? 'bg-white/95 ring-2 ring-gray-200' : 'bg-black/95 ring-1 ring-white/10'}
`.trim()
	);

	const privacyLinkClasses = $derived(
		`
  text-xs font-medium
  ${theme === 'light' ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'}
  transition-colors duration-200
`.trim()
	);

	const manageButtonClasses = `
  px-3 py-1.5 text-xs font-medium rounded-md
  border border-blue-500 text-blue-500
  bg-transparent
  hover:text-blue-600 hover:border-blue-600
  transition-all duration-200
  hover:scale-105 focus-visible:outline-none focus:outline-none
  focus-visible:outline-transparent focus:outline-transparent
`.trim();

	const declineButtonClasses = $derived(
		`
  px-3 py-1.5 text-xs font-medium rounded-md
  ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}
  transition-all duration-200
  hover:scale-105 focus-visible:outline-none focus:outline-none
  focus-visible:outline-transparent focus:outline-transparent
`.trim()
	);

	const acceptButtonClasses = `
  px-3 py-1.5 text-xs font-medium rounded-md
  bg-blue-500 hover:bg-blue-600 text-white
  transition-all duration-200
  hover:scale-105 focus-visible:outline-none focus:outline-none
  focus-visible:outline-transparent focus:outline-transparent
`.trim();
</script>

<div class={contentClasses}>
	<div class="flex flex-col">
		{#if title}
			<p class={titleClasses}>{title}</p>
		{/if}
		<p class={messageClasses}>{message}</p>
	</div>

	<div class="flex flex-col gap-3">
		<div class="flex items-center justify-between">
			{#if privacyPolicyUrl}
				<a
					href={privacyPolicyUrl}
					target="_blank"
					rel="noopener noreferrer"
					class={privacyLinkClasses}
				>
					{privacyPolicyText}
				</a>
			{/if}
			<div class="flex items-center gap-3">
				{#if showManageButton}
					<button onclick={handleManageClick} class={manageButtonClasses}>
						{manageButtonText}
					</button>
				{/if}
				<button onclick={handleDeclineClick} class={declineButtonClasses}>
					{declineButtonText}
				</button>
				<button onclick={handleAcceptClick} class={acceptButtonClasses}>
					{buttonText}
				</button>
			</div>
		</div>
	</div>
</div>
