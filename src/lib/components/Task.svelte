<script>
	import { CalendarDays, ListCheck, Flag, Tag } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { viewerState, setSelectedTask, setEditingTask } from '$lib/stores/viewer_state.js';

	export let currentTask;
	let editInputElement;

	const taskState = writable('minimised');
	const taskSelected = writable(false);

	function handleClick(event) {
		setSelectedTask(currentTask);
		if (currentTask !== $viewerState.editingTask) {
			setEditingTask(null);
		}
	}

	function handleDoubleClick(event) {
		if (currentTask !== $viewerState.editingTask && currentTask === $viewerState.selectedTask) {
			console.log('double clicked');
			setEditingTask(currentTask);
			taskState.set('editing');
		}
	}

	$: if ($taskState === 'editing' && editInputElement) {
		setTimeout(() => {
			editInputElement.focus();
		}, 0);
	}

	$: if (currentTask !== $viewerState.editingTask) {
		$taskState = 'minimised';
	}

	$: if (currentTask === $viewerState.editingTask) {
		taskState.set('editing');
	}

	$: if (currentTask === $viewerState.selectedTask) {
		taskSelected.set(true);
	} else {
		taskSelected.set(false);
	}
</script>

<button
	class="task"
	class:edit-mode={$taskState === 'editing'}
	class:selected={$taskSelected === true}
	on:click={handleClick}
	on:dblclick={handleDoubleClick}
>
	<div class="checkbox-wrapper">
		<input type="checkbox" />
	</div>

	<div class="task-content text-left">
		{#if $taskState === 'minimised' || $taskState === 'selected'}
			<div class="minimised-mode">
				{#if currentTask.title}
					<span>{currentTask.title}</span>
				{:else}
					<span class="opacity-40">New To-Do</span>
				{/if}
			</div>
		{/if}

		<div class="edit-mode" class:hidden={$taskState !== 'editing'}>
			<input
				bind:this={editInputElement}
				type="text"
				value={currentTask.title || ''}
				placeholder="New To-Do"
			/>
			<textarea name="" id="" placeholder="Notes"></textarea>
			<div class="tags"></div>
			<div class="controls flex gap-3 justify-end px-3 py-1">
				<button class="control-button">
					<CalendarDays size={14} />
				</button>
				<button class="control-button">
					<Tag size={14} />
				</button>
				<button class="control-button">
					<ListCheck size={14} />
				</button>
				<button class="control-button">
					<Flag size={14} />
				</button>
			</div>
		</div>
	</div>
</button>
