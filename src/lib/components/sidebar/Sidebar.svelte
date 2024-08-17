<script>
	import { Inbox, Trash2, BookCheck } from 'lucide-svelte';
	import FilterButton from './FilterButton.svelte';
</script>

<div class="sidebar">
	<FilterButton link="/inbox" filterIcon={Inbox} title="Inbox" countDue={8} countTotal={8} />
	<FilterButton link="/trash" filterIcon={Trash2} title="Trash" countDue={0} countTotal={0} />
	<FilterButton
		link="/logbook"
		filterIcon={BookCheck}
		title="Logbook"
		countDue={0}
		countTotal={0}
	/>
</div>
