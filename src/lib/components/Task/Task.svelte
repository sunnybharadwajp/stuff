<script>
	import './taskStyles.css';

	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { getContext, tick } from 'svelte';

	import {
		selectedTaskId,
		editingTaskId,
		updateCurrentTask
	} from '$lib/stores/taskStore';

	import {
		debounce,
		getPreviousTaskId,
		getNextTaskId,
		removeFromTasks
	} from '$lib/utils';

	export let currentTask;

	let currentTasksList = getContext('currentTasksList');
	let currentTaskSelected = writable(false);
	let taskState = writable('minimised');

	let titleInputElem;
	let taskElement;

	const toggleTaskDone = async () => {
		if (currentTask.done) {
			setTimeout(() => {
				updateTaskRecord();
				removeFromTasks(currentTask.id);
			}, 1200);
		}
	};

	async function handleTaskCommands(event) {
		if (event.key === 'Backspace' || event.key === 'Delete') {
			if ($page.url.pathname === '/trash') {
				return;
			}

			currentTask.deletedAt = new Date().toISOString();
			await fetch(`/api/tasks/${currentTask.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(currentTask)
			});

			const nextTaskId = getNextTaskId(currentTask.id, $currentTasksList);
			if (nextTaskId) {
				updateCurrentTask(currentTask);
				$selectedTaskId = nextTaskId;
			} else {
				const previousTaskId = getPreviousTaskId(
					currentTask.id,
					$currentTasksList
				);
				updateCurrentTask(currentTask);
				$selectedTaskId = previousTaskId;
			}
		}

		if (event.key === 'ArrowUp') {
			let previousId = getPreviousTaskId(currentTask.id, $currentTasksList);
			$selectedTaskId = previousId ? previousId : currentTask.id;
		} else if (event.key === 'ArrowDown') {
			let nextTaskId = getNextTaskId(currentTask.id, $currentTasksList);
			$selectedTaskId = nextTaskId ? nextTaskId : currentTask.id;
		}

		if (event.key === 'Enter' && $taskState === 'minimised') {
			$taskState = 'editing';
			$editingTaskId = currentTask.id;
			await tick();
			titleInputElem.focus();
		}
	}

	function handleEditCommands(event) {
		event.stopPropagation();
		if (event.key === 'Enter' || event.key === 'Escape') {
			$taskState = 'minimised';
			$editingTaskId = null;
		}
	}

	const updateTaskRecord = async () => {
		const request = await fetch(`/api/tasks/${currentTask.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(currentTask)
		});
		const data = request.json();
		console.log(data);
		updateCurrentTask(data);
	};

	const debouncedUpdate = debounce(updateTaskRecord, 250);

	const handleClick = () => {
		console.log(currentTask);

		$selectedTaskId = currentTask.id;
		$currentTaskSelected = true;
	};

	const handleDoubleClick = async () => {
		if (currentTask.id === $selectedTaskId) {
			taskState.set('editing');
			$editingTaskId = currentTask.id;
			await tick();
			titleInputElem.focus();
		}
	};

	$: if (currentTask.id !== $selectedTaskId) {
		$currentTaskSelected = false;
	}

	$: if (currentTask.id === $editingTaskId) {
		taskState.set('editing');
	}

	$: if (currentTask.id === $selectedTaskId) {
		$currentTaskSelected = true;
		if ($taskState === 'minimised') {
			setTimeout(() => {
				taskElement.focus();
			}, 0);
		}
	} else {
		$currentTaskSelected = false;
	}

	$: if (
		currentTask.id !== $editingTaskId ||
		currentTask.id !== $selectedTaskId
	) {
		taskState.set('minimised');
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions
 Cannot be a button as it requires nested elements -->
<div
	class="task-component"
	class:minimised-mode={$taskState === 'minimised'}
	class:selected={$currentTaskSelected && $taskState === 'minimised'}
	class:editing-mode={$taskState === 'editing'}
	tabindex="0"
	role="button"
	bind:this={taskElement}
	on:dblclick={handleDoubleClick}
	on:keydown={$taskState !== 'editing' ? handleTaskCommands : null}
>
	<div class="checkbox-wrapper">
		<input
			type="checkbox"
			bind:checked={currentTask.done}
			on:change={toggleTaskDone}
		/>
	</div>
	<div class="content-wrapper">
		<div
			class="minimised select-none"
			on:click={handleClick}
			class:hidden={$taskState === 'editing'}
		>
			{#if currentTask.title}
				<span class="w-full">{currentTask.title}</span>
			{:else}
				<span class="opacity-40">New To-Do</span>
			{/if}
		</div>
		<div class="editing" class:hidden={$taskState === 'minimised'}>
			<input
				type="text"
				placeholder="New To-Do"
				bind:this={titleInputElem}
				bind:value={currentTask.title}
				on:keydown={handleEditCommands}
				on:input={debouncedUpdate}
			/>
			<textarea
				placeholder="Notes"
				rows="2"
				bind:value={currentTask.notes}
				on:input={debouncedUpdate}
			></textarea>
		</div>
	</div>
</div>
