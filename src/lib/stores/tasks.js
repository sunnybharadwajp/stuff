import { writable, get } from 'svelte/store';

export const allTasks = writable([]);

export const appInitialized = writable(false);
export function initialize() {
	appInitialized.update((value) => {
		if (!value) {
			return true;
		}
		return value;
	});
}

export function resetApp() {
	appInitialized.set(false);
}

export const tasks = writable([]);

export const setTasks = (data) => {
	tasks.set(data);
};

export const setAllTasks = (data) => {
	allTasks.set(data);
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

export const getAdjacentTaskId = (id) => {
	const taskList = get(tasks);
	if (!taskList || taskList.length === 0) {
		return null;
	}

	const index = taskList.findIndex((t) => t.id === id);
	if (index === -1) {
		return null;
	}

	if (index < taskList.length - 1) {
		return taskList[index + 1].id;
	} else if (index > 0) {
		return taskList[index - 1].id;
	}

	return null;
};

// Get next id or return the same id if it is the last one
export const getNextTaskId = (id) => {
	const taskList = get(tasks);
	if (!taskList || taskList.length === 0) {
		return null;
	}

	const index = taskList.findIndex((t) => t.id === id);
	if (index === -1) {
		return null;
	}

	if (index < taskList.length - 1) {
		return taskList[index + 1].id;
	}

	return taskList[index].id;
};

// Get previous id or return the same id if it is the first one
export const getPreviousTaskId = (id) => {
	const taskList = get(tasks);
	if (!taskList || taskList.length === 0) {
		return null;
	}

	const index = taskList.findIndex((t) => t.id === id);
	if (index === -1) {
		return null;
	}

	if (index > 0) {
		return taskList[index - 1].id;
	}

	return taskList[index].id;
};

//get all tasks with a property of certain value or if it exists or not
export const getTasksByProperty = (property, value) => {
	const taskList = get(tasks);
	if (!taskList || taskList.length === 0) {
		return [];
	}

	if (value === undefined) {
		return taskList.filter((t) => t[property] !== undefined);
	}

	return taskList.filter((t) => t[property] === value);
};

// filter from allTasks and return tasks that are not deleted
export const getActiveTasks = () => {
	const taskList = get(allTasks);
	if (!taskList || taskList.length === 0) {
		return [];
	}

	return taskList.filter((t) => t.deletedAt === null);
};

// filter from allTasks and return tasks have a deletedAt property
export const getRemovedTasks = () => {
	const taskList = get(allTasks);
	if (!taskList || taskList.length === 0) {
		return [];
	}

	return taskList.filter((t) => t.deletedAt !== null);
};

// clear all tasks that have a deletedAt property
export const clearDeletedTasks = () => {
	const taskList = get(allTasks);
	if (!taskList || taskList.length === 0) {
		return;
	}

	const activeTasks = taskList.filter((t) => t.deletedAt === null);
	allTasks.set(activeTasks);
};
