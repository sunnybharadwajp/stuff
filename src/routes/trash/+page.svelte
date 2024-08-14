<script>
	import { Trash2 } from 'lucide-svelte';
	import {
		allTasks,
		tasks,
		setTasks,
		getRemovedTasks,
		clearDeletedTasks
	} from '$lib/stores/tasks.js';
	import { setSelectedTaskId, setEditingTaskId } from '$lib/stores/viewer_state.js';
	import Task from '$lib/components/Task.svelte';
	import { onMount } from 'svelte';

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			setSelectedTaskId(null);
			setEditingTaskId(null);
		}
	}

	async function clearTrash() {
		await fetch('/api/tasks/delete', {
			method: 'DELETE'
		});
		clearDeletedTasks();
		setTasks($allTasks);
	}

	onMount(() => {
		const filteredTasks = getRemovedTasks();
		setTasks(filteredTasks);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions - just a background -->
<div on:click={handleBackgroundClick} class="filter-view py-10 px-20">
	<div class="flex justify-between">
		<div class="filter-head px-3 flex gap-1 text-2xl font-bold tracking-tight items-center mb-2">
			<Trash2 />
			<h1>Trash</h1>
		</div>

		<button class=""
			><span
				class="text-xs font-semibold text-slate-700 shadow-md bg-slate-100 py-1 px-2 rounded-md"
				on:click={clearTrash}>Empty All</span
			></button
		>
	</div>

	<div class="tasks-list">
		{#each $tasks as currentTask}
			<div class="task-item">
				<Task {currentTask} />
			</div>
		{/each}
	</div>
</div>
