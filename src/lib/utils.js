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
