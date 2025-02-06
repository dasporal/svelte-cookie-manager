<script lang="ts">
	let {
		manageButtonText,
		handleManageClick
	}: {
		manageButtonText: string;
		handleManageClick: () => void;
	} = $props();
</script>

<button
	onclick={handleManageClick}
	class={`
    scm-rounded-md scm-border scm-border-blue-500 scm-bg-transparent scm-px-3
    scm-py-1.5 scm-text-xs scm-font-medium
    scm-text-blue-500
    scm-transition-all scm-duration-200
    hover:scm-scale-105 hover:scm-border-blue-600
    hover:scm-text-blue-600 scm-focus:outline-none scm-focus:outline-transparent
    scm-focus-visible:outline-none scm-focus-visible:outline-transparent
  `}>
	{manageButtonText}
</button>
