import { writable } from 'svelte/store';

export const tasks = writable([]);

export const setTasks = (data) => {
	tasks.set(data);
};

export const addToTasks = (task) => {
	tasks.update((tasks) => [...tasks, task]);
};

export const updateTask = (task) => {
	tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? task : t)));
};

export const removeTask = (id) => {
	tasks.update((tasks) => tasks.filter((t) => t.id !== id));
};

export const getAdjacentTaskId = async (id) => {
	return new Promise((resolve) => {
		const unsubscribe = tasks.subscribe((taskList) => {
			if (!taskList || taskList.length === 0) {
				resolve(null);
				return;
			}

			const index = taskList.findIndex((t) => t.id === id);

			if (index === -1) {
				resolve(null);
				return;
			}

			let adjacentTaskId = null;
			if (index < taskList.length - 1) {
				adjacentTaskId = taskList[index + 1].id;
			} else if (index > 0) {
				adjacentTaskId = taskList[index - 1].id;
			}

			resolve(adjacentTaskId);
		});

		unsubscribe();
	});
};

//get next id or return the same id if it is the last one
export const getNextTaskId = async (id) => {
	return new Promise((resolve) => {
		const unsubscribe = tasks.subscribe((taskList) => {
			if (!taskList || taskList.length === 0) {
				resolve(null);
				return;
			}

			const index = taskList.findIndex((t) => t.id === id);

			if (index === -1) {
				resolve(null);
				return;
			}

			let nextTaskId = null;
			if (index < taskList.length - 1) {
				nextTaskId = taskList[index + 1].id;
			} else {
				nextTaskId = taskList[index].id;
			}

			resolve(nextTaskId);
		});

		unsubscribe();
	});
};

//get previous id or return the same id if it is the first one
export const getPreviousTaskId = async (id) => {
	return new Promise((resolve) => {
		const unsubscribe = tasks.subscribe((taskList) => {
			if (!taskList || taskList.length === 0) {
				resolve(null);
				return;
			}

			const index = taskList.findIndex((t) => t.id === id);

			if (index === -1) {
				resolve(null);
				return;
			}

			let previousTaskId = null;
			if (index > 0) {
				previousTaskId = taskList[index - 1].id;
			} else {
				previousTaskId = taskList[index].id;
			}

			resolve(previousTaskId);
		});

		unsubscribe();
	});
};
