<script>
	import { Trash2 } from 'lucide-svelte';

	import { setContext } from 'svelte';

	import { allTasks, trashTasks, selectedTaskId, editingTaskId } from '$lib/stores/taskStore';

	import Task from '$lib/components/Task/Task.svelte';

	import DeletedTask from '$lib/components/DeletedTask.svelte';

	setContext('currentTasksList', trashTasks);

	const emptyTrash = async () => {
		console.log('emptying trash');
		const request = await fetch('/api/tasks', {
			method: 'DELETE'
		});
		const data = await request.json();
		$allTasks = data;
	};

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			$selectedTaskId = null;
			$editingTaskId = null;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions - just a background -->
<div class="filter-view" on:click={handleBackgroundClick}>
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
				<Task {currentTask} />
			</div>
		{/each}
	</div>
</div>
