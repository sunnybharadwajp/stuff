export function debounce(func, delay) {
	let timeoutId;
	return function (...args) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	};
}

export function formatDate(isoString) {
	const date = new Date(isoString);
	const options = { month: 'short', day: '2-digit' };
	return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getPreviousTaskId(id, tasks) {
	const index = tasks.findIndex((task) => task.id === id);

	if (index === -1 || index === 0) {
		return null;
	}

	return tasks[index - 1].id;
}

export function getNextTaskId(id, tasks) {
	const index = tasks.findIndex((task) => task.id === id);

	if (index === -1 || index === tasks.length - 1) {
		return null;
	}

	return tasks[index + 1].id;
}

export function removeFromTasks(id, tasks) {
	return tasks.filter((t) => t.id !== id);
}
