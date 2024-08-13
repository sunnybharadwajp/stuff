import { writable } from 'svelte/store';

export const tasks = writable([]);

export const setTasks = (data) => {
	tasks.set(data);
};

export const addToTasks = (task) => {
	tasks.update((tasks) => [...tasks, task]);
};
