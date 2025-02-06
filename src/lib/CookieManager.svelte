<script lang="ts">
	import CookieConsenter from './CookieConsenter.svelte';
	import ManageConsent from './ManageConsent.svelte';
	import { getBlockedHosts, getBlockedKeywords } from './utils/tracker-utils.js';
	import {
		blockTrackingRequests,
		blockTrackingScripts,
		restoreOriginalRequests
	} from './utils/tracking.js';
	import type { CookieManagerProps, DetailedCookieConsent } from './types.js';
	import { onMount } from 'svelte';
	import { displayTypeStore, isVisible, storedConsent, themeStore } from './utils/cookie.svelte.js';

	let showManageConsent = $state(false);
	let observer: MutationObserver | null = $state(null);

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
		const blockedHosts = [...getBlockedHosts(storedConsent.simplifiedConsent), ...[]]; // Add custom blocked domains if needed
		const blockedKeywords = [...getBlockedKeywords(storedConsent.simplifiedConsent), ...[]];

		if (blockedHosts.length > 0) {
			blockTrackingRequests(blockedHosts);
			observer = blockTrackingScripts(blockedKeywords);
		} else {
			restoreOriginalRequests();
			if (observer) observer.disconnect();
		}
	}

	function updateDetailedConsent(preferences: DetailedCookieConsent) {
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
		class="scm-fixed scm-inset-0 scm-z-[99999] scm-flex scm-items-center scm-justify-center scm-bg-black/40 scm-p-4 scm-backdrop-blur-sm">
		<div
			class={`scm-w-full scm-max-w-lg scm-rounded-xl scm-p-6 ${theme === 'light' ? 'scm-bg-white/95 scm-ring-1 scm-ring-black/10' : 'scm-bg-black/95 scm-ring-1 scm-ring-white/10'}`}>
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
