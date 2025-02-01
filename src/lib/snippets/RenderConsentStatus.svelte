<script lang="ts">
	let { status, theme } = $props();

	const formatDate = (timestamp: string) => {
		try {
			const date = new Date(timestamp);
			return date.toLocaleString(undefined, {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (e) {
			return 'Invalid date';
		}
	};
</script>

<p class={`mt-1 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
	Status: {status.consented ? 'Consented' : 'Declined'} on {formatDate(status.timestamp)}
</p>
