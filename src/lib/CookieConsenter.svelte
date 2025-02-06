<script lang="ts">
	import type { CookieConsenterProps, CookieCategories } from './types.js';
	import MobileModal from './MobileModal.svelte';
	import BannerContent from './snippets/BannerContent.svelte';
	import ModalContent from './snippets/ModalContent.svelte';
	import PopupContent from './snippets/PopupContent.svelte';

	let isMobile = $derived.by(() => window.innerWidth < 640);

	let {
		buttonText,
		declineButtonText,
		manageButtonText,
		showManageButton,
		privacyPolicyText,
		privacyPolicyUrl,
		title,
		message,
		displayType,
		theme,
		onAccept,
		onDecline,
		onManage,
		initialPreferences,
		detailedConsent,
		isManaging = false
	}: CookieConsenterProps = $props();

	let isExiting = $state(false);
	let isEntering = $state(true);
	let shouldRender = $state(true);

	$effect(() => {
		setTimeout(() => {
			isEntering = false;
		}, 50);
	});

	$effect(() => {
		if (isExiting) {
			const timer = setTimeout(() => {
				shouldRender = false;
			}, 500);
			return () => clearTimeout(timer);
		}
	});

	function handleAcceptClick() {
		isExiting = true;
		setTimeout(() => {
			if (onAccept) onAccept();
		}, 500);
	}

	function handleDeclineClick() {
		isExiting = true;
		setTimeout(() => {
			if (onDecline) onDecline();
		}, 500);
	}

	function handleManageClick() {
		if (onManage) onManage();
	}

	function handleSavePreferences(categories: CookieCategories) {
		isExiting = true;
		setTimeout(() => {
			if (onManage) {
				onManage(categories);
			}
		}, 500);
	}

	function handleCancelManage() {
		isExiting = true;
		setTimeout(() => {
			if (onManage) onManage();
		}, 500);
	}
</script>

{#if shouldRender && !isManaging}
	{#if isMobile}
		<MobileModal
			{buttonText}
			{declineButtonText}
			{manageButtonText}
			{showManageButton}
			{privacyPolicyText}
			{privacyPolicyUrl}
			{title}
			{message}
			{theme}
			{handleAcceptClick}
			{handleDeclineClick}
			{handleManageClick}
			{isExiting}
			{isEntering}
			{isManaging}
			{handleSavePreferences}
			{handleCancelManage}
			{displayType}
			{initialPreferences}
			{detailedConsent} />
	{:else if displayType === 'banner'}
		<div
			class={`md:max-w-2xl scm-fixed scm-bottom-4 scm-left-1/2 scm-w-1/2 -scm-translate-x-1/2 ${theme === 'light' ? 'scm-border scm-border-black/10 scm-bg-white/95 scm-shadow-lg' : 'scm-bg-black/90 scm-text-white scm-ring-1 scm-ring-white/10'} 
		scm-z-[99999] scm-rounded-lg scm-backdrop-blur-sm scm-backdrop-saturate-150 scm-transition-all scm-duration-500 scm-ease-[cubic-bezier(0.32,0.72,0,1)] hover:scm--translate-y-2
		${isExiting ? 'scm-translate-y-full scm-transform scm-opacity-0' : isEntering ? 'scm-translate-y-full scm-transform scm-opacity-0' : 'scm-translate-y-0 scm-transform scm-opacity-100'}`}>
			<BannerContent
				{title}
				{message}
				{theme}
				{privacyPolicyUrl}
				{privacyPolicyText}
				{showManageButton}
				{manageButtonText}
				{declineButtonText}
				{buttonText}
				{handleManageClick}
				{handleDeclineClick}
				{handleAcceptClick} />
		</div>
	{:else if displayType === 'popup'}
		<div
			class={`scm-fixed scm-bottom-4 scm-left-4 scm-w-80
             ${theme === 'light' ? 'scm-bg-white/95 scm-shadow-lg scm-ring-1 scm-ring-black/10' : 'scm-bg-black/90 scm-text-white scm-ring-1 scm-ring-white/10'}
             scm-z-[99999] scm-rounded-lg scm-backdrop-blur-sm 
             scm-backdrop-saturate-150 scm-transition-all scm-duration-500
             scm-ease-[cubic-bezier(0.32,0.72,0,1)] hover:scm--translate-y-2
             ${isExiting ? 'scm-scale-95 scm-opacity-0' : isEntering ? 'scm-scale-95 scm-opacity-0' : 'scm-scale-100 scm-opacity-100'}`}>
			<PopupContent
				{title}
				{message}
				{theme}
				{privacyPolicyUrl}
				{privacyPolicyText}
				{showManageButton}
				{manageButtonText}
				{declineButtonText}
				{buttonText}
				{handleManageClick}
				{handleDeclineClick}
				{handleAcceptClick} />
		</div>
	{:else}
		<div
			class={`scm-fixed scm-inset-0 scm-flex scm-items-center scm-justify-center scm-p-4
             ${theme === 'light' ? 'scm-bg-black/20 scm-backdrop-blur-sm' : 'scm-bg-black/90 scm-text-white scm-backdrop-blur-sm'}
             scm-z-[99999] scm-transition-all scm-duration-500
             scm-ease-[cubic-bezier(0.32,0.72,0,1)]
             ${isExiting ? 'scm-opacity-0' : isEntering ? 'scm-opacity-0' : 'scm-opacity-100'}`}>
			<ModalContent
				{title}
				{message}
				{theme}
				{privacyPolicyUrl}
				{privacyPolicyText}
				{showManageButton}
				{manageButtonText}
				{declineButtonText}
				{buttonText}
				{handleManageClick}
				{handleDeclineClick}
				{handleAcceptClick} />
		</div>
	{/if}
{/if}
