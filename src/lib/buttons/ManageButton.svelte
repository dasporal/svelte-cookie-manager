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
