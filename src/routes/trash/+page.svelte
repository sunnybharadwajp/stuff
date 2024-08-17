<script>
	import { Trash2 } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { allTasks } from '$lib/stores/taskStore';

	import Task from '$lib/components/Task.svelte';

	let trashTasks = writable([]);

	$: {
		console.log('running trash fill');
		$trashTasks = $allTasks.filter((task) => task.deletedAt !== null);
	}
</script>

<div class="filter-view">
	<div class="filter-head">
		<Trash2 />
		<h1>Trash</h1>
	</div>

	<div class="tasks-list">
		{#each $trashTasks as currentTask}
			<div class="task-item">
				<Task {currentTask} />
			</div>
		{/each}
	</div>
</div>
