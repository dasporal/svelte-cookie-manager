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

<p
	class={`scm-mt-1 scm-text-xs ${theme === 'light' ? 'scm-text-slate-500' : 'scm-text-slate-500'}`}>
	{status.consented ? 'Consented' : 'Declined'} on {formatDate(status.timestamp)}
</p>
