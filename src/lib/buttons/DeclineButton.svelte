<script lang="ts">
	let {
		theme,
		displayType,
		declineButtonText,
		handleDeclineClick
	}: {
		theme: string;
		displayType: string;
		declineButtonText: string;
		handleDeclineClick: () => void;
	} = $props();
</script>

<button
	onclick={handleDeclineClick}
	class={`
    rounded-md px-3 py-1.5 text-xs font-medium
    ${theme === 'light' ? 'bg-slate-200 text-slate-800 hover:bg-slate-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
    transition-all duration-200
    hover:scale-105 focus:outline-none focus:outline-transparent
    focus-visible:outline-none focus-visible:outline-transparent
    ${displayType === 'popup' ? 'flex-1' : ''}
  `}>
	{declineButtonText}
</button>
