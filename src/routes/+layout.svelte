<script lang="ts">
	import CookieManager from '$lib/CookieManager.svelte';

	let { children } = $props();
</script>

<CookieManager
	title="Would You Like A Cookie? 🍪"
	message="We value your privacy. Choose which cookies you want to allow. Essential cookies are always enabled as they are necessary for the website to function properly."
	buttonText="Accept All"
	declineButtonText="Decline All"
	showManageButton={true}
	manageButtonText="Manage Cookies"
	privacyPolicyUrl="https://example.com/privacy"
	privacyPolicyText="Privacy Policy"
	displayType="banner" />

{@render children()}
