<script lang="ts">
	import './styles.css';
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
	import { displayTypeStore, isVisible, storedConsent, themeStore } from './utils/cookie.svelte.js';

	let showManageConsent = $state(false);
	let observer = $state(null);

	let {
		title,
		message,
		buttonText,
		declineButtonText,
		showManageButton,
		manageButtonText,
		privacyPolicyUrl,
		privacyPolicyText,
		theme = themeStore.value,
		displayType
	}: CookieManagerProps = $props();

	function handleTrackingBlocking() {
		const blockedHosts = [...getBlockedHosts(storedConsent.value), ...[]]; // Add custom blocked domains if needed
		const blockedKeywords = [...getBlockedKeywords(storedConsent.value), ...[]];

		if (blockedHosts.length > 0) {
			blockTrackingRequests(blockedHosts);
			observer = blockTrackingScripts(blockedKeywords);
		} else {
			restoreOriginalRequests();
			if (observer) observer.disconnect();
		}
	}

	function updateDetailedConsent(preferences) {
		storedConsent.updateDetailedConsent(preferences);

		showManageConsent = false;
		handleTrackingBlocking();
	}

	function handleManage() {
		isVisible.value = false;
		showManageConsent = true;
	}

	function handleCancelManage() {
		isVisible.value = true;
		showManageConsent = false;
	}

	function acceptCookiesFromManager() {
		isVisible.value = false;
		storedConsent.acceptCookies();
	}

	function declineCookiesFromManager() {
		isVisible.value = false;
		storedConsent.declineCookies();
	}

	$effect(() => {
		if (themeStore.value) theme = themeStore.value;
		if (displayTypeStore.value) displayType = displayTypeStore.value;
	});

	onMount(() => {
		if (storedConsent.value === null && !showManageConsent) {
			isVisible.value = true;
		}

		if (theme) themeStore.value = theme;
		if (displayType) displayTypeStore.value = displayType;

		handleTrackingBlocking();

		return () => {
			if (observer) observer.disconnect();
		};
	});
</script>

{#if isVisible.value}
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
		onManage={handleManage} />
{/if}

{#if showManageConsent}
	<div
		class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
		<div
			class={`w-full max-w-lg rounded-xl p-6 ${theme === 'light' ? 'bg-white/95 ring-1 ring-black/10' : 'bg-black/95 ring-1 ring-white/10'}`}>
			<ManageConsent onSave={updateDetailedConsent} onCancel={handleCancelManage} />
		</div>
	</div>
{/if}

<style>
	.modal {
		width: 100%;
		max-width: 500px;
		background: white;
		padding: 20px;
		border-radius: 8px;
	}
</style>
