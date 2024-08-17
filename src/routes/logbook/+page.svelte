<script>
	import { BookCheck } from 'lucide-svelte';
	import { setContext } from 'svelte';

	import {
		logbookTasks,
		selectedTaskId,
		editingTaskId
	} from '$lib/stores/taskStore';

	import Task from '$lib/components/Task/Task.svelte';

	setContext('currentTasksList', logbookTasks);

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			$selectedTaskId = null;
			$editingTaskId = null;
		}
	}
</script>

<div class="filter-view">
	<div class="filter-head">
		<BookCheck />
		<h1>Logbook</h1>
	</div>

	<div class="tasks-list">
		{#each $logbookTasks as currentTask}
			<Task {currentTask} />
		{/each}
	</div>
</div>
