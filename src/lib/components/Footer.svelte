<script lang="ts">
	import { PUBLIC_APP_VERSION } from '$env/static/public';
	import SvelteIcon from '$lib/assets/svelte.svg';
</script>

<div class="w-full flex flex-row justify-between px-6 mb-3">
	<a href="https://github.com/ZeusWPI/LetterVanDeDag" class="hover:underline">
		<img class="inline size-4" src={SvelteIcon} alt="Svelte" />
		v{PUBLIC_APP_VERSION}
	</a>
	<span>Made with ❤️ by <img class="size-8 ml-1 inline" src="https://zinc.zeus.gent/zeus" alt="Zeus"></span>
	<span></span>
</div>