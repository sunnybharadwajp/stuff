<script>
	import '../app.css';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import ViewFooter from '$lib/components/ViewFooter.svelte';
	import { allTasks, setAllTasks, appInitialized, initialize } from '$lib/stores/tasks';

	export let data;
	$: $allTasks = data.props.tasks;
</script>

<div class="app-container">
	<Sidebar />

	<div class="viewer">
		<slot />
		<ViewFooter />
	</div>
</div>
