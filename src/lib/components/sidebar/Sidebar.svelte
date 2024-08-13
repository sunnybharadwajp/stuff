<script>
	import { Inbox, Trash2 } from 'lucide-svelte';
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
</div>
