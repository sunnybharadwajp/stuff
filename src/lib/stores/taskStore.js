import { writable } from 'svelte/store';

const allTasks = writable([]);

function addToTasks(task) {
	allTasks.update((tasks) => {
		return [...tasks, task];
	});
}

function removeFromTasks(task) {
	allTasks.update((tasks) => {
		return tasks.filter((t) => t.id !== task.id);
	});
}

export { allTasks, addToTasks, removeFromTasks };
