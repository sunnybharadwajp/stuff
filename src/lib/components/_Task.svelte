<script>
	import { CalendarDays, ListCheck, Flag, Tag } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { removeFromTasks } from '$lib/stores/taskStore';
	import {
		viewerState,
		setSelectedTaskId,
		setEditingTaskId
	} from '$lib/stores/viewer_state.js';
	import {
		updateTask,
		getAdjacentTaskId,
		getNextTaskId,
		getPreviousTaskId
	} from '$lib/stores/tasks.js';

	import { debounce } from '$lib/utils';

	export let currentTask;
	let editInputElement;
	let taskElement;
	let editElement;

	const taskState = writable('minimised');
	const taskSelected = writable(false);

	function handleClick(event) {
		setSelectedTaskId(currentTask.id);
		if (currentTask.id !== $viewerState.editingTaskId) {
			setEditingTaskId(null);
		}
	}

	function handleDoubleClick(event) {
		if (
			currentTask.id !== $viewerState.editingTaskId &&
			currentTask.id === $viewerState.selectedTaskId
		) {
			setEditingTaskId(currentTask.id);
			taskState.set('editing');
			setTimeout(() => {
				editInputElement.focus();
			}, 0);
		}
	}

	async function onTaskContentChange() {
		console.log('task content changed');

		const request = await fetch(`/api/tasks/${currentTask.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(currentTask)
		});
		const data = await request.json();
		updateTask(data);
	}
	const debouncedOnTaskContentChange = debounce(onTaskContentChange, 250);

	function handleEnter(event) {
		event.stopPropagation();
		if (event.key === 'Enter') {
			taskState.set('minimised');
			setEditingTaskId(null);
		}
	}

	async function handleTaskCommands(event) {
		console.log('key event fired');

		if (event.key === 'Backspace' || event.key === 'Delete') {
			console.log('Deleting task...');
			let currentId = currentTask.id;
			console.log('Current task ID:', currentId);
			currentTask.deletedAt = new Date().toISOString();
			await fetch(`/api/tasks/${currentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(currentTask)
			});

			const nextTaskId = await getAdjacentTaskId(currentId);
			removeFromTasks(currentId);
			// removeTask(currentId);
			setSelectedTaskId(nextTaskId);
		}

		if (event.key === 'ArrowUp') {
			const previousTaskId = await getPreviousTaskId(currentTask.id);
			setSelectedTaskId(previousTaskId);
		} else if (event.key === 'ArrowDown') {
			const nextTaskId = await getNextTaskId(currentTask.id);
			setSelectedTaskId(nextTaskId);
		}

		if (event.key === 'Enter' && $taskState === 'minimised') {
			taskState.set('editing');
			setEditingTaskId(currentTask.id);
			setTimeout(() => {
				editInputElement.focus();
			}, 0);
		}
	}

	$: if (currentTask.id !== $viewerState.editingTaskId) {
		taskState.set('minimised');
	} else {
		taskState.set('editing');
	}

	$: if (currentTask.id === $viewerState.selectedTaskId) {
		taskSelected.set(true);
		if ($taskState === 'minimised') {
			setTimeout(() => {
				taskElement.focus();
			}, 0);
		}
	} else {
		taskSelected.set(false);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions
 Cannot be a button as it requires nested elements -->
<div
	class="task"
	class:edit-mode={$taskState === 'editing'}
	class:selected={$taskSelected === true}
	bind:this={taskElement}
	on:click={handleClick}
	on:dblclick={handleDoubleClick}
	on:keydown={$taskState !== 'editing' ? handleTaskCommands : null}
	tabindex="0"
	role="button"
>
	<div class="checkbox-wrapper">
		<input type="checkbox" />
	</div>

	<div class="task-content text-left truncate">
		{#if $taskState === 'minimised' || $taskState === 'selected'}
			<div class="minimised-mode">
				{#if currentTask.title}
					<span class="w-full">{currentTask.title}</span>
				{:else}
					<span class="opacity-40">New To-Do</span>
				{/if}
			</div>
		{/if}

		<div
			bind:this={editElement}
			class="edit-mode"
			class:hidden={$taskState !== 'editing'}
		>
			<input
				name="title"
				type="text"
				placeholder="New To-Do"
				bind:this={editInputElement}
				bind:value={currentTask.title}
				on:input={debouncedOnTaskContentChange}
				on:keydown={handleEnter}
			/>
			<textarea
				name="notes"
				placeholder="Notes"
				bind:value={currentTask.notes}
				on:input={debouncedOnTaskContentChange}
			></textarea>
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
</div>
