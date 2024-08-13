<script>
	import { Inbox } from 'lucide-svelte';
	import { tasks } from '$lib/stores/tasks.js';
	import Task from '$lib/components/Task.svelte';
</script>

<div class="filter-view py-10 px-20">
	<div class="filter-head px-3 flex gap-1 text-2xl font-bold tracking-tight items-center">
		<Inbox />
		<h1>Inbox</h1>
	</div>

	<div class="tasks-list">
		{#each $tasks as currentTask}
			<div class="task-item">
				<Task {currentTask} />
			</div>
		{/each}
	</div>
</div>
