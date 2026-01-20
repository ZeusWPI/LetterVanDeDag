<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import SignInBtn from '$lib/components/SignInBtn.svelte';
</script>


<Navbar />

<div class="flex flex-col justify-center items-center h-full">
	<div class="mt-20 px-6 py-4 bg-orange-500 rounded-xl text-white text-6xl inline-flex items-center cursor-pointer">
		<SignInBtn />
	</div>
</div>