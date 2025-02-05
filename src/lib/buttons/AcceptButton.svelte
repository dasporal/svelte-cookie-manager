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
    flex-1 rounded-md bg-blue-500 px-3 py-1.5
    text-xs font-medium text-white
    transition-all duration-200
    hover:scale-105 hover:bg-blue-600 focus:outline-none
    focus:outline-transparent focus-visible:outline-none focus-visible:outline-transparent
  `}>
	{buttonText}
</button>
