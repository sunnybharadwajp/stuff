// svelte load function and a fetch call to api/tasks to get all tasks
export async function load({ fetch }) {
	const response = await fetch('api/tasks');
	const tasks = await response.json();
	return {
		props: {
			tasks
		}
	};
}
