<script lang="ts">
	let {
		buttonText,
		handleAcceptClick
	}: {
		buttonText: string;
		handleAcceptClick: () => void;
	} = $props();
</script>

<button
	onclick={handleAcceptClick}
	class={`
    scm-flex-1 scm-rounded-md scm-bg-blue-500 scm-px-3 scm-py-1.5
    scm-text-xs scm-font-medium scm-text-white
    scm-transition-all scm-duration-200
    hover:scm-scale-105 hover:scm-bg-blue-600 scm-focus:outline-none
    scm-focus:outline-transparent scm-focus-visible:outline-none scm-focus-visible:outline-transparent
  `}>
	{buttonText}
</button>
