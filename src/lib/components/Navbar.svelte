<script lang="ts">
	import Logo from '$lib/assets/LetterVanDeDag.svg';
	import MattermostIcon from '$lib/assets/mattermost.svg';
	import { env } from '$env/dynamic/public';
</script>

<div class="w-screen h-16 mb-6 flex flex-row justify-between items-center bg-zoranje">
	<span class="font-black text-white text-4xl pl-3 flex flex-row">
		<img class="size-10 mr-2" src={Logo} alt="icon">
		Letter van de Dag
	</span>
	<a class="mr-3 hover:bg-orange-600 h-full flex items-center justify-center px-4"
	   href={env.PUBLIC_MATTERMOST_URL} target="_blank">
		<img class="size-9 brightness-0 invert" src={MattermostIcon} alt="icon" />
	</a>
</div>