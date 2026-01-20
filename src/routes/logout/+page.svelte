<script lang="ts">
	import SignOutBtn from '$lib/components/SignOutBtn.svelte';
	import type { ZAuthUser } from '$lib/types.js';

	let { data } = $props();
	let user = $derived(data.session?.user as ZAuthUser);
</script>


<span class="font-bold mt-20 text-3xl">Logged in as {user.username}</span>
<div class="mt-6 px-6 py-4 bg-orange-500 rounded-xl text-white text-6xl inline-flex items-center cursor-pointer">
	<SignOutBtn />
</div>