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
    scm-rounded-md scm-px-3 scm-py-1.5 scm-text-xs scm-font-medium
    ${theme === 'light' ? 'scm-bg-slate-200 scm-text-slate-800 hover:scm-bg-slate-300' : 'scm-bg-slate-800 scm-text-slate-300 hover:scm-bg-slate-700'}
    scm-focus:outline-none scm-focus:outline-transparent
    scm-focus-visible:outline-none scm-focus-visible:outline-transparent scm-transition-all
    scm-duration-200 hover:scm-scale-105
    ${displayType === 'popup' ? 'scm-flex-1' : ''}
  `}>
	{declineButtonText}
</button>
