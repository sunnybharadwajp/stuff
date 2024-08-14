<script>
	import { getTasksByProperty } from '$lib/stores/tasks';
	import { Inbox, Trash2 } from 'lucide-svelte';

	import { writable } from 'svelte/store';

	//get all tasks that have the property deletedAt in order
	let deletedTasks = writable([]);

	$: deletedTasks.set(getTasksByProperty('deletedAt'));

	$: console.log($deletedTasks);
</script>

<div class="sidebar">
	<a href="/inbox" class="sidebar-button filter common w-full flex">
		<span class="sidebar-filter-icon"><Inbox size={16} /></span>
		<span class="sidebar-filter-name">Inbox</span>
		<div class="flex gap-[0.1rem]">
			<div class="count due"><span>8</span></div>
			<div class="count"><span>8</span></div>
		</div>
	</a>
	<a href="/trash" class="sidebar-button filter common w-full flex">
		<span class="sidebar-filter-icon"><Trash2 size={16} /></span>
		<span class="sidebar-filter-name">Trash</span>
		<div class="flex gap-[0.1rem]">
			<div class="count due"><span>8</span></div>
			<div class="count"><span>8</span></div>
		</div>
	</a>
</div>
