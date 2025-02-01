<script lang="ts">
	import { acceptCookies, declineCookies } from './store.svelte';
	import CookieConsenter from './CookieConsenter.svelte';
	import ManageConsent from './ManageConsent.svelte';
	import { getBlockedHosts, getBlockedKeywords } from './utils/tracker-utils.js';
	import {
		blockTrackingRequests,
		blockTrackingScripts,
		restoreOriginalRequests
	} from './utils/tracking.js';
	import type { CookieManagerProps } from './types.js';
	import { onMount } from 'svelte';

	let showManageConsent = $state(false);
	let observer = $state(null);
	let detailedConsent = $state(null);
	let hasConsent = $state(false);

	let {
		title,
		message,
		buttonText,
		declineButtonText,
		showManageButton,
		manageButtonText,
		privacyPolicyUrl,
		privacyPolicyText,
		theme,
		displayType,
		isVisible = $bindable()
	}: CookieManagerProps = $props();

	function handleTrackingBlocking() {
		const blockedHosts = [...getBlockedHosts(detailedConsent), ...[]]; // Add custom blocked domains if needed
		const blockedKeywords = [...getBlockedKeywords(detailedConsent), ...[]];

		if (blockedHosts.length > 0) {
			blockTrackingRequests(blockedHosts);
			observer = blockTrackingScripts(blockedKeywords);
		} else {
			restoreOriginalRequests();
			if (observer) observer.disconnect();
		}
	}

	function updateDetailedConsent(preferences) {
		const newConsent = {
			Analytics: { consented: preferences.Analytics, timestamp: new Date().toISOString() },
			Social: { consented: preferences.Social, timestamp: new Date().toISOString() },
			Advertising: { consented: preferences.Advertising, timestamp: new Date().toISOString() }
		};
		localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
		detailedConsent = newConsent;

		showManageConsent = false;
		handleTrackingBlocking();
	}

	function handleManage() {
		isVisible = false;
		showManageConsent = true;
	}

	function handleCancelManage() {
		isVisible = true;
		showManageConsent = false;
	}

	function acceptCookiesFromManager() {
		isVisible = false;
		acceptCookies();
	}

	function declineCookiesFromManager() {
		isVisible = false;
		declineCookies();
	}

	onMount(() => {
		const storedConsent = localStorage.getItem('cookie-consent');
		if (storedConsent) {
			detailedConsent = JSON.parse(storedConsent);
		}

		hasConsent = detailedConsent
			? Object.values(detailedConsent).some((status) => status.consented)
			: null;

		if (detailedConsent === null && !showManageConsent) {
			isVisible = true;
		}

		handleTrackingBlocking();

		return () => {
			if (observer) observer.disconnect();
		};
	});
</script>

{#if isVisible}
	<CookieConsenter
		{title}
		{message}
		{buttonText}
		{declineButtonText}
		{showManageButton}
		{manageButtonText}
		{privacyPolicyUrl}
		{privacyPolicyText}
		{theme}
		{displayType}
		onAccept={acceptCookiesFromManager}
		onDecline={declineCookiesFromManager}
		onManage={handleManage}
		{detailedConsent} />
{/if}

{#if showManageConsent}
	<div class="overlay">
		<div class="modal">
			<ManageConsent
				onSave={updateDetailedConsent}
				onCancel={handleCancelManage}
				{detailedConsent} />
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(5px);
	}

	.modal {
		width: 100%;
		max-width: 500px;
		background: white;
		padding: 20px;
		border-radius: 8px;
	}
</style>
