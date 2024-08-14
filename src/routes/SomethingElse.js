import { allTasks, setAllTasks, appInitialized, initialize } from '$lib/stores/tasks';
import { writable, get } from 'svelte/store';

export async function load({ fetch }) {
	initialize();

	if (get(appInitialized)) {
		return {};
	} else {
		try {
			console.log('running fetch');

			const res = await fetch('/api/tasks/');
			const tasks = await res.json();
			console.log(tasks);
			setAllTasks(tasks);
		} catch (error) {
			console.error(error);
		}
	}

	return {};
}
