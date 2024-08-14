import { writable } from 'svelte/store';

export const viewerState = writable({
	tasks: [],
	selectedTask: null,
	editingTask: null,
	selectedTaskId: null,
	editingTaskId: null
});

export const setViewerTasks = (data) => {
	viewerState.update((state) => {
		state.tasks = data;
		return state;
	});
};

export const setSelectedTask = (task) => {
	viewerState.update((state) => {
		state.selectedTask = task;
		return state;
	});
};

export const setEditingTask = (task) => {
	viewerState.update((state) => {
		state.editingTask = task;
		return state;
	});
};

export const setSelectedTaskId = (id) => {
	viewerState.update((state) => {
		state.selectedTaskId = id;
		return state;
	});
};

export const setEditingTaskId = (id) => {
	viewerState.update((state) => {
		state.editingTaskId = id;
		return state;
	});
};
