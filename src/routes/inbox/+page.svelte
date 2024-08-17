<script>
	import { Inbox } from 'lucide-svelte';

	import { setContext } from 'svelte';

	import {
		inboxTasks,
		selectedTaskId,
		editingTaskId
	} from '$lib/stores/taskStore';

	import Task from '$lib/components/Task/Task.svelte';

	setContext('currentTasksList', inboxTasks);

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			$selectedTaskId = null;
			$editingTaskId = null;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions - just a background -->
<div class="filter-view" on:click={handleBackgroundClick}>
	<div class="filter-head">
		<Inbox />
		<h1>Inbox</h1>
	</div>

	<div class="tasks-list">
		{#each $inboxTasks as currentTask}
			<Task {currentTask} />
		{/each}
	</div>
</div>
