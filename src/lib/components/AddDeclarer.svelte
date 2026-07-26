<script>
</script>

<div class="border-2 p-3 border-gray-100 dark:border-zinc-700 rounded-lg">
	<span class="text-xl font-bold">Add Declarer</span>
	<form class="mt-2" method="POST">
		<div class="flex flex-row items-center mb-2">
			<label class="font-bold" for="id">Id: </label>
			<input class="ml-2 px-2 border-gray-100 dark:border-zinc-700 border-2 rounded w-full" name="id"
			       placeholder="id">
		</div>
		<div class="flex flex-row items-center mb-2">
			<label class="font-bold" for="username">Username: </label>
			<input class="ml-2 px-2 border-gray-100 dark:border-zinc-700 border-2 rounded w-full" name="username"
			       placeholder="username">
		</div>
		<button class="mt-2 bg-zoranje active:bg-orange-600 text-white w-full px-2 py-1 rounded" type="submit"
		        formaction="/new_declarer">
			Add
		</button>
	</form>
</div>