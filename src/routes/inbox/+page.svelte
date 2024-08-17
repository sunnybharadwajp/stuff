<script>
	import { Inbox } from 'lucide-svelte';
	import { tasks } from '$lib/stores/tasks.js';
	import { setSelectedTaskId, setEditingTaskId } from '$lib/stores/viewer_state.js';
	import Task from '$lib/components/Task.svelte';
	import { onMount } from 'svelte';

	import { writable } from 'svelte/store';
	import { allTasks } from '$lib/stores/taskStore';

	let inboxTasks = writable([]);

	$: {
		console.log('running inbox fill');
		$inboxTasks = $allTasks.filter((task) => task.deletedAt === null);
	}

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			setSelectedTaskId(null);
			setEditingTaskId(null);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions - just a background -->
<div on:click={handleBackgroundClick} class="filter-view py-10 px-20">
	<div class="filter-head px-3 flex gap-1 text-2xl font-bold tracking-tight items-center">
		<Inbox />
		<h1>Inbox</h1>
	</div>

	<div class="tasks-list">
		{#each $inboxTasks as currentTask}
			<div class="task-item">
				<Task {currentTask} />
			</div>
		{/each}
	</div>
</div>
