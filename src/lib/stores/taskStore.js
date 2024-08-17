import { writable } from 'svelte/store';
import { derived } from 'svelte/store';

const allTasks = writable([]);
const selectedTaskId = writable(null);
const editingTaskId = writable(null);

function addToTasks(task) {
	allTasks.update((tasks) => {
		return [...tasks, task];
	});
}

const inboxTasks = derived(allTasks, (allTasksValue) => {
	return allTasksValue.filter((task) => task.deletedAt === null);
});

const trashTasks = derived(allTasks, (allTasksValue) => {
	return allTasksValue.filter((task) => task.deletedAt !== null);
});

function updateCurrentTask(task) {
	allTasks.update((tasks) => {
		const index = tasks.findIndex((t) => t.id === task.id);
		tasks[index] = task;
		return tasks;
	});
}

function removeFromTasks(task) {
	allTasks.update((tasks) => {
		return tasks.filter((t) => t.id !== task.id);
	});
}

export {
	allTasks,
	selectedTaskId,
	editingTaskId,
	inboxTasks,
	trashTasks,
	addToTasks,
	updateCurrentTask,
	removeFromTasks
};
