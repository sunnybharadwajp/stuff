<script>
	import '../app.css';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import ViewFooter from '$lib/components/ViewFooter.svelte';
</script>

<div class="app-container">
	<Sidebar />

	<div class="viewer">
		<slot />
		<ViewFooter />
	</div>
</div>
