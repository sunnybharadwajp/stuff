<script>
	import { formatDate } from '$lib/utils';

	export let currentTask;
</script>

<div class="deleted-task flex gap-3 items-center">
	<div class="checkbox-wrapper">
		<input type="checkbox" />
	</div>

	<div class="deleted-at text-xs text-blue-400 tracking-tight font-semibold">
		{#if currentTask.doneWhen}
			<span>{formatDate(currentTask.doneWhen)}</span>
		{/if}
	</div>

	<div class="task-content text-left truncate">
		<div class="minimised-mode">
			{#if currentTask.title}
				<span class="w-full">{currentTask.title}</span>
			{:else}
				<span class="opacity-40">New To-Do</span>
			{/if}
		</div>
	</div>
</div>
