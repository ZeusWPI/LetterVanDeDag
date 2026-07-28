<script lang="ts">
	import Logo from '$lib/assets/LetterVanDeDag.svg';
	import ListIcon from '$lib/assets/list.svg';
	import MattermostIcon from '$lib/assets/mattermost.svg';
	import { env } from '$env/dynamic/public';
</script>

<div class="w-screen h-16 mb-6 flex flex-row justify-between items-center bg-zoranje">
	<a href="/" class="font-black text-white text-4xl pl-3 flex flex-row">
		<img class="size-10 mr-2" src={Logo} alt="icon">
		Letter van de Dag
	</a>
	<span class="mr-3 flex flex-row justify-end h-full">
	<a class="hover:bg-orange-600 h-full flex items-center justify-center px-4"
	   href="/letterlist">
		<img class="size-9 brightness-0 invert" src={ListIcon} alt="icon" />
	</a>
	<a class="hover:bg-orange-600 h-full flex items-center justify-center px-4"
	   href={env.PUBLIC_MATTERMOST_URL} target="_blank">
		<img class="size-9 brightness-0 invert" src={MattermostIcon} alt="icon" />
	</a>
	</span>
</div>