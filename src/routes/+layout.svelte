<script>
	import '../app.css';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import ViewFooter from '$lib/components/ViewFooter.svelte';
	import { onMount } from 'svelte';
	import { initFetchCounter } from '$lib/stores/utilStore';
	import { allTasks } from '$lib/stores/taskStore';

	$: console.log($initFetchCounter);
	$: console.log($allTasks);

	async function getAllTasks() {
		console.log('get all tasks is run');
		const res = await fetch('/api/tasks');
		const data = await res.json();
		$initFetchCounter += 1;
		$allTasks = data;
	}

	onMount(() => {
		getAllTasks();
	});
</script>

<div class="app-container">
	<Sidebar />

	<div class="viewer">
		<slot />
		<ViewFooter />
	</div>
</div>
