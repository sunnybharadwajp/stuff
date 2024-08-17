<script>
	import { Trash2 } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { allTasks } from '$lib/stores/taskStore';

	import Task from '$lib/components/Task.svelte';
	import DeletedTask from '$lib/components/DeletedTask.svelte';

	let trashTasks = writable([]);

	const emptyTrash = async () => {
		console.log('emptying trash');
		const request = await fetch('/api/tasks', {
			method: 'DELETE'
		});
		const data = await request.json();
		$allTasks = data;
	};

	$: {
		console.log('running trash fill');
		$trashTasks = $allTasks.filter((task) => task.deletedAt !== null);
	}
</script>

<div class="filter-view">
	<div class="view-header flex justify-between items-center">
		<div class="filter-head">
			<Trash2 />
			<h1>Trash</h1>
		</div>
		<div class="right-btns">
			<button on:click={emptyTrash} class="button">Empty Trash</button>
		</div>
	</div>

	<div class="tasks-list">
		{#each $trashTasks as currentTask}
			<div class="task-item">
				<DeletedTask {currentTask} />
			</div>
		{/each}
	</div>
</div>
