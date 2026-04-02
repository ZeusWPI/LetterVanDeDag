<script lang="ts">
	import type { LeaderboardUser } from '$lib/types';

	let { leaderboard_users }: { leaderboard_users: LeaderboardUser[] } = $props();
</script>

<div class="w-full rounded-lg border-2 border-gray-100 p-3 dark:border-zinc-700">
	<span class="mb-2 block text-xl font-bold">Leaderboard</span>

	<div class="mt-2 overflow-x-auto">
		<table class="w-full border-collapse text-left">
			<thead>
				<tr class="border-b-2 border-gray-200 dark:border-zinc-600">
					<th class="w-12 px-2 py-2 font-bold">#</th>
					<th class="px-2 py-2 font-bold">User</th>
					<th class="px-2 py-2 text-right font-bold">Count</th>
				</tr>
			</thead>
			<tbody>
				{#each leaderboard_users as user}
					<tr
						class="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
					>
						<td class="px-2 py-2 font-semibold">{user.rank}</td>
						<td class="flex items-center gap-2 px-2 py-2">
							<span>{user.username}</span>
						</td>
						<td class="px-2 py-2 text-right font-mono">{user.count}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
