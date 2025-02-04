<script lang="ts">
	import type { CookieConsenterProps, CookieCategories } from './types.js';
	import MobileModal from './MobileModal.svelte';
	import BannerContent from './snippets/BannerContent.svelte';
	import ModalContent from './snippets/ModalContent.svelte';
	import PopupContent from './snippets/PopupContent.svelte';

	let isMobile = $derived.by(() => window.innerWidth < 640);

	let {
		buttonText = 'Accept',
		declineButtonText = 'Decline',
		manageButtonText = 'Manage Cookies',
		showManageButton = false,
		privacyPolicyText = 'Privacy Policy',
		privacyPolicyUrl = '',
		title = '',
		message = 'This website uses cookies to enhance your experience.',
		displayType = 'banner',
		theme = 'light',
		onAccept,
		onDecline,
		onManage,
		initialPreferences = {
			Analytics: false,
			Social: false,
			Advertising: false
		},
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
			class={`fixed bottom-4 left-1/2 w-full -translate-x-1/2 md:max-w-2xl ${theme === 'light' ? 'border border-black/10 bg-white/95 shadow-lg' : 'bg-black/50 text-white ring-1 ring-white/10'} 
		z-[99999] rounded-lg backdrop-blur-sm backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2
		${isExiting ? 'translate-y-full transform opacity-0' : isEntering ? 'translate-y-full transform opacity-0' : 'translate-y-0 transform opacity-100'}`}>
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
			class={`fixed bottom-4 left-4 w-80
             ${theme === 'light' ? 'bg-white/95 shadow-lg ring-1 ring-black/10' : 'bg-black/50 text-white ring-1 ring-white/10'}
             z-[99999] rounded-lg backdrop-blur-sm 
             backdrop-saturate-150 transition-all duration-500
             ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2
             ${isExiting ? 'scale-95 opacity-0' : isEntering ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
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
			class={`fixed inset-0 flex items-center justify-center p-4
             ${theme === 'light' ? 'bg-black/20 backdrop-blur-sm' : 'bg-black/40 text-white backdrop-blur-sm'}
             z-[99999] transition-all duration-500
             ease-[cubic-bezier(0.32,0.72,0,1)]
             ${isExiting ? 'opacity-0' : isEntering ? 'opacity-0' : 'opacity-100'}`}>
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
